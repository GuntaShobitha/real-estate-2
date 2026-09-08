/**
 * STACKLY LUXURY REAL ESTATE MARKETPLACE - DASHBOARD CONTROLLER
 * Dynamic tab navigation, CRUD operations, canvas metrics & mobile drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initDashboardSidebar();
  initDashboardSession();
  initAdminCharts();
  initPropertyCRUD();
  initLeadStatusManager();
  initTourBookingManager();
});

/* ==========================================================================
   1. DYNAMIC TAB NAVIGATION
   ========================================================================== */
function initDashboardTabs() {
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const panels = document.querySelectorAll('.dash-panel');
  if (!navItems.length || !panels.length) return;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      // Update sidebar active states
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Update panel visibility
      panels.forEach(p => {
        if (p.id === targetTab) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      // If mobile sidebar is open, close it
      const sidebar = document.querySelector('.dash-sidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   2. MOBILE SIDEBAR TOGGLE
   ========================================================================== */
function initDashboardSidebar() {
  const toggleBtn = document.querySelector('.mobile-dash-toggle');
  const sidebar = document.querySelector('.dash-sidebar');
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    // Lock/unlock body scroll when sidebar opens/closes
    document.body.classList.toggle('sidebar-open', isOpen);
  });

  // Close sidebar on outer click for mobile
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    }
  });
}

/* ==========================================================================
   3. SESSION PROFILE GREETING
   ========================================================================== */
function initDashboardSession() {
  const sessionData = localStorage.getItem('stackly_auth_session');
  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      const nameElements = document.querySelectorAll('.dynamic-user-name');
      nameElements.forEach(el => el.textContent = session.name);
    } catch (e) {
      console.error(e);
    }
  }
}

/* ==========================================================================
   4. INTERACTIVE CANVAS CHARTS (ADMIN & USER)
   ========================================================================== */
function initAdminCharts() {
  const revCanvas = document.getElementById('revenueChartCanvas');
  const viewCanvas = document.getElementById('trafficChartCanvas');

  if (revCanvas) {
    const ctx = revCanvas.getContext('2d');
    const width = revCanvas.width = revCanvas.parentElement.offsetWidth;
    const height = revCanvas.height = 240;

    const data = [12, 19, 24, 32, 45, 58, 72, 85, 94, 110, 125, 142];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = Math.max(...data);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      let y = (height - 40) * (i / 4) + 10;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Draw Taupe Area & Line
    const stepX = (width - 70) / (data.length - 1);
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(190, 163, 137, 0.45)');
    grad.addColorStop(1, 'rgba(190, 163, 137, 0.0)');

    ctx.beginPath();
    ctx.moveTo(40, height - 30);
    data.forEach((val, i) => {
      let x = 40 + i * stepX;
      let y = (height - 40) - (val / maxVal) * (height - 60) + 10;
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(40 + (data.length - 1) * stepX, height - 30);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line Stroke
    ctx.beginPath();
    data.forEach((val, i) => {
      let x = 40 + i * stepX;
      let y = (height - 40) - (val / maxVal) * (height - 60) + 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#BEA389';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#BEA389';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Data points and labels
    ctx.fillStyle = '#B4B4B4';
    ctx.font = '11px "Plus Jakarta Sans"';
    data.forEach((val, i) => {
      let x = 40 + i * stepX;
      let y = (height - 40) - (val / maxVal) * (height - 60) + 10;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#BEA389';
      ctx.stroke();
      ctx.fillText(labels[i], x - 10, height - 10);
    });
  }

  if (viewCanvas) {
    const ctx = viewCanvas.getContext('2d');
    const width = viewCanvas.width = viewCanvas.parentElement.offsetWidth;
    const height = viewCanvas.height = 240;

    const data = [450, 720, 890, 1200, 1600, 2100, 2900];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...data);
    const barWidth = 32;
    const stepX = (width - 60) / data.length;

    data.forEach((val, i) => {
      let x = 40 + i * stepX + (stepX - barWidth) / 2;
      let barHeight = (val / maxVal) * (height - 60);
      let y = height - 30 - barHeight;

      let grad = ctx.createLinearGradient(0, y, 0, height - 30);
      grad.addColorStop(0, '#E0D2C5');
      grad.addColorStop(1, '#8E745D');

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = '#B4B4B4';
      ctx.font = '11px "Plus Jakarta Sans"';
      ctx.fillText(labels[i], x + 4, height - 10);
    });
  }
}

/* ==========================================================================
   5. PROPERTY CRUD CONTROLLER (ADMIN)
   ========================================================================== */
function showFieldError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (input) input.classList.add('input-error');
  if (error) { error.textContent = msg; error.classList.add('visible'); }
}

function initPropertyCRUD() {
  const addBtn = document.getElementById('btnOpenAddPropertyModal');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const modal = document.getElementById('addPropertyModal');
      if (modal) modal.classList.add('open');
    });
  }

  const addForm = document.getElementById('addPropertyForm');
  if (addForm) {
    // Clear validation errors as the admin types
    ['propNewTitle', 'propNewCity', 'propNewPrice'].forEach(fieldId => {
      const input = document.getElementById(fieldId);
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('input-error');
          const error = document.getElementById(fieldId + 'Error');
          if (error) { error.textContent = ''; error.classList.remove('visible'); }
        });
      }
    });

    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('propNewTitle').value.trim();
      const price = document.getElementById('propNewPrice').value.trim();
      const city = document.getElementById('propNewCity').value.trim();

      // JS form validation - no native HTML bubbles
      let isValid = true;
      const requiredFields = [
        { id: 'propNewTitle', msg: 'Estate title is required.' },
        { id: 'propNewCity', msg: 'City / destination is required.' },
        { id: 'propNewPrice', msg: 'Asking price is required.' }
      ];

      // Clear any previous errors
      requiredFields.forEach(f => {
        const input = document.getElementById(f.id);
        const error = document.getElementById(f.id + 'Error');
        if (input) input.classList.remove('input-error');
        if (error) { error.textContent = ''; error.classList.remove('visible'); }
      });

      if (!title) { showFieldError('propNewTitle', 'Estate title is required.'); isValid = false; }
      if (!city) { showFieldError('propNewCity', 'City / destination is required.'); isValid = false; }
      if (!price) { showFieldError('propNewPrice', 'Asking price is required.'); isValid = false; }

      if (!isValid) {
        const firstInvalid = document.querySelector('#addPropertyForm .input-error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const tableBody = document.getElementById('adminPropertyTableBody');
      if (tableBody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><strong>${title}</strong></td>
          <td>${city}</td>
          <td><span style="color: var(--gold-light); font-weight: 700;">${price}</span></td>
          <td><span class="status-pill status-active">Active</span></td>
          <td>
            <button class="btn btn-outline-gold btn-sm" onclick="this.closest('tr').remove(); showToast('Listing removed successfully.');">Delete</button>
          </td>
        `;
        tableBody.prepend(newRow);
      }
window.location.href='./404.html'
      // showToast(`Listing "${title}" added to Global Inventory.`);
      addForm.reset();
      const modal = document.getElementById('addPropertyModal');
      if (modal) modal.classList.remove('open');
    });
  }
}

/* ==========================================================================
   6. CRM LEADS CONTROLLER
   ========================================================================== */
function initLeadStatusManager() {
  window.updateLeadStatus = function(btn, newStatus) {
    const row = btn.closest('tr');
    const badge = row.querySelector('.lead-status-badge');
    if (badge) {
      badge.textContent = newStatus;
      badge.className = `status-pill lead-status-badge ${newStatus === 'Contacted' ? 'status-pending' : 'status-active'}`;
    }
    showToast(`Lead marked as ${newStatus}`);
  };
}

/* ==========================================================================
   7. TOUR BOOKING CONTROLLER (USER)
   ========================================================================== */
function initTourBookingManager() {
  window.cancelTour = function(btn) {
    const row = btn.closest('tr');
    if (confirm('Are you sure you wish to cancel this private showing?')) {
      row.remove();
      showToast('Tour booking cancelled.');
    }
  };
}

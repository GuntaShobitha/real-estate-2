/**
 * STACKLY LUXURY REAL ESTATE MARKETPLACE - AUTHENTICATION CONTROLLER
 * Role selection (User / Admin), validation, dashboard routing & forgot password handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoleSelector();
  initLoginForm();
  initRegisterForm();
});

/* ==========================================================================
   ROLE SELECTOR (User / Admin Toggle)
   ========================================================================== */
function initRoleSelector() {
  const roleButtons = document.querySelectorAll('.role-select-btn');
  const roleInput = document.getElementById('selectedRole');
  if (!roleButtons.length || !roleInput) return;

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      roleInput.value = btn.getAttribute('data-role');
    });
  });
}

/* ==========================================================================
   FORM VALIDATION HELPERS
   ========================================================================== */
function showFieldError(inputEl, errorEl, message) {
  if (inputEl) inputEl.classList.add('input-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}

function clearFieldError(inputEl, errorEl) {
  if (inputEl) inputEl.classList.remove('input-error');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

/* ==========================================================================
   LOGIN FORM
   ========================================================================== */
function initLoginForm() {
  const loginForm = document.getElementById('stacklyLoginForm');
  if (!loginForm) return;

  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const emailError = document.getElementById('loginEmailError');
  const passwordError = document.getElementById('loginPasswordError');

  // Real-time: clear errors on input
  if (emailInput) {
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
  }
  if (passwordInput) {
    passwordInput.addEventListener('input', () => clearFieldError(passwordInput, passwordError));
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    clearFieldError(emailInput, emailError);
    clearFieldError(passwordInput, passwordError);

    const role = document.getElementById('selectedRole').value || 'user';
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate email
    if (!email) {
      showFieldError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showFieldError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    if (!password) {
      showFieldError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      showFieldError(passwordInput, passwordError, 'Password must be at least 6 characters.');
      isValid = false;
    }

    if (!isValid) return;

    // Store user session in localStorage
    const userSession = {
      isLoggedIn: true,
      role: role,
      email: email,
      name: email.split('@')[0] || 'Administrator',
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('stackly_auth_session', JSON.stringify(userSession));

    if (role === 'admin') {
      if (typeof showToast === 'function') showToast('Authenticating Executive Admin access...');
      setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
      }, 500);
    } else {
      if (typeof showToast === 'function') showToast('Welcome to your Private Client Portal.');
      setTimeout(() => {
        window.location.href = 'user-dashboard.html';
      }, 500);
    }
  });
}

/* ==========================================================================
   REGISTER FORM
   ========================================================================== */
function initRegisterForm() {
  const registerForm = document.getElementById('stacklyRegisterForm');
  if (!registerForm) return;

  const nameInput = document.getElementById('regName');
  const emailInput = document.getElementById('regEmail');
  const passwordInput = document.getElementById('regPassword');
  const nameError = document.getElementById('regNameError');
  const emailError = document.getElementById('regEmailError');
  const passwordError = document.getElementById('regPasswordError');

  // Real-time: clear errors on input
  if (nameInput) {
    nameInput.addEventListener('input', () => clearFieldError(nameInput, nameError));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
  }
  if (passwordInput) {
    passwordInput.addEventListener('input', () => clearFieldError(passwordInput, passwordError));
  }

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(passwordInput, passwordError);

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const role = document.getElementById('selectedRole') ? document.getElementById('selectedRole').value : 'user';

    // Validate name
    if (!name) {
      showFieldError(nameInput, nameError, 'Full legal name is required.');
      isValid = false;
    } else if (name.length < 2) {
      showFieldError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    }

    // Validate email
    if (!email) {
      showFieldError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showFieldError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    if (!password) {
      showFieldError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      showFieldError(passwordInput, passwordError, 'Password must be at least 6 characters.');
      isValid = false;
    }

    if (!isValid) return;

    const userSession = {
      isLoggedIn: true,
      role: role,
      email: email,
      name: name || 'Private Client',
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('stackly_auth_session', JSON.stringify(userSession));

    if (typeof showToast === 'function');
    setTimeout(() => {
      window.location.href = role === 'admin' ? './login.html' : './login.html';
    }, 600);
  });
}

/* ==========================================================================
   LOGOUT HELPER
   ========================================================================== */
window.logoutUser = function() {
  localStorage.removeItem('stackly_auth_session');
  window.location.href = 'login.html';
};

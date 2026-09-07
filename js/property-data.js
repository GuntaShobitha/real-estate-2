/**
 * STACKLY REAL ESTATE MARKETPLACE - CORE DATA REPOSITORY
 * High-net-worth property listings, elite agents, market intelligence & reviews
 */

const STACKLY_DATA = {
  properties: [
    {
      id: "prop-01",
      title: "The Sky Crest Penthouse",
      location: "Billionaires' Row, Manhattan, NY",
      city: "New York",
      price: "$28,500,000",
      priceNum: 28500000,
      beds: 5,
      baths: 6.5,
      sqft: "8,450 sq ft",
      category: "penthouses",
      type: "Triplex Penthouse",
      tag: "Ultra Luxury",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: true,
      description: "Perched 85 stories above Central Park, this architectural masterpiece features 360-degree unobstructed skyline views, private cantilevered infinity pool, 24ft ceilings, and bespoke Italian marble finishes.",
      amenities: ["Private Helipad Access", "Cantilevered Pool", "Private Elevator", "Wine Cellar (1,200 bottles)", "Smart Automation", "24/7 Concierge"],
      virtualTourAvailable: true,
      status: "Active"
    },
    {
      id: "prop-02",
      title: "Villa Solaria Waterfront",
      location: "Cap d'Antibes, French Riviera",
      city: "Monaco & Riviera",
      price: "€34,000,000",
      priceNum: 36800000,
      beds: 7,
      baths: 9,
      sqft: "12,200 sq ft",
      category: "villas",
      type: "Oceanfront Estate",
      tag: "Private Beach",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: true,
      description: "Direct Mediterranean beachfront access with private deep-water yacht mooring, landscaped olive groves, wellness pavilion, spa, and subterranean subterranean 8-car gallery.",
      amenities: ["Private Yacht Mooring", "Private Beach", "Wellness Spa & Sauna", "Infinity Sea-Facing Pool", "Guest Villa", "Staff Quarters"],
      virtualTourAvailable: true,
      status: "Active"
    },
    {
      id: "prop-03",
      title: "The Bel-Air Glass Pavilion",
      location: "Bel-Air, Los Angeles, CA",
      city: "Los Angeles",
      price: "$42,000,000",
      priceNum: 42000000,
      beds: 6,
      baths: 8,
      sqft: "14,500 sq ft",
      category: "modern",
      type: "Modern Architectural",
      tag: "Iconic Design",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: true,
      description: "Designed by world-renowned biophilic architects, seamlessly blending motorized floor-to-ceiling Fleetwood glass with panoramic canyon-to-ocean vistas, zero-edge pool, and Dolby Atmos cinema.",
      amenities: ["Zero-Edge Infinity Pool", "Dolby Atmos Cinema (20-seat)", "Automated Car Gallery", "Tennis Court", "Guard House", "Solar Microgrid"],
      virtualTourAvailable: true,
      status: "Active"
    },
    {
      id: "prop-04",
      title: "The Palm Jumeirah Royal Villa",
      location: "Frond G, Palm Jumeirah, Dubai",
      city: "Dubai",
      price: "AED 95,000,000",
      priceNum: 25800000,
      beds: 6,
      baths: 7,
      sqft: "11,800 sq ft",
      category: "villas",
      type: "Waterfront Villa",
      tag: "Royal Collection",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: true,
      description: "Ultra-exclusive signature villa with private lagoon beach, custom gold leaf ceilings, rooftop sky-lounge overlooking Dubai Marina skyline, and imported Greek Thassos marble.",
      amenities: ["Private Lagoon", "Rooftop Sky Lounge", "Full Marina View", "Private Elevator", "Smart Wellness Gym", "Butler Quarters"],
      virtualTourAvailable: true,
      status: "Active"
    },
    {
      id: "prop-05",
      title: "Alpine Sanctuary Chalet",
      location: "Red Mountain, Aspen, Colorado",
      city: "Aspen",
      price: "$21,750,000",
      priceNum: 21750000,
      beds: 5,
      baths: 6,
      sqft: "7,900 sq ft",
      category: "alpine",
      type: "Ski-in / Ski-out Chalet",
      tag: "Mountain View",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: false,
      description: "True ski-in/ski-out luxury with direct access to Aspen Mountain. Handcrafted timber beams, radiant-heated stone terraces, outdoor heated plunge pool, and commercial ski lounge.",
      amenities: ["Ski-in / Ski-out Access", "Heated Stone Terrace", "Outdoor Hot Tub & Plunge", "Ski Equipment Locker", "Fireplace in all Suites", "Wine Tasting Lounge"],
      virtualTourAvailable: true,
      status: "Active"
    },
    {
      id: "prop-06",
      title: "Mayfair Historic Regency Palace",
      location: "Grosvenor Square, Mayfair, London",
      city: "London",
      price: "£26,000,000",
      priceNum: 32500000,
      beds: 6,
      baths: 6,
      sqft: "9,600 sq ft",
      category: "penthouses",
      type: "Historic Townhouse",
      tag: "Heritage Prime",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: false,
      description: "Grade II listed Georgian mansion meticulously restored with contemporary luxury. Features grand ballroom, passenger lift, private landscaped courtyard garden, and indoor swimming pool complex.",
      amenities: ["Grade II Listed Heritage", "Indoor Swimming Pool", "Grand Ballroom", "Private Courtyard Garden", "Subterranean Cinema", "Air Filtration System"],
      virtualTourAvailable: false,
      status: "Active"
    },
    {
      id: "prop-07",
      title: "The Shinjuku Sky Sanctuary",
      location: "Minato-ku, Tokyo, Japan",
      city: "Tokyo",
      price: "¥3,800,000,000",
      priceNum: 24500000,
      beds: 4,
      baths: 4.5,
      sqft: "6,200 sq ft",
      category: "modern",
      type: "Modern Penthouse",
      tag: "Zen Modern",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: false,
      description: "Minimalist Japanese luxury overlooking Tokyo Tower and Mount Fuji. Includes authentic Hinoki wood onsen, Bonsai terrace, tearoom, and smart biophilic climate system.",
      amenities: ["Hinoki Wood Onsen", "Mount Fuji View", "Private Tearoom", "Seismic Isolation Base", "High-Speed Private Lift", "Smart Biophilic Air"],
      virtualTourAvailable: true,
      status: "Pending"
    },
    {
      id: "prop-08",
      title: "Monaco Port Hercule Terrace",
      location: "Avenue d'Ostende, Monte Carlo",
      city: "Monaco & Riviera",
      price: "€45,000,000",
      priceNum: 48900000,
      beds: 4,
      baths: 5,
      sqft: "5,800 sq ft",
      category: "penthouses",
      type: "Super-Yacht View Penthouse",
      tag: "Grand Prix Frontline",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80&fm=webp",
      featured: true,
      description: "Direct frontline view of the Monaco Grand Prix circuit and Port Hercule yacht basin. Wrap-around 2,000 sq ft terrace with integrated jacuzzi, outdoor bar, and private security detail.",
      amenities: ["F1 Track Frontline View", "Superyacht Harbor View", "Wrap-Around Jacuzzi Terrace", "24/7 Security Escort", "Helipad Booking", "Valet Concierge"],
      virtualTourAvailable: true,
      status: "Active"
    }
  ],

  agents: [
    {
      id: "agent-1",
      name: "Victoria Sterling",
      title: "Managing Partner & Global Private Client Lead",
      region: "New York & London",
      volume: "$1.4B+ Career Volume",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80&fm=webp",
      experience: "16+ Years Experience",
      phone: "+1 (212) 890-4400",
      email: "v.sterling@stackly.com"
    },
    {
      id: "agent-2",
      name: "Alexander Vance",
      title: "Executive Director - European & Riviera Estates",
      region: "Monaco & French Riviera",
      volume: "€980M+ Career Volume",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80&fm=webp",
      experience: "14+ Years Experience",
      phone: "+377 98 98 00 12",
      email: "a.vance@stackly.com"
    },
    {
      id: "agent-3",
      name: "Soraya Al-Mansoor",
      title: "Head of Middle East & Ultra-Prime Acquisitions",
      region: "Dubai & Abu Dhabi",
      volume: "AED 3.2B+ Career Volume",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80&fm=webp",
      experience: "12+ Years Experience",
      phone: "+971 4 399 2200",
      email: "s.almansoor@stackly.com"
    },
    {
      id: "agent-4",
      name: "Kenjiro Takahashi",
      title: "Director of Asia-Pacific Luxury Portfolios",
      region: "Tokyo & Singapore",
      volume: "$820M+ Career Volume",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80&fm=webp",
      experience: "15+ Years Experience",
      phone: "+81 3 5500 8820",
      email: "k.takahashi@stackly.com"
    }
  ],

  testimonials: [
    {
      id: "test-1",
      client: "Lord Harrison Sterling",
      role: "Private Equity Managing Director, London",
      quote: "Stackly’s discretion and off-market intelligence are unprecedented. They sourced our Mayfair residence before it ever touched the public market. Truly bespoke fiduciary representation.",
      rating: 5,
      property: "Acquired Mayfair Residence (£26M)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80&fm=webp"
    },
    {
      id: "test-2",
      client: "Dr. Elena Rostova",
      role: "Biotech Founder & Investor, Zurich",
      quote: "From the 3D virtual tour to cross-border escrow closing in Geneva, the entire Stackly ecosystem operated with military precision and Swiss-level security.",
      rating: 5,
      property: "Acquired Alpine Chalet ($21.75M)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80&fm=webp"
    },
    {
      id: "test-3",
      client: "Tariq Bin Zaid",
      role: "Family Office Principal, Dubai",
      quote: "Stackly represents the gold standard of luxury real estate. Their advisory team managed our multi-jurisdiction asset acquisition across Dubai and Manhattan flawlessly.",
      rating: 5,
      property: "Acquired Palm Jumeirah & NY Penthouse ($54M)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80&fm=webp"
    }
  ],

  blogPosts: [
    {
      id: "blog-1",
      title: "The Rise of Biophilic Mega-Mansions: Merging Natural Ecology with Ultra-Luxury",
      category: "Architecture & Design",
      readTime: "6 min read",
      date: "August 28, 2026",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80&fm=webp",
      author: "Victoria Sterling",
      snippet: "How progressive billionaire buyers are demanding living living-walls, zero-carbon microgrids, and organic stone architecture across Bel-Air and Zurich.",
      tags: ["Biophilic", "Eco-Luxury", "Architecture"]
    },
    {
      id: "blog-2",
      title: "Global Prime Residential Index 2026: Capital Flight Trends Across Dubai, Monaco & NY",
      category: "Market Intelligence",
      readTime: "9 min read",
      date: "August 20, 2026",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80&fm=webp",
      author: "Kenjiro Takahashi",
      snippet: "An exhaustive analysis of sovereign wealth allocations, currency hedges, and tax treaty shifts driving record price per square meter milestones.",
      tags: ["Economics", "Prime Index", "Investment"]
    },
    {
      id: "blog-3",
      title: "Mastering the 1031 Exchange and Cross-Border Escrow for International Estates",
      category: "Wealth Advisory",
      readTime: "7 min read",
      date: "August 15, 2026",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80&fm=webp",
      author: "Alexander Vance",
      snippet: "Navigating international capital controls, dual-tax treaties, and discrete nominee structures for high-net-worth estate acquisitions.",
      tags: ["Tax Strategy", "Legal", "Wealth"]
    },
    {
      id: "blog-4",
      title: "Next-Gen Smart Home Security: Subterranean Bunkers, AI Surveillance & EMP Shielding",
      category: "Technology",
      readTime: "5 min read",
      date: "August 09, 2026",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80&fm=webp",
      author: "Soraya Al-Mansoor",
      snippet: "Inside the sophisticated security protocols embedded in the newest ultra-prime residential developments worldwide.",
      tags: ["Security", "Smart Home", "Innovation"]
    },
    {
      id: "blog-5",
      title: "Waterfront Trophy Assets: Sourcing Private Marinas and Deep-Water Mooring Rights",
      category: "Super-Prime Lifestyle",
      readTime: "8 min read",
      date: "August 02, 2026",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1000&q=80&fm=webp",
      author: "Alexander Vance",
      snippet: "Why direct super-yacht mooring and maritime riparian rights command a 45% premium in the Mediterranean and Caribbean.",
      tags: ["Yachting", "Waterfront", "Riviera"]
    },
    {
      id: "blog-6",
      title: "Interior Curation for Billion-Dollar Penthouses: Curating Museum-Grade Art Collections",
      category: "Interior Design",
      readTime: "6 min read",
      date: "July 26, 2026",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80&fm=webp",
      author: "Victoria Sterling",
      snippet: "How top interior curators design custom climate-controlled private galleries and lighting schemes for blue-chip art masters.",
      tags: ["Fine Art", "Penthouses", "Interiors"]
    }
  ],

  faqs: [
    {
      q: "How does Stackly maintain client confidentiality and discretion?",
      a: "All private client interactions are protected under stringent non-disclosure agreements (NDAs). Off-market transactions are executed via bespoke private holding entities with direct escrow handling by our specialized legal concierge."
    },
    {
      q: "What is the process for scheduling a private in-person or virtual 3D tour?",
      a: "Verified clients can schedule private viewings directly through the portal or via their assigned private client advisor. We provide 24/7 private aviation transfers and secure biometric showings."
    },
    {
      q: "Can international non-resident buyers acquire property through Stackly?",
      a: "Yes. Our international legal desk assists with foreign national ownership frameworks, Golden Visa programs, cross-border currency exchange, and multi-jurisdictional tax optimization."
    },
    {
      q: "What criteria must a property meet to be listed in Stackly's VIP Collection?",
      a: "Listings undergo rigorous architectural appraisal, verified clean title certification, valuation audits, and structural environmental inspections. Only the top 2% of luxury properties qualify."
    },
    {
      q: "How does Stackly's mortgage and investment ROI advisory operate?",
      a: "We collaborate directly with premier private private-banking syndicates to secure bespoke jumbo loans, interest-only facilities, and asset-backed financing tailored to high-net-worth balance sheets."
    }
  ]
};

// Expose globally
if (typeof window !== "undefined") {
  window.STACKLY_DATA = STACKLY_DATA;
}

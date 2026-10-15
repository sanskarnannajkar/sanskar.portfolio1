/**
 * ============================================================================
 * SWEET STACK - MAIN APPLICATION LOGIC
 * Sanskar Nannajkar - Developer Portfolio
 *
 * All editable portfolio content is centralized in the `content` object below.
 * Tech Stack: Vanilla JS (ES Modules) + Three.js + GSAP + Lenis + Lucide + Tilt.
 * ============================================================================
 */

import { initDessertScene } from './scene.js';

/* ============================================================================
   PORTFOLIO CONTENT OBJECT (Easily edit all text, links, projects & skills)
   ============================================================================ */
export const content = {
  personal: {
    name: "Sanskar Nannajkar",
    role: "Backend Engineer & Systems Baker",
    education: "3rd-Year B.E. Electronics & Telecommunication",
    location: "Pune, Maharashtra, India 🇮🇳",
    email: "sanskarnannajkar@gmail.com",
    github: "https://github.com/sanskarnannajkar",
    linkedin: "https://linkedin.com/in/sanskar-nannajkar",
    twitter: "https://twitter.com/sanskar_dev",
    status: "Open for Backend Roles & Internships",
    subtitles: [
      "Backend Engineer",
      "Kafka Tinkerer",
      "Go & Java Dev",
      "AI Agent Builder",
      "Cloud & DevOps Explorer"
    ]
  },

  socials: [
    { name: "GitHub", url: "https://github.com/sanskarnannajkar", icon: "github", label: "GitHub Profile" },
    { name: "LinkedIn", url: "https://linkedin.com/in/sanskar-nannajkar", icon: "linkedin", label: "LinkedIn Profile" },
    { name: "Email", url: "mailto:sanskarnannajkar@gmail.com", icon: "mail", label: "Send Email" },
    { name: "Code", url: "https://github.com/sanskarnannajkar?tab=repositories", icon: "code", label: "Repositories" }
  ],

  skills: [
    {
      id: "languages",
      title: "Core Languages",
      subtitle: "The Base Flours & Yeasts",
      icon: "☕",
      accent: "#E8A857",
      badgeBg: "rgba(232, 168, 87, 0.16)",
      items: [
        { name: "Java (Core & Adv)", level: "Mastered", icon: "☕" },
        { name: "Go (Golang)", level: "Seasoned", icon: "⚡" },
        { name: "Python", level: "Seasoned", icon: "🐍" },
        { name: "SQL (Postgres/MySQL)", level: "Mastered", icon: "🗄️" },
        { name: "C / C++", level: "Fresh", icon: "⚙️" }
      ]
    },
    {
      id: "backend",
      title: "Backend & Distributed Systems",
      subtitle: "The Kneading & Oven Architecture",
      icon: "⚡",
      accent: "#7C6CF0",
      badgeBg: "rgba(124, 108, 240, 0.16)",
      items: [
        { name: "Spring Boot", level: "Mastered", icon: "🌱" },
        { name: "Apache Kafka", level: "Seasoned", icon: "📨" },
        { name: "RESTful APIs", level: "Mastered", icon: "🌐" },
        { name: "Microservices Architecture", level: "Seasoned", icon: "📦" },
        { name: "Redis In-Memory Cache", level: "Seasoned", icon: "⚡" },
        { name: "PostgreSQL & Hibernate/JPA", level: "Mastered", icon: "🐬" }
      ]
    },
    {
      id: "devops",
      title: "DevOps & Cloud Ovens",
      subtitle: "The Temperature & Automation",
      icon: "☁️",
      accent: "#B8E6D3",
      badgeBg: "rgba(184, 230, 211, 0.22)",
      items: [
        { name: "Docker Containerization", level: "Seasoned", icon: "🐳" },
        { name: "Kubernetes (K8s) Pods", level: "Exploring", icon: "☸️" },
        { name: "Git & GitHub Actions", level: "Mastered", icon: "🐙" },
        { name: "CI/CD Pipelines", level: "Seasoned", icon: "🔄" },
        { name: "Linux OS & Shell Scripting", level: "Seasoned", icon: "🐧" }
      ]
    },
    {
      id: "ai",
      title: "AI Agents & Intelligent Systems",
      subtitle: "The High-Tech Neon Sprinkles",
      icon: "🤖",
      accent: "#FF8FAB",
      badgeBg: "rgba(255, 143, 171, 0.18)",
      items: [
        { name: "Autonomous AI Agents", level: "Seasoned", icon: "🤖" },
        { name: "LLM Tool-Calling APIs", level: "Seasoned", icon: "✨" },
        { name: "LangChain & RAG Pipelines", level: "Seasoned", icon: "🔗" },
        { name: "Vector Embeddings & FAISS", level: "Exploring", icon: "🔍" },
        { name: "FastAPI Agent Orchestration", level: "Mastered", icon: "🚀" }
      ]
    }
  ],

  projects: [
    {
      id: "kafkary",
      title: "Kafkary: Event-Driven Order Processing",
      category: "backend",
      categoryLabel: "Backend & Systems",
      dessertBadge: "Triple-Layer Donut 🍩",
      description: "High-throughput event-driven microservices architecture built with Spring Boot and Apache Kafka. Handles distributed order transactions with idempotency, dead-letter queues, and real-time inventory ledger updates.",
      tech: ["Java", "Spring Boot", "Apache Kafka", "Docker", "PostgreSQL", "Redis"],
      stars: "★★★★★",
      github: "https://github.com/sanskarnannajkar",
      demo: "#contact",
      featured: true
    },
    {
      id: "goglace",
      title: "GoGlace: Ultra-Fast Distributed KV Store",
      category: "backend",
      categoryLabel: "Systems & Go",
      dessertBadge: "Crispy Waffle 🧇",
      description: "Lightweight, low-latency in-memory distributed cache written in Go with TTL eviction, consistent hashing, TCP multiplexing, and concurrent shard locking for rock-solid thread safety.",
      tech: ["Go (Golang)", "gRPC", "Concurrency", "Docker", "TCP"],
      stars: "★★★★★",
      github: "https://github.com/sanskarnannajkar",
      demo: "#contact",
      featured: true
    },
    {
      id: "sweetagent",
      title: "SweetAgent: Multi-Tool Autonomous AI Agent",
      category: "ai",
      categoryLabel: "AI & Agents",
      dessertBadge: "Strawberry Macaron 🍓",
      description: "Autonomous reasoning agent orchestrator that breaks down user objectives into multi-step DAG workflows, executes sandboxed code tools, scrapes web documentation, and queries vector embeddings.",
      tech: ["Python", "FastAPI", "Gemini API", "LangChain", "FAISS"],
      stars: "★★★★★",
      github: "https://github.com/sanskarnannajkar",
      demo: "#contact",
      featured: true
    },
    {
      id: "finsundae",
      title: "FinSundae: Enterprise Financial Stream Analyzer",
      category: "backend",
      categoryLabel: "Data & Systems",
      dessertBadge: "Ice Cream Sundae 🍨",
      description: "Real-time telemetry and financial market pipeline ingesting tick events, calculating exponential moving averages, and detecting high-frequency volatility anomalies with alerting hooks.",
      tech: ["Spring Boot", "Kafka Streams", "TimescaleDB", "Docker", "Grafana"],
      stars: "★★★★★",
      github: "https://github.com/sanskarnannajkar",
      demo: "#contact",
      featured: false
    },
    {
      id: "uselessoven",
      title: "UselessOven: Quirky Digital Experiments",
      category: "creative",
      categoryLabel: "Playful Software",
      dessertBadge: "Rainbow Cupcake 🧁",
      description: "A whimsical showcase of delightfully unnecessary, intentionally over-engineered interactive micro-toys: virtual cake physics, retro terminal soundboards, and comedic automation bots.",
      tech: ["JavaScript", "HTML5 Canvas", "Web Audio API", "CSS3"],
      stars: "★★★★★",
      github: "https://github.com/sanskarnannajkar",
      demo: "#contact",
      featured: false
    },
    {
      id: "cloudbaker",
      title: "CloudBaker: Automated GitOps Deployment Bot",
      category: "ai",
      categoryLabel: "DevOps & AI",
      dessertBadge: "Glazed Éclair 🍫",
      description: "An AI-powered GitHub Action and container watcher that diagnoses failing build logs, suggests Dockerfile optimizations, and triggers canary deployments to localized Kubernetes clusters.",
      tech: ["Go", "Docker", "Kubernetes", "GitHub Actions", "LLM APIs"],
      stars: "★★★★★",
      github: "https://github.com/sanskarnannajkar",
      demo: "#contact",
      featured: false
    }
  ],

  timeline: [
    {
      period: "2023 - 2026 (Expected)",
      title: "Bachelor of Engineering: Electronics & Telecommunication",
      subtitle: "Pune, Maharashtra, India",
      icon: "🎓",
      color: "#FF8FAB",
      description: "Currently in 3rd year. Mastering the physical and logical layers of computing: digital signal processing, microprocessors, computer networks, and operating system kernels."
    },
    {
      period: "2024",
      title: "Backend Engineering Awakening",
      subtitle: "Java, Spring Boot & Relational Databases",
      icon: "🌱",
      color: "#7C6CF0",
      description: "Transitioned from textbook circuits to production backend engineering. Built resilient REST APIs, transactional databases, and embraced clean software design principles."
    },
    {
      period: "2025",
      title: "Distributed Systems & DevOps Deep Dive",
      subtitle: "Apache Kafka, Go Microservices & Docker",
      icon: "⚡",
      color: "#E8A857",
      description: "Explored event streaming, asynchronous message queues with Kafka, high-concurrency programming in Go, containerization with Docker, and foundational Kubernetes concepts."
    },
    {
      period: "2025 - Present",
      title: "AI Agents & Cloud Architecture",
      subtitle: "Autonomous Agents, Function Calling & Scale",
      icon: "🤖",
      color: "#B8E6D3",
      description: "Designing agentic software architectures where LLMs execute deterministically via backend APIs, tool calling, and structured memory streams. Ready for high-impact backend roles!"
    }
  ],

  sideDishes: [
    {
      title: "Building Useless Software",
      icon: "🎮",
      desc: "Delightfully over-engineering silly toys, playful bots, and creative web experiments just for the sheer joy of programming.",
      bg: "rgba(255, 143, 171, 0.16)"
    },
    {
      title: "Deep Tech Reading",
      icon: "📚",
      desc: "Reading classic whitepapers on distributed consensus (Raft, Paxos), JVM internals, and tech history biographies.",
      bg: "rgba(124, 108, 240, 0.16)"
    },
    {
      title: "Financial Market Analytics",
      icon: "📈",
      desc: "Analyzing market data feeds, enterprise financial reports, and exploring quantitative models for fun.",
      bg: "rgba(232, 168, 87, 0.16)"
    },
    {
      title: "AI Agent Experimentation",
      icon: "🤖",
      desc: "Pushing the boundaries of multi-agent collaboration, prompt chain compilation, and deterministic tool execution.",
      bg: "rgba(184, 230, 211, 0.22)"
    },
    {
      title: "Tech Storytelling & Sharing",
      icon: "📱",
      desc: "Distilling complex backend and distributed systems concepts into visual, digestible insights for fellow student engineers.",
      bg: "rgba(255, 143, 171, 0.16)"
    }
  ]
};

/* ============================================================================
   APPLICATION CONTROLLER CLASS
   ============================================================================ */
class SweetStackApp {
  constructor() {
    this.currentTheme = localStorage.getItem('sweet_stack_theme') || 'vanilla';
    this.lenis = null;
    this.init();
  }

  init() {
    // 1. Apply Theme before rendering
    this.applyTheme(this.currentTheme);

    // 2. Render dynamic content from content object
    this.renderContent();

    // 3. Initialize Preloader & Progress
    this.initPreloader();

    // 4. Initialize Smooth Scrolling (Lenis) + GSAP Sync
    this.initSmoothScroll();

    // 5. Initialize 3D Dessert Scene (Three.js)
    try {
      this.dessertScene = initDessertScene();
    } catch (err) {
      console.warn("Three.js dessert scene could not start:", err);
    }

    // 6. Initialize UI Interactions & Micro-animations
    this.initTypedSubtitle();
    this.initCustomCursor();
    this.initClickConfetti();
    this.initScrollProgressBar();
    this.initStatsCounter();
    this.initProjectFilters();
    this.initOrderForm();
    this.initThemeToggle();
    this.initMobileDrawer();
    this.initBackToTop();
    this.initEasterEggListener();
    this.initVanillaTilt();

    // 7. Render Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* --------------------------------------------------------------------------
     THEME (Vanilla <-> Chocolate Mode)
     -------------------------------------------------------------------------- */
  applyTheme(theme) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('sweet_stack_theme', theme);

    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'chocolate' ? '#271615' : '#FFF6E9');
    }
  }

  initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const nextTheme = this.currentTheme === 'chocolate' ? 'vanilla' : 'chocolate';
      this.applyTheme(nextTheme);

      // Micro confetti pop on theme switch
      this.spawnSprinkleBurst(window.innerWidth - 60, 40);
    });
  }

  /* --------------------------------------------------------------------------
     PRELOADER (Under 1.2s crisp exit)
     -------------------------------------------------------------------------- */
  initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-progress');
    if (!preloader || !progressBar) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 12;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        progressBar.style.width = '100%';

        setTimeout(() => {
          preloader.classList.add('fade-out');
          // Trigger entry GSAP animations for Hero
          this.initHeroEntrance();
        }, 300);
      } else {
        progressBar.style.width = `${progress}%`;
      }
    }, 60);
  }

  /* --------------------------------------------------------------------------
     LENIS SMOOTH SCROLL + GSAP SYNC
     -------------------------------------------------------------------------- */
  initSmoothScroll() {
    if (!window.Lenis || !window.gsap) return;

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Anchor smooth scrolling with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          this.lenis.scrollTo(target, { offset: -70 });

          // Close mobile menu if open
          const drawer = document.getElementById('mobile-drawer');
          if (drawer && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     DYNAMIC CONTENT RENDERING
     -------------------------------------------------------------------------- */
  renderContent() {
    // 1. Social Links in Hero
    const socialContainer = document.getElementById('hero-social-links');
    if (socialContainer) {
      socialContainer.innerHTML = content.socials.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon-btn magnetic-btn" aria-label="${s.label}" title="${s.name}">
          <i data-lucide="${s.icon}"></i>
        </a>
      `).join('');
    }

    // 2. Skills Grid (Ingredient Jars)
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      skillsGrid.innerHTML = content.skills.map(cat => `
        <div class="skill-jar-card glass-card" style="--jar-accent: ${cat.accent}; --jar-badge-bg: ${cat.badgeBg};" data-tilt data-tilt-max="5">
          <div class="skill-jar-header">
            <div class="skill-jar-icon">${cat.icon}</div>
            <div class="skill-jar-title-wrap">
              <h3 class="skill-jar-title">${cat.title}</h3>
              <p class="skill-jar-subtitle">${cat.subtitle}</p>
            </div>
          </div>
          <div class="skill-chips-list">
            ${cat.items.map(item => `
              <div class="skill-chip">
                <span class="chip-icon">${item.icon}</span>
                <span class="chip-name">${item.name}</span>
                <span class="chip-level">${item.level}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    // 3. Projects Grid
    this.renderProjects('all');

    // 4. Timeline
    const timelineItems = document.getElementById('timeline-items');
    if (timelineItems) {
      timelineItems.innerHTML = content.timeline.map(item => `
        <div class="timeline-item">
          <div class="timeline-node-icon" style="--node-color: ${item.color};">
            ${item.icon}
          </div>
          <div class="timeline-card glass-card">
            <div class="timeline-header">
              <h3 class="timeline-title">${item.title}</h3>
              <span class="timeline-period">${item.period}</span>
            </div>
            <p class="timeline-sub">${item.subtitle}</p>
            <p class="timeline-desc">${item.description}</p>
          </div>
        </div>
      `).join('');
    }

    // 5. Side Dishes (Beyond Code)
    const sideDishesGrid = document.getElementById('side-dishes-grid');
    if (sideDishesGrid) {
      sideDishesGrid.innerHTML = content.sideDishes.map(dish => `
        <div class="side-dish-card glass-card" style="--dish-bg: ${dish.bg};" data-tilt data-tilt-max="8">
          <div class="side-dish-icon-wrap">${dish.icon}</div>
          <h3 class="side-dish-title">${dish.title}</h3>
          <p class="side-dish-desc">${dish.desc}</p>
        </div>
      `).join('');
    }

    // 6. Current Date in Bakery Receipt
    const ticketDate = document.getElementById('ticket-current-date');
    if (ticketDate) {
      const now = new Date();
      ticketDate.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
    }
  }

  renderProjects(filter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = filter === 'all'
      ? content.projects
      : content.projects.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(p => `
      <article class="project-card glass-card" data-category="${p.category}" data-tilt data-tilt-max="6" data-tilt-glare data-tilt-max-glare="0.12">
        <div class="project-card-header">
          <span class="project-dessert-badge">${p.dessertBadge}</span>
          <span class="project-category">${p.categoryLabel}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech-tags">
            ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          <span class="project-stars" title="Dessert Rating">${p.stars}</span>
          <div class="project-links">
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="GitHub Repository">
              <i data-lucide="github"></i> Code
            </a>
            <a href="${p.demo}" class="project-link-btn primary" aria-label="Live Demo or Details">
              <i data-lucide="external-link"></i> Recipe
            </a>
          </div>
        </div>
      </article>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }

    this.initVanillaTilt();
  }

  /* --------------------------------------------------------------------------
     HERO ENTRANCE & ROTATING TYPED SUBTITLE
     -------------------------------------------------------------------------- */
  initHeroEntrance() {
    if (!window.gsap) return;

    gsap.timeline()
      .from('.hero-badge', { y: -20, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
      .from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from('.hero-subtitle-container', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from('.hero-bio', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-cta-group .btn', { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3')
      .from('.hero-social-row', { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  initTypedSubtitle() {
    const textEl = document.getElementById('typed-text');
    if (!textEl) return;

    const words = content.personal.subtitles;
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const type = () => {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        textEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 45;
      } else {
        textEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 450; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 800);
  }

  /* --------------------------------------------------------------------------
     CUSTOM CURSOR & HOVER STATES
     -------------------------------------------------------------------------- */
  initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    if (!cursor || !follower) return;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    // Hoverable elements trigger cursor enlargement
    const updateHoverables = () => {
      document.querySelectorAll('a, button, .skill-chip, .project-card, .side-dish-card, input, select, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hovering');
          follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovering');
          follower.classList.remove('hovering');
        });
      });
    };

    updateHoverables();
    // Re-bind when dynamic DOM updates
    this.rebindCursorHover = updateHoverables;
  }

  /* --------------------------------------------------------------------------
     SPRINKLE CONFETTI BURST (Click Anywhere)
     -------------------------------------------------------------------------- */
  initClickConfetti() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.confettiParticles = [];

    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Global Click Listener
    window.addEventListener('click', (e) => {
      this.spawnSprinkleBurst(e.clientX, e.clientY);
    });

    // Confetti physics loop
    const animateConfetti = () => {
      if (this.confettiParticles.length > 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
          const p = this.confettiParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.22; // gentle gravity
          p.vx *= 0.98; // air drag
          p.rotation += p.rotSpeed;
          p.life -= p.decay;

          if (p.life <= 0) {
            this.confettiParticles.splice(i, 1);
          } else {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
              this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
              this.ctx.beginPath();
              this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
              this.ctx.fill();
            }

            this.ctx.restore();
          }
        }
      }
      requestAnimationFrame(animateConfetti);
    };

    animateConfetti();
  }

  spawnSprinkleBurst(x, y, count = 24) {
    if (!this.ctx) return;
    const colors = ['#FF8FAB', '#70E4BA', '#FFD166', '#7C6CF0', '#FF9671', '#FFFFFF', '#64DFDF'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;

      this.confettiParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.02,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }
  }

  /* --------------------------------------------------------------------------
     SCROLL PROGRESS BAR WITH ICING DRIP
     -------------------------------------------------------------------------- */
  initScrollProgressBar() {
    const bar = document.getElementById('scroll-progress-bar');
    const navbar = document.getElementById('navbar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${scrollPct}%`;

      // Sticky navbar shadow toggle
      if (navbar) {
        if (scrollTop > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     ANIMATED STATS COUNT-UP (ScrollTrigger)
     -------------------------------------------------------------------------- */
  initStatsCounter() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const statsNumbers = document.querySelectorAll('.stat-number');
    if (!statsNumbers.length) return;

    ScrollTrigger.create({
      trigger: '#stats-counter-row',
      start: 'top 85%',
      onEnter: () => {
        statsNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          gsap.fromTo(stat, {
            innerText: 0
          }, {
            innerText: target,
            duration: 2.2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function() {
              stat.textContent = Math.floor(this.targets()[0].innerText);
            }
          });
        });
      },
      once: true
    });
  }

  /* --------------------------------------------------------------------------
     PROJECT FILTER TABS
     -------------------------------------------------------------------------- */
  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');
        this.renderProjects(filter);

        if (this.rebindCursorHover) {
          this.rebindCursorHover();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     ORDER FORM INTERACTION (Bakery Ticket)
     -------------------------------------------------------------------------- */
  initOrderForm() {
    const form = document.getElementById('bakery-order-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('order-name').value;
      const email = document.getElementById('order-email').value;
      const flavor = document.getElementById('order-flavor').value;
      const notes = document.getElementById('order-notes').value;

      // Construct mailto
      const subject = encodeURIComponent(`[Sweet Stack Order] ${flavor} - From ${name}`);
      const body = encodeURIComponent(
        `Hi Sanskar,\n\nI just placed a bakery order from your portfolio!\n\n` +
        `Customer: ${name}\n` +
        `Contact Email: ${email}\n` +
        `Project Flavor: ${flavor}\n\n` +
        `Recipe Details:\n${notes}\n\n` +
        `Looking forward to baking sweet software together!`
      );

      // Trigger Celebration Confetti Shower
      const submitBtn = document.getElementById('ticket-submit-btn');
      const rect = submitBtn.getBoundingClientRect();
      this.spawnSprinkleBurst(rect.left + rect.width / 2, rect.top, 50);

      // Temporary button state
      submitBtn.innerHTML = `<span>Order Placed! 🧁</span>`;
      submitBtn.style.background = '#38B000';

      setTimeout(() => {
        window.location.href = `mailto:${content.personal.email}?subject=${subject}&body=${body}`;
      }, 700);

      setTimeout(() => {
        submitBtn.innerHTML = `<span>Send Bakery Ticket</span><span class="btn-icon">🚀</span>`;
        submitBtn.style.background = '';
      }, 3500);
    });
  }

  /* --------------------------------------------------------------------------
     MOBILE DRAWER MENU
     -------------------------------------------------------------------------- */
  initMobileDrawer() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (!mobileToggle || !mobileDrawer) return;

    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* --------------------------------------------------------------------------
     BACK TO TOP (Floating Cherry)
     -------------------------------------------------------------------------- */
  initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      if (this.lenis) {
        this.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      this.spawnSprinkleBurst(window.innerWidth - 50, window.innerHeight - 50, 25);
    });
  }

  /* --------------------------------------------------------------------------
     DONUT EASTER EGG LISTENER (5 Clicks -> Toast & Celebration!)
     -------------------------------------------------------------------------- */
  initEasterEggListener() {
    const toast = document.getElementById('easter-egg-toast');
    const closeBtn = document.getElementById('toast-close');

    window.addEventListener('donut-easter-egg', () => {
      // Shower confetti across the screen
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.spawnSprinkleBurst(
            Math.random() * window.innerWidth,
            Math.random() * (window.innerHeight * 0.7),
            35
          );
        }, i * 200);
      }

      // Show toast
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 6000);
      }
    });

    if (closeBtn && toast) {
      closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
      });
    }
  }

  /* --------------------------------------------------------------------------
     VANILLA TILT (3D Card Hover Tilt)
     -------------------------------------------------------------------------- */
  initVanillaTilt() {
    if (!window.VanillaTilt) return;

    const tiltCards = document.querySelectorAll('[data-tilt]');
    VanillaTilt.init(tiltCards, {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      perspective: 1000,
      scale: 1.02
    });
  }
}

// Bootstrap application on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.sweetApp = new SweetStackApp();
});

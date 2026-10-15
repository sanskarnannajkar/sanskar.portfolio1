/**
 * ============================================================================
 * SWEET STACK - 3D DESSERT SCENE (Three.js)
 * High-performance 3D scene built purely from Three.js primitive geometries.
 * Includes Donut, Cupcake, Macaron & Ice Cream Cone with raycast click-bursts,
 * mouse parallax, and ScrollTrigger-driven object choreography.
 * ============================================================================
 */

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js';

class DessertScene {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.canvas) return;

    this.container = document.getElementById('canvas-container');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = window.innerWidth < 768;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // State
    this.isRunning = true;
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();

    // Donut Easter Egg tracking
    this.donutClicks = 0;
    this.donutMaxClicks = 5;

    // Collections
    this.desserts = [];
    this.particles = [];
    this.interactiveMeshes = [];

    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    this.buildDesserts();
    this.setupEventListeners();
    this.setupScrollTriggers();

    // Start render loop
    this.animate();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = false; // lightweight primitives
  }

  setupScene() {
    this.scene = new THREE.Scene();
    // Transparent scene background to allow CSS colors & sprinkle gradients to shine through
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 0, 11);
  }

  setupLights() {
    // Ambient light - warm creamy glow
    const ambientLight = new THREE.AmbientLight(0xFFF7ED, 1.4);
    this.scene.add(ambientLight);

    // Directional key light - crisp highlights
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    keyLight.position.set(7, 10, 8);
    this.scene.add(keyLight);

    // Pastel strawberry pink point light
    this.pinkLight = new THREE.PointLight(0xFF8FAB, 3.5, 30);
    this.pinkLight.position.set(3, 1, 5);
    this.scene.add(this.pinkLight);

    // Pastel mint fill light
    this.mintLight = new THREE.PointLight(0xB8E6D3, 2.2, 28);
    this.mintLight.position.set(-6, 3, 4);
    this.scene.add(this.mintLight);
  }

  /* --------------------------------------------------------------------------
     DESSERT PRIMITIVES BUILDERS
     -------------------------------------------------------------------------- */

  buildDesserts() {
    // 1. Donut (Hero Star)
    this.donutGroup = this.createDonut();
    this.scene.add(this.donutGroup);
    this.desserts.push({
      group: this.donutGroup,
      name: 'donut',
      basePos: this.isMobile ? new THREE.Vector3(0, -1.2, -1.5) : new THREE.Vector3(2.8, 0.1, 0),
      baseRot: new THREE.Euler(0.45, -0.3, 0.2),
      rotSpeed: { x: 0.004, y: 0.007, z: 0.002 },
      floatSpeed: 1.6,
      floatAmp: 0.22,
      phase: 0
    });

    // 2. Cupcake
    this.cupcakeGroup = this.createCupcake();
    this.scene.add(this.cupcakeGroup);
    this.desserts.push({
      group: this.cupcakeGroup,
      name: 'cupcake',
      basePos: this.isMobile ? new THREE.Vector3(-2.2, 3.2, -3) : new THREE.Vector3(-3.8, 2.0, -1.2),
      baseRot: new THREE.Euler(0.2, 0.4, -0.1),
      rotSpeed: { x: 0.003, y: 0.005, z: 0.001 },
      floatSpeed: 1.8,
      floatAmp: 0.18,
      phase: 1.5
    });

    // 3. Macaron
    this.macaronGroup = this.createMacaron();
    this.scene.add(this.macaronGroup);
    this.desserts.push({
      group: this.macaronGroup,
      name: 'macaron',
      basePos: this.isMobile ? new THREE.Vector3(2.2, 3.0, -3.5) : new THREE.Vector3(-3.5, -2.2, -0.8),
      baseRot: new THREE.Euler(0.35, 0.2, 0.3),
      rotSpeed: { x: 0.005, y: 0.006, z: 0.003 },
      floatSpeed: 2.1,
      floatAmp: 0.2,
      phase: 3.0
    });

    // 4. Ice Cream Cone
    this.iceCreamGroup = this.createIceCreamCone();
    this.scene.add(this.iceCreamGroup);
    this.desserts.push({
      group: this.iceCreamGroup,
      name: 'icecream',
      basePos: this.isMobile ? new THREE.Vector3(2.5, -3.5, -4) : new THREE.Vector3(4.6, -2.6, -1.8),
      baseRot: new THREE.Euler(-0.25, 0.35, -0.2),
      rotSpeed: { x: 0.004, y: 0.005, z: 0.002 },
      floatSpeed: 1.7,
      floatAmp: 0.19,
      phase: 4.5
    });

    // Apply initial coordinates
    this.desserts.forEach(d => {
      d.group.position.copy(d.basePos);
      d.group.rotation.copy(d.baseRot);
    });
  }

  /**
   * 1. Donut: Torus dough, glossy strawberry icing layer, 45 scattered sprinkle cylinders
   */
  createDonut() {
    const donutGroup = new THREE.Group();
    donutGroup.name = 'donut';

    // Dough: Baked golden warmth
    const doughGeo = new THREE.TorusGeometry(1.6, 0.72, 32, 64);
    const doughMat = new THREE.MeshStandardMaterial({
      color: 0xEEA058,
      roughness: 0.65,
      metalness: 0.05
    });
    const doughMesh = new THREE.Mesh(doughGeo, doughMat);
    doughMesh.castShadow = true;
    donutGroup.add(doughMesh);
    this.registerInteractive(doughMesh, donutGroup);

    // Frosting: Glossy strawberry glaze
    const frostingGeo = new THREE.TorusGeometry(1.63, 0.64, 32, 64, Math.PI * 2);
    const frostingMat = new THREE.MeshStandardMaterial({
      color: 0xFF6584,
      roughness: 0.22,
      metalness: 0.12
    });
    const frostingMesh = new THREE.Mesh(frostingGeo, frostingMat);
    frostingMesh.scale.set(1.01, 1.01, 1.06);
    frostingMesh.position.set(0, 0, 0.08);
    donutGroup.add(frostingMesh);
    this.registerInteractive(frostingMesh, donutGroup);

    // Sprinkles scattered on the frosting
    const sprinkleColors = [0x70E4BA, 0xFFF275, 0x845EC2, 0xFF9671, 0xFFFFFF];
    const sprinkleGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.24, 8);

    const sprinkleCount = this.isMobile ? 24 : 48;
    for (let i = 0; i < sprinkleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() * 0.7 - 0.35) * Math.PI; // upper hemisphere
      const R = 1.63;
      const r = 0.64;

      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v) + 0.12;

      const col = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];
      const sprinkleMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.3,
        metalness: 0.1
      });
      const sprinkleMesh = new THREE.Mesh(sprinkleGeo, sprinkleMat);
      sprinkleMesh.position.set(x, y, z);
      sprinkleMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      donutGroup.add(sprinkleMesh);
    }

    return donutGroup;
  }

  /**
   * 2. Cupcake: Fluted liner, cake base, swirl frosting tiers, and a glossy cherry on top
   */
  createCupcake() {
    const cupcakeGroup = new THREE.Group();
    cupcakeGroup.name = 'cupcake';

    // Liner (Pleated cylinder)
    const linerGeo = new THREE.CylinderGeometry(0.95, 0.7, 1.15, 28, 1, false);
    const linerMat = new THREE.MeshStandardMaterial({
      color: 0xB8E6D3,
      roughness: 0.6,
      metalness: 0.05,
      flatShading: true
    });
    const linerMesh = new THREE.Mesh(linerGeo, linerMat);
    linerMesh.position.y = -0.55;
    cupcakeGroup.add(linerMesh);
    this.registerInteractive(linerMesh, cupcakeGroup);

    // Cake Base
    const cakeGeo = new THREE.CylinderGeometry(0.92, 0.85, 0.35, 24);
    const cakeMat = new THREE.MeshStandardMaterial({
      color: 0xE8A857,
      roughness: 0.8
    });
    const cakeMesh = new THREE.Mesh(cakeGeo, cakeMat);
    cakeMesh.position.y = 0.1;
    cupcakeGroup.add(cakeMesh);

    // Swirl Frosting (Tiers of smooth cream)
    const frostingMat = new THREE.MeshStandardMaterial({
      color: 0xFFF8F2,
      roughness: 0.25,
      metalness: 0.08
    });

    // Tier 1 (Bottom cream ring)
    const tier1Geo = new THREE.TorusGeometry(0.72, 0.36, 20, 28);
    const tier1 = new THREE.Mesh(tier1Geo, frostingMat);
    tier1.rotation.x = Math.PI / 2;
    tier1.position.y = 0.32;
    cupcakeGroup.add(tier1);
    this.registerInteractive(tier1, cupcakeGroup);

    // Tier 2 (Middle cream dome)
    const tier2Geo = new THREE.SphereGeometry(0.65, 20, 20);
    const tier2 = new THREE.Mesh(tier2Geo, frostingMat);
    tier2.scale.set(1, 0.65, 1);
    tier2.position.y = 0.72;
    cupcakeGroup.add(tier2);
    this.registerInteractive(tier2, cupcakeGroup);

    // Tier 3 (Swirl peak)
    const tier3Geo = new THREE.ConeGeometry(0.42, 0.6, 20);
    const tier3 = new THREE.Mesh(tier3Geo, frostingMat);
    tier3.position.y = 1.15;
    cupcakeGroup.add(tier3);

    // Cherry on Top
    const cherryGeo = new THREE.SphereGeometry(0.24, 20, 20);
    const cherryMat = new THREE.MeshStandardMaterial({
      color: 0xD90429,
      roughness: 0.15,
      metalness: 0.25
    });
    const cherry = new THREE.Mesh(cherryGeo, cherryMat);
    cherry.position.y = 1.55;
    cupcakeGroup.add(cherry);
    this.registerInteractive(cherry, cupcakeGroup);

    // Cherry curved stem
    const stemGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.45, 8);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x3A201A, roughness: 0.8 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(0.08, 1.82, 0);
    stem.rotation.z = -0.35;
    cupcakeGroup.add(stem);

    // Tiny sprinkles on the cupcake
    const sprinkleColors = [0xFF8FAB, 0x7C6CF0, 0x38B000, 0xFFD166];
    const sGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 6);
    for (let i = 0; i < 18; i++) {
      const theta = Math.random() * Math.PI * 2;
      const rad = 0.2 + Math.random() * 0.45;
      const y = 0.45 + Math.random() * 0.65;
      const sMat = new THREE.MeshStandardMaterial({
        color: sprinkleColors[i % sprinkleColors.length],
        roughness: 0.3
      });
      const s = new THREE.Mesh(sGeo, sMat);
      s.position.set(Math.cos(theta) * rad, y, Math.sin(theta) * rad);
      s.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      cupcakeGroup.add(s);
    }

    return cupcakeGroup;
  }

  /**
   * 3. Macaron: Two flattened pastel shells with ruffled feet and creamy filling
   */
  createMacaron() {
    const macaronGroup = new THREE.Group();
    macaronGroup.name = 'macaron';

    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x8A78F0, // Pastel blueberry lavender
      roughness: 0.35,
      metalness: 0.08
    });

    const footMat = new THREE.MeshStandardMaterial({
      color: 0x7563E0,
      roughness: 0.65,
      metalness: 0.05
    });

    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xFFFBF0, // Rich vanilla cream
      roughness: 0.2,
      metalness: 0.05
    });

    // Top Shell
    const topGeo = new THREE.SphereGeometry(1.18, 28, 20);
    const topShell = new THREE.Mesh(topGeo, shellMat);
    topShell.scale.set(1, 0.4, 1);
    topShell.position.y = 0.36;
    macaronGroup.add(topShell);
    this.registerInteractive(topShell, macaronGroup);

    // Top Ruffled Foot
    const topFootGeo = new THREE.TorusGeometry(1.16, 0.1, 16, 32);
    const topFoot = new THREE.Mesh(topFootGeo, footMat);
    topFoot.rotation.x = Math.PI / 2;
    topFoot.position.y = 0.2;
    macaronGroup.add(topFoot);

    // Cream Center
    const creamGeo = new THREE.CylinderGeometry(1.08, 1.08, 0.34, 32);
    const cream = new THREE.Mesh(creamGeo, creamMat);
    macaronGroup.add(cream);
    this.registerInteractive(cream, macaronGroup);

    // Bottom Ruffled Foot
    const bottomFootGeo = new THREE.TorusGeometry(1.16, 0.1, 16, 32);
    const bottomFoot = new THREE.Mesh(bottomFootGeo, footMat);
    bottomFoot.rotation.x = Math.PI / 2;
    bottomFoot.position.y = -0.2;
    macaronGroup.add(bottomFoot);

    // Bottom Shell
    const bottomGeo = new THREE.SphereGeometry(1.18, 28, 20);
    const bottomShell = new THREE.Mesh(bottomGeo, shellMat);
    bottomShell.scale.set(1, 0.4, 1);
    bottomShell.position.y = -0.36;
    macaronGroup.add(bottomShell);
    this.registerInteractive(bottomShell, macaronGroup);

    return macaronGroup;
  }

  /**
   * 4. Ice Cream Cone: Crispy waffle cone + double scoop (blueberry & strawberry)
   */
  createIceCreamCone() {
    const iceCreamGroup = new THREE.Group();
    iceCreamGroup.name = 'icecream';

    // Waffle Cone (inverted cone)
    const coneGeo = new THREE.ConeGeometry(0.88, 2.2, 24);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0xD49852,
      roughness: 0.65,
      metalness: 0.05,
      flatShading: true
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.rotation.x = Math.PI;
    cone.position.y = -0.85;
    iceCreamGroup.add(cone);
    this.registerInteractive(cone, iceCreamGroup);

    // Scoop 1 (Bottom Blueberry scoop)
    const scoop1Geo = new THREE.SphereGeometry(0.82, 22, 22);
    const scoop1Mat = new THREE.MeshStandardMaterial({
      color: 0x7C6CF0,
      roughness: 0.45,
      metalness: 0.05
    });
    const scoop1 = new THREE.Mesh(scoop1Geo, scoop1Mat);
    scoop1.position.y = 0.45;
    iceCreamGroup.add(scoop1);
    this.registerInteractive(scoop1, iceCreamGroup);

    // Scoop 1 Skirt
    const skirtGeo = new THREE.TorusGeometry(0.8, 0.15, 14, 24);
    const skirt = new THREE.Mesh(skirtGeo, scoop1Mat);
    skirt.rotation.x = Math.PI / 2;
    skirt.position.y = 0.22;
    iceCreamGroup.add(skirt);

    // Scoop 2 (Top Strawberry scoop)
    const scoop2Geo = new THREE.SphereGeometry(0.68, 22, 22);
    const scoop2Mat = new THREE.MeshStandardMaterial({
      color: 0xFF8FAB,
      roughness: 0.4,
      metalness: 0.05
    });
    const scoop2 = new THREE.Mesh(scoop2Geo, scoop2Mat);
    scoop2.position.y = 1.35;
    iceCreamGroup.add(scoop2);
    this.registerInteractive(scoop2, iceCreamGroup);

    return iceCreamGroup;
  }

  registerInteractive(mesh, parentGroup) {
    mesh.userData.parentDessert = parentGroup;
    this.interactiveMeshes.push(mesh);
  }

  /* --------------------------------------------------------------------------
     EVENT LISTENERS & RAYCASTING
     -------------------------------------------------------------------------- */

  setupEventListeners() {
    // Mouse Parallax movement
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / this.width) * 2 - 1;
      this.mouse.targetY = -(e.clientY / this.height) * 2 + 1;
    }, { passive: true });

    // Click on 3D dessert -> Raycast, bounce and sprinkle burst
    window.addEventListener('click', (e) => {
      this.handleClick(e);
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.onResize();
    });

    // Pause rendering when tab is hidden (performance & battery saving)
    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        this.clock.start();
        this.animate();
      }
    });

    // Support reduced motion changes dynamically
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  handleClick(e) {
    // Check if clicked element is an interactive link, button or form input first
    const targetTag = e.target.tagName.toLowerCase();
    if (['a', 'button', 'input', 'textarea', 'select', 'label'].includes(targetTag) || e.target.closest('button, a, input, select, textarea')) {
      return;
    }

    this.mouseVector.x = (e.clientX / this.width) * 2 - 1;
    this.mouseVector.y = -(e.clientY / this.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const parentGroup = hit.object.userData.parentDessert;
      if (parentGroup) {
        this.triggerDessertBounce(parentGroup, hit.point);
      }
    }
  }

  triggerDessertBounce(group, hitPoint) {
    const dessertType = group.name;

    // 1. Squash & Stretch Bounce Animation (using GSAP if available, or fallback)
    if (window.gsap) {
      gsap.killTweensOf(group.scale);
      gsap.killTweensOf(group.rotation);

      const baseScale = group.name === 'donut' ? 1.05 : 1.0;
      gsap.timeline()
        .to(group.scale, {
          x: baseScale * 1.35,
          y: baseScale * 0.75,
          z: baseScale * 1.35,
          duration: 0.15,
          ease: 'power2.out'
        })
        .to(group.scale, {
          x: baseScale * 0.88,
          y: baseScale * 1.25,
          z: baseScale * 0.88,
          duration: 0.22,
          ease: 'bounce.out'
        })
        .to(group.scale, {
          x: baseScale,
          y: baseScale,
          z: baseScale,
          duration: 0.35,
          ease: 'elastic.out(1, 0.4)'
        });

      // Quick playful wobble rotation
      gsap.to(group.rotation, {
        y: group.rotation.y + (Math.random() > 0.5 ? 0.9 : -0.9),
        z: group.rotation.z + 0.3,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    // 2. Spawn 3D Sprinkle Particle Burst from hitPoint
    this.createSprinkleBurst(hitPoint || group.position);

    // 3. Handle Donut Easter Egg (5 clicks -> Toast & Confetti Shower!)
    if (dessertType === 'donut') {
      this.donutClicks++;

      // Update UI meter in hero card if present
      const meterBar = document.getElementById('donut-meter-bar');
      const meterText = document.getElementById('donut-clicks-text');
      if (meterBar && meterText) {
        const pct = Math.min((this.donutClicks / this.donutMaxClicks) * 100, 100);
        meterBar.style.setProperty('--meter-width', `${pct}%`);
        meterText.textContent = `${this.donutClicks} / ${this.donutMaxClicks} bites`;
      }

      if (this.donutClicks >= this.donutMaxClicks) {
        // Trigger celebratory easter egg
        this.triggerEasterEgg();
        this.donutClicks = 0; // reset for next round
        if (meterBar && meterText) {
          setTimeout(() => {
            meterBar.style.setProperty('--meter-width', '0%');
            meterText.textContent = `0 / ${this.donutMaxClicks} bites`;
          }, 3500);
        }
      }
    }

    // Dispatch global custom event for main.js listeners
    window.dispatchEvent(new CustomEvent('dessert-interact', {
      detail: { type: dessertType, clicks: this.donutClicks }
    }));
  }

  createSprinkleBurst(origin) {
    const colors = [0xFF8FAB, 0x70E4BA, 0xFFF275, 0x845EC2, 0xFF9671, 0xFFFFFF];
    const particleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 6);
    const count = this.isMobile ? 18 : 36;

    for (let i = 0; i < count; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 1
      });

      const particle = new THREE.Mesh(particleGeo, mat);
      particle.position.copy(origin);

      // Random explosive velocity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 2.5 + Math.random() * 4.5;

      const vel = new THREE.Vector3(
        speed * Math.sin(phi) * Math.cos(theta),
        speed * Math.sin(phi) * Math.sin(theta),
        speed * Math.cos(phi)
      );

      const rotVel = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );

      this.scene.add(particle);
      this.particles.push({
        mesh: particle,
        velocity: vel,
        rotVelocity: rotVel,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.015
      });
    }
  }

  triggerEasterEgg() {
    // 1. Crazy Donut 720 degree spin
    if (window.gsap && this.donutGroup) {
      gsap.to(this.donutGroup.rotation, {
        y: this.donutGroup.rotation.y + Math.PI * 4,
        x: this.donutGroup.rotation.x + Math.PI * 2,
        duration: 1.8,
        ease: 'power3.inOut'
      });
      gsap.to(this.donutGroup.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    }

    // 2. Dispatch custom event for main.js to show toast & blast confetti
    window.dispatchEvent(new CustomEvent('donut-easter-egg'));
  }

  /* --------------------------------------------------------------------------
     SCROLLTRIGGER INTEGRATION (Smooth 3D Choreography on Scroll)
     -------------------------------------------------------------------------- */

  setupScrollTriggers() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Scroll-driven migration for Donut
    gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    })
    .to(this.donutGroup.position, {
      x: this.isMobile ? 2.5 : 4.4,
      y: -0.6,
      z: -1.2,
      ease: 'none'
    })
    .to(this.donutGroup.rotation, {
      x: 0.8,
      y: 1.4,
      z: -0.2,
      ease: 'none'
    }, 0);

    // Scroll migration for Cupcake (migrates towards Skills & Recipes)
    gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    })
    .to(this.cupcakeGroup.position, {
      x: this.isMobile ? -2.5 : -4.6,
      y: 0.4,
      z: -0.8,
      ease: 'none'
    })
    .to(this.cupcakeGroup.rotation, {
      y: Math.PI * 1.5,
      x: 0.3,
      ease: 'none'
    }, 0);

    // Scroll migration for Macaron (migrates into Projects & Timeline)
    gsap.timeline({
      scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    })
    .to(this.macaronGroup.position, {
      x: this.isMobile ? 2.0 : 4.8,
      y: 1.2,
      z: -1.4,
      ease: 'none'
    })
    .to(this.macaronGroup.rotation, {
      x: 1.2,
      y: 2.2,
      ease: 'none'
    }, 0);

    // Scroll migration for Ice Cream (migrates towards Beyond & Contact)
    gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.5
      }
    })
    .to(this.iceCreamGroup.position, {
      x: this.isMobile ? -1.8 : -4.2,
      y: -1.5,
      z: -0.5,
      ease: 'none'
    })
    .to(this.iceCreamGroup.rotation, {
      z: 0.4,
      y: Math.PI,
      ease: 'none'
    }, 0);
  }

  /* --------------------------------------------------------------------------
     ANIMATION LOOP & RENDER
     -------------------------------------------------------------------------- */

  animate() {
    if (!this.isRunning) return;

    requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // Mouse Parallax Lerping
    if (!this.reducedMotion) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      this.camera.position.x = this.mouse.x * 0.45;
      this.camera.position.y = this.mouse.y * 0.35;
      this.camera.lookAt(0, 0, 0);

      // Light subtle position follow
      if (this.pinkLight) {
        this.pinkLight.position.x = 3 + this.mouse.x * 1.5;
        this.pinkLight.position.y = 1 + this.mouse.y * 1.5;
      }
    }

    // Floating idle bounce & spin for each dessert
    this.desserts.forEach(d => {
      if (!this.reducedMotion) {
        d.group.rotation.x += d.rotSpeed.x;
        d.group.rotation.y += d.rotSpeed.y;
        d.group.rotation.z += d.rotSpeed.z;

        // Mild harmonic floating oscillation
        const bob = Math.sin(elapsedTime * d.floatSpeed + d.phase) * d.floatAmp;
        d.group.position.y = d.basePos.y + bob;
      }
    });

    // Update 3D Sprinkle Burst Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= p.decay;

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
      } else {
        p.velocity.y -= 4.2 * delta; // gravity
        p.mesh.position.addScaledVector(p.velocity, delta);
        p.mesh.rotation.x += p.rotVelocity.x * delta;
        p.mesh.rotation.y += p.rotVelocity.y * delta;
        p.mesh.rotation.z += p.rotVelocity.z * delta;
        p.mesh.material.opacity = p.life;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = window.innerWidth < 768;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

// Export initialization function
export function initDessertScene() {
  return new DessertScene();
}

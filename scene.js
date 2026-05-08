import * as THREE from 'three';

let scene, camera, renderer;
let particlesMesh, nebulaMesh, starsMesh;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

export function initScene() {
    const canvas = document.getElementById('bg-canvas');

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020611, 0.015); // Neblina tenue

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 30;

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimizado
    renderer.setClearColor(0x020611, 1); // Azul oscuro profundo

    // 4. Create Space Environment
    createNebula();
    createStars();
    createDynamicParticles();

    // 5. Event Listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);

    // 6. Animation Loop
    animate();
}

function createNebula() {
    const geometry = new THREE.BufferGeometry();
    const count = 400;
    const posArray = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 120;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Generar textura de glow circular
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(0, 100, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
        size: 30,
        map: texture,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    nebulaMesh = new THREE.Points(geometry, material);
    scene.add(nebulaMesh);
}

function createStars() {
    const geometry = new THREE.BufferGeometry();
    const count = 4000;
    const posArray = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 200;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x88ccff,
        transparent: true,
        opacity: 0.6
    });
    
    starsMesh = new THREE.Points(geometry, material);
    scene.add(starsMesh);
}

function createDynamicParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const posArray = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Generar textura de estrella brillante
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
        size: 1.2,
        map: texture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Parallax suave
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Movimiento constante y sutil del espacio
    if (nebulaMesh) {
        nebulaMesh.rotation.y -= 0.0003;
        nebulaMesh.rotation.x -= 0.0001;
    }
    if (starsMesh) {
        starsMesh.rotation.y -= 0.0001;
    }
    if (particlesMesh) {
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.z += 0.0002;
    }

    renderer.render(scene, camera);
}

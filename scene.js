import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let raycaster, mouse;
let interactableObjects = [];
let particlesMesh;

export function initScene() {
    const canvas = document.getElementById('bg-canvas');

    // Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020813, 0.03);

    // Camera Setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);

    // Renderer Setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go too far below ground
    controls.minDistance = 5;
    controls.maxDistance = 30;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x00f0ff, 1);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x0b5ed7, 2, 20);
    blueLight.position.set(-5, 2, -5);
    scene.add(blueLight);

    // Create Environment
    createParticles();
    createHolographicSimulator();

    // Raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Animation Loop
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
}

function createHolographicSimulator() {
    // Base platform
    const platformGeo = new THREE.CylinderGeometry(8, 8, 0.5, 32);
    const platformMat = new THREE.MeshStandardMaterial({
        color: 0x0a192f,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -2;
    scene.add(platform);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(20, 40, 0x0b5ed7, 0x00f0ff);
    gridHelper.position.y = -1.75;
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Generic Material for Components
    const componentMat = new THREE.MeshStandardMaterial({
        color: 0x020813,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.2,
        roughness: 0.1,
        metalness: 0.8,
        wireframe: false
    });

    // 1. PC Case Module
    const pcGeo = new THREE.BoxGeometry(2, 4, 4);
    const pc = new THREE.Mesh(pcGeo, componentMat.clone());
    pc.position.set(-4, 0.5, -2);
    pc.castShadow = true;
    pc.userData = { id: 'cpu', name: 'Ryzen 9 9950X3D Core', price: '19,500' };
    scene.add(pc);
    interactableObjects.push(pc);

    // PC Glow
    const pcEdges = new THREE.EdgesGeometry(pcGeo);
    const pcLine = new THREE.LineSegments(pcEdges, new THREE.LineBasicMaterial({ color: 0x00f0ff }));
    pc.add(pcLine);

    // 2. Main Monitor
    const monitorGeo = new THREE.BoxGeometry(6, 3.5, 0.2);
    const monitorMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.4,
    });
    const monitor = new THREE.Mesh(monitorGeo, monitorMat);
    monitor.position.set(0, 1.5, -4);
    monitor.userData = { id: 'monitors', name: 'Sistema Visual 4K', price: '45,000' };
    scene.add(monitor);
    interactableObjects.push(monitor);

    const mEdges = new THREE.EdgesGeometry(monitorGeo);
    monitor.add(new THREE.LineSegments(mEdges, new THREE.LineBasicMaterial({ color: 0x0b5ed7 })));

    // Side Monitors (Curved setup approximation)
    const monitorL = new THREE.Mesh(monitorGeo, monitorMat);
    monitorL.position.set(-5.5, 1.5, -2.5);
    monitorL.rotation.y = Math.PI / 4;
    monitorL.userData = { id: 'monitors', name: 'Canal Visual Izq', price: 'Incluido' };
    scene.add(monitorL);
    interactableObjects.push(monitorL);

    const monitorR = new THREE.Mesh(monitorGeo, monitorMat);
    monitorR.position.set(5.5, 1.5, -2.5);
    monitorR.rotation.y = -Math.PI / 4;
    monitorR.userData = { id: 'monitors', name: 'Canal Visual Der', price: 'Incluido' };
    scene.add(monitorR);
    interactableObjects.push(monitorR);

    // 3. Yoke / Controls Panel
    const yokeGeo = new THREE.BoxGeometry(3, 0.5, 1.5);
    const yoke = new THREE.Mesh(yokeGeo, componentMat.clone());
    yoke.position.set(0, -0.5, -1);
    yoke.rotation.x = Math.PI / 16;
    yoke.userData = { id: 'yoke', name: 'Yoke & Panel', price: '15,000' };
    scene.add(yoke);
    interactableObjects.push(yoke);

    const yokeLine = new THREE.LineSegments(new THREE.EdgesGeometry(yokeGeo), new THREE.LineBasicMaterial({ color: 0x00f0ff }));
    yoke.add(yokeLine);

    // 4. Seat
    const seatGeo = new THREE.BoxGeometry(2, 2.5, 2);
    const seat = new THREE.Mesh(seatGeo, componentMat.clone());
    seat.position.set(0, -0.5, 2);
    seat.userData = { id: 'pedals', name: 'Asiento & Pedales', price: '8,500' };
    scene.add(seat);
    interactableObjects.push(seat);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    // Stop auto rotate on user interaction
    controls.autoRotate = false;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactableObjects);

    // Reset emissive
    interactableObjects.forEach(obj => {
        if (obj.material.emissive) {
            obj.material.emissiveIntensity = 0.2;
        }
    });

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const obj = intersects[0].object;
        if (obj.material.emissive) {
            obj.material.emissiveIntensity = 0.8;
        }
    } else {
        document.body.style.cursor = 'default';
    }
}

function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactableObjects);

    if (intersects.length > 0) {
        const obj = intersects[0].object;
        const data = obj.userData;

        // Show Tooltip
        const tooltip = document.getElementById('3d-tooltip');
        document.getElementById('tooltip-title').innerText = data.name.toUpperCase();
        document.getElementById('tooltip-price').innerText = `$${data.price} MXN`;
        document.getElementById('tooltip-desc').innerText = "Click para más detalles en la sección.";

        // Position tooltip near click
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.top = `${event.clientY}px`;
        tooltip.classList.add('visible');
    } else {
        document.getElementById('3d-tooltip').classList.remove('visible');
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles slowly
    if (particlesMesh) {
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
    }

    controls.update();
    renderer.render(scene, camera);
}

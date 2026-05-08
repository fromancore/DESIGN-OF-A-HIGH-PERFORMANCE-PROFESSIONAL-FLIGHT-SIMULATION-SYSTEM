// Import Scene Engine
import { initScene } from './scene.js';

// DATA
const internalComponents = [
    { id: 'cpu', name: 'AMD Ryzen 9 9950X3D', price: 13242, image: 'assets/AMD Ryzen 9 9950X3D 4.3 GHz 16-Core Processor.png', category: 'CPU', desc: 'Procesador Zen 5 con 3D V-Cache masivo para minimizar la latencia del Sim Thread en Prepar3D.', perf: 98, specs: '16 Núcleos, 32 Hilos, 144MB Caché' },
    { id: 'cooler', name: 'Corsair iCUE H170i ELITE CAPELLIX', price: 5582, image: 'assets/Corsair iCUE H170i ELITE CAPELLIX Liquid CPU Cooler.png', category: 'Refrigeración', desc: 'Refrigeración líquida AIO de 420mm para mantener temperaturas óptimas en cargas sostenidas.', perf: 95, specs: 'Radiador 420mm, 3x ML140 RGB PWM' },
    { id: 'mobo', name: 'Asus ROG CROSSHAIR X670E EXTREME', price: 22399, image: 'assets/Asus ROG CROSSHAIR X670E EXTREME EATX AM5 Motherboard.png', category: 'Motherboard', desc: 'Plataforma extrema con PCIe 5.0 para asegurar el máximo ancho de banda entre CPU y las GPUs duales.', perf: 90, specs: 'Chipset X670E, PCIe 5.0 x16 dual' },
    { id: 'ram', name: 'G.SKILL Trident Z5 Neo RGB DDR5 64GB', price: 19815, image: 'assets/G.SKILL Trident Z5 Neo RGB Series DDR5 RAM.png', category: 'RAM', desc: 'DDR5 de alta velocidad (6000MHz) y baja latencia para carga de texturas fotorealistas.', perf: 95, specs: '64GB (2x32) DDR5-6000 CL30' },
    { id: 'nvme1', name: 'Samsung 990 Pro 2TB', price: 9985, image: 'assets/Samsung Serie 990 Pro.png', category: 'SSD', desc: 'Unidad NVMe PCIe 4.0 principal para SO y el core de Prepar3D.', perf: 98, specs: 'Lectura: 7450 MB/s, 2TB' },
    { id: 'nvme2', name: 'WD Black SN850X 4TB', price: 13115, image: 'assets/WD_Black 4TB SN850X NVMe Internal Gaming SSD Solid State Drive.png', category: 'SSD', desc: 'Unidad secundaria de alta capacidad para caché de texturas y addons.', perf: 95, specs: 'Lectura: 7300 MB/s, 4TB' },
    { id: 'hdd', name: 'Seagate Exos X18 18TB', price: 9500, image: 'assets/Seagate Exos X18 ST18000NM001J - Disco duro.png', category: 'HDD', desc: 'Almacenamiento masivo para escenarios globales (Orthophotos) y malla de terreno.', perf: 70, specs: '7200 RPM, SATA 6Gb/s, 256MB Cache' },
    { id: 'gpu1', name: 'RTX 4090 Founders Edition', price: 80500, image: 'assets/VIPERA NVIDIA GeForce RTX 4090 Founders Edition.png', category: 'GPU Principal', desc: 'Unidad de renderizado principal. Maneja las ventanas de simulación exteriores (out-the-window) a 4K 60FPS.', perf: 100, specs: '24GB GDDR6X, 16384 CUDA Cores' },
    { id: 'gpu2', name: 'RTX 4080 Super Founders Edition', price: 25057, image: 'assets/NVIDIA Tarjeta gráfica GeForce RTX 4080 Super Founders Edition.png', category: 'GPU Secundaria', desc: 'Dedicada exclusivamente al renderizado de paneles de instrumentos 2D/3D (Glass Cockpit) sin afectar los FPS principales.', perf: 85, specs: '16GB GDDR6X' },
    { id: 'psu', name: 'Corsair AX1600i', price: 9000, image: 'assets/Corsair HX1500i (2025) Fuente de alimentación.png', category: 'Energía', desc: 'Fuente de poder de grado Titanio capaz de sostener las demandas transitorias de dos GPUs de alta gama.', perf: 100, specs: '1600W, 80+ Titanium, DSP' },
    { id: 'nic', name: 'Intel X550-T2', price: 4500, image: 'assets/For Intel X550-T2, 10GbE Converged Network Adapter.png', category: 'Red', desc: 'Tarjeta de red de 10GbE para telemetría de ultra baja latencia (DIS/CIGI).', perf: 90, specs: 'Dual Port 10GBASE-T' },
    { id: 'os', name: 'Windows 11 Pro OEM', price: 395, image: 'assets/Windows 11 Pro(OEM).png', category: 'Sistema Operativo', desc: 'Sistema operativo principal.', perf: 100, specs: '64-bit' },
    { id: 'gabinete', name: 'Workstation principal', price: 6500, image: 'assets/Asus ROG Strix Helios ATX Full Tower Case.png', category: 'Gabinete', desc: 'Chasis E-ATX premium que alberga todos los componentes internos con flujo de aire optimizado.', perf: 100, specs: 'ATX Full Tower, Cristal Templado' }
];

const peripherals = [
    { id: 'yoke', name: 'Honeycomb Alpha Flight Controls Pro', price: 6690, image: 'assets/Honeycomb Alpha Flight Controls Pro.png', category: 'Control', desc: 'Yugo profesional con rotación de 180° y panel de interruptores para aviación general.', perf: 95, specs: 'Sensores de efecto Hall, Panel de switches retroiluminado' },
    { id: 'throttle', name: 'Honeycomb Bravo Throttle Quadrant', price: 6982, image: 'assets/Honeycomb Bravo Throttle Quadrant.png', category: 'Control', desc: 'Cuadrante de aceleradores modular para aviones comerciales y de aviación general.', perf: 95, specs: 'Piloto automático integrado, Trim wheel' },
    { id: 'rudder', name: 'Thrustmaster TPR Pendular Rudder', price: 12500, image: 'assets/Thrustmaster TPR Pendular Rudder.png', category: 'Control', desc: 'Pedales pendulares con tecnología HEART para precisión extrema y fluidez.', perf: 100, specs: 'Construcción 100% metálica, Sensores magnéticos' },
    { id: 'radio', name: 'Logitech/Saitek Pro Flight Radio Panel', price: 3500, image: 'assets/Logitech_Saitek Pro Flight Radio Panel.png', category: 'Control', desc: 'Panel de radio para comunicación y navegación directa sin usar el mouse.', perf: 85, specs: 'COM1/COM2/NAV1/NAV2/DME/ADF' },
    { id: 'autopilot', name: 'Logitech Pro Flight Autopilot Panel', price: 3500, image: 'assets/Logitech Pro Flight Autopilot Panel.png', category: 'Control', desc: 'Panel de piloto automático LED para ajuste de rumbo, altitud y velocidad vertical.', perf: 85, specs: 'Autothrottle, Flaps control' },
    { id: 'headset', name: 'Bose A30 Aviation Headset', price: 27309, image: 'assets/Bose A30 Aviation Headset.png', category: 'Audio', desc: 'Auriculares de aviación líderes en la industria con cancelación de ruido activa.', perf: 100, specs: 'Bluetooth, Cancelación de ruido digital' },
    { id: 'monitors_center', name: 'LG Ultragear Curvo 34” WQHD 160Hz', price: 6999, image: "assets/LG Monitor Gaming Curvo Ultragear 34'.png", category: 'Visual', desc: 'Monitor principal ultrapanorámico para proporcionar inmersión en la cabina virtual.', perf: 95, specs: '34", WQHD, 160Hz, 1ms' },
    { id: 'monitors_side', name: 'Samsung 32” S3 Curvo FHD 100Hz', price: 4500, image: 'assets/Samsung 32 pulgadas S3.png', category: 'Visual', desc: 'Monitor secundario curvo para visualizar paneles de instrumentos laterales y mapas.', perf: 85, specs: '32", FHD, 100Hz' },
    { id: 'mouse', name: 'Logitech MX Master 3S', price: 1553, image: 'assets/Logitech MX Master 3S Mouse Inalámbrico de Desempeño.png', category: 'Accesorio', desc: 'Mouse de productividad avanzado con sensor de 8000 DPI para control de cabina.', perf: 95, specs: 'Scrolling MagSpeed, Sensores de cristal' },
    { id: 'keyboard', name: 'Logitech G Pro X TKL Rapid', price: 2349, image: 'assets/Logitech G Pro X TKL Rapid, Teclado para Gaming.png', category: 'Accesorio', desc: 'Teclado mecánico compacto sin teclado numérico para macros de simulación.', perf: 90, specs: 'Switches mecánicos, LIGHTSYNC RGB' },
    { id: 'seat', name: 'Flight Seat Pro', price: 12000, image: 'assets/Flight seat pro.png', category: 'Mobiliario', desc: 'Asiento de simulación inmersivo para montar controles de vuelo de forma realista.', perf: 90, specs: 'Estructura de acero, Asiento reclinable' },
    { id: 'desk', name: 'VASAGLE Escritorio en Forma de L', price: 2500, image: 'assets/VASAGLE Escritorio, Mesa de Ordenador en Forma de L.png', category: 'Mobiliario', desc: 'Estación de trabajo amplia para colocar monitores secundarios y accesorios logísticos.', perf: 80, specs: 'Estructura metálica, Madera MDF' }
];

// STATE
let loaded = false;

function initApp() {
    // Populate UI
    populateGrid('internal-components-grid', internalComponents);
    populateGrid('peripherals-grid', peripherals);
    populateBudget();
    
    // Init Animations & Scene
    initPreloader();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initPreloader() {
    let progress = 0;
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');
    
    // Fake loading sequence
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        bar.style.width = `${progress}%`;
        text.innerText = `${Math.floor(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                // Hide preloader
                gsap.to('#preloader', {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        document.getElementById('preloader').style.display = 'none';
                        // Init core features
                        initScene();
                        initScrollAnimations();
                    }
                });
            }, 500);
        }
    }, 150);
}

function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Parallax
    gsap.to('.hero-content', {
        yPercent: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Glass Cards Reveal
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Navbar Background Change on Scroll
    ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
            const nav = document.getElementById('navbar');
            if(self.direction === 1) {
                nav.style.background = 'rgba(2, 8, 19, 0.9)';
            } else if (self.progress === 0) {
                nav.style.background = 'rgba(10, 25, 47, 0.4)';
            }
        }
    });
}

function populateGrid(containerId, data) {
    const container = document.getElementById(containerId);
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card component-card';
        card.innerHTML = `
            <div class="component-icon">
                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: contain; mix-blend-mode: screen; filter: drop-shadow(0 0 10px rgba(0,240,255,0.5));">
                <div class="holo-mesh" style="position: absolute; top: 10%; left: 10%; z-index: -1;"></div>
            </div>
            <h4 class="font-syncopate text-white mb-2" style="font-size:0.9rem">${item.name}</h4>
            <div class="text-cyan font-rajdhani mb-3">$${item.price.toLocaleString()} MXN</div>
            <button class="btn-hud-small" onclick="openModal('${item.id}')">INSPECCIONAR</button>
        `;
        container.appendChild(card);
    });
}

function populateBudget() {
    const tbody = document.getElementById('budget-table-body');
    const allItems = [...internalComponents, ...peripherals];
    let total = 0;
    
    allItems.forEach(item => {
        total += item.price;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="font-inter text-white">${item.name}</td>
            <td class="font-rajdhani text-light-blue">${item.category}</td>
            <td class="font-rajdhani text-cyan">$${item.price.toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById('budget-total').innerText = `$${total.toLocaleString()} MXN`;
}

// Global functions for modal
window.openModal = function(id) {
    const allItems = [...internalComponents, ...peripherals];
    const item = allItems.find(i => i.id === id);
    if(!item) return;

    document.getElementById('modal-title').innerText = item.category.toUpperCase();
    
    const imageContainer = document.getElementById('modal-image-container');
    imageContainer.innerHTML = `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 100%; height: 100%; object-fit: contain; mix-blend-mode: screen; filter: drop-shadow(0 0 15px rgba(0,240,255,0.6)); position: relative; z-index: 10;"><div class="hologram-effect" style="display:none; position: absolute;"></div><div class="model-name-overlay font-syncopate" id="modal-model-name">${item.name.substring(0, 15).toUpperCase()}</div>`;
    
    document.getElementById('modal-price').innerText = `$${item.price.toLocaleString()} MXN`;
    document.getElementById('modal-specs').innerText = item.specs;
    document.getElementById('modal-usage').innerText = item.desc;
    
    setTimeout(() => {
        document.getElementById('modal-perf').style.width = item.perf + '%';
    }, 300);

    const modal = document.getElementById('component-modal');
    modal.classList.add('active');
};

window.closeModal = function() {
    document.getElementById('component-modal').classList.remove('active');
    document.getElementById('modal-perf').style.width = '0%';
};



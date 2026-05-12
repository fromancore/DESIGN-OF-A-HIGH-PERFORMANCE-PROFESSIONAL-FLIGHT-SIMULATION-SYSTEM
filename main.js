// Import Scene Engine
import { initScene } from './scene.js';

// DATA
const internalComponents = [
    { id: 'cpu', name: 'AMD Ryzen 9 9950X3D', price: 13242, image: 'assets/AMD Ryzen 9 9950X3D 4.3 GHz 16-Core Processor.png', category: 'CPU', desc: 'Procesador optimizado para simulación avanzada, multitarea extrema y escenarios complejos.', perf: 95, specs: '16 Núcleos, 32 Hilos, 3D V-Cache', graphs: ['assets/Rendimiento de CPU en Simulación de vuelo.png', 'assets/Caché L3 comparativa.png', 'assets/Consumo TDP.png', 'assets/Relación precio_rendimiento en simulación de vuelo.png'] },
    { id: 'cooler', name: 'Corsair iCUE H170i ELITE CAPELLIX', price: 5582, image: 'assets/Corsair iCUE H170i ELITE CAPELLIX Liquid CPU Cooler.png', category: 'Refrigeración', desc: 'Refrigeración líquida AIO de 420mm para mantener temperaturas óptimas en cargas sostenidas.', perf: 95, specs: 'Radiador 420mm, 3x ML140 RGB PWM' },
    { id: 'mobo', name: 'Asus ROG CROSSHAIR X670E EXTREME', price: 22399, image: 'assets/Asus ROG CROSSHAIR X670E EXTREME EATX AM5 Motherboard.png', category: 'Motherboard', desc: 'Plataforma extrema con PCIe 5.0 para asegurar el máximo ancho de banda entre CPU y las GPUs duales.', perf: 90, specs: 'Chipset X670E, PCIe 5.0 x16 dual' },
    { id: 'ram', name: 'Corsair Dominator Titanium DDR5', price: 19815, image: 'assets/G.SKILL Trident Z5 Neo RGB Series DDR5 RAM.png', category: 'RAM', desc: 'Permite manejar grandes volúmenes de datos y múltiples procesos simultáneamente.', perf: 85, specs: 'DDR5 Alta Velocidad', graphs: ['assets/Ancho de banda DDR5 vs DDR4.png', 'assets/Latencia real.png', 'assets/Consumo RAM por configuración de add-ons.png'] },
    { id: 'nvme1', name: 'Samsung 990 PRO NVMe', price: 9985, image: 'assets/Samsung Serie 990 Pro.png', category: 'SSD', desc: 'Carga rápida de escenarios, texturas y datos aeronáuticos complejos.', perf: 85, specs: 'NVMe Gen4 SSD', graphs: ['assets/Velocidad de lectura secuencial.png', 'assets/Tiempo de carga de escenario.png'] },
    { id: 'nvme2', name: 'WD Black SN850X 4TB', price: 13115, image: 'assets/WD_Black 4TB SN850X NVMe Internal Gaming SSD Solid State Drive.png', category: 'SSD', desc: 'Unidad secundaria de alta capacidad para caché de texturas y addons.', perf: 95, specs: 'Lectura: 7300 MB/s, 4TB' },
    { id: 'hdd', name: 'Seagate Exos X18 18TB', price: 9500, image: 'assets/Seagate Exos X18 ST18000NM001J - Disco duro.png', category: 'HDD', desc: 'Almacenamiento masivo para escenarios globales (Orthophotos) y malla de terreno.', perf: 70, specs: '7200 RPM, SATA 6Gb/s, 256MB Cache' },
    { id: 'gpu1', name: 'ASUS ROG Strix RTX 4090 White OC', price: 56345, image: 'assets/ASUS ROG Strix GeForce RTX™ 4090 White OC Edition Tarjeta gráfica para juegos.png', category: 'GPU Principal', desc: 'Unidad de renderizado principal para escenarios complejos, múltiples pantallas y gráficos ultra detallados en simulación profesional.', perf: 100, specs: '24GB GDDR6X, PCIe 4.0', graphs: ['assets/VRAM por GPU.png', 'assets/FPS en Prepar3D v6.png'] },
    { id: 'gpu2', name: 'ASUS TUF RTX 5070 Ti White OC', price: 20000, image: 'assets/ASUS TUF Gaming GeForce RTX ™ 5070 Ti 16GB GDDR7 White OC Edition Tarjeta gráfica para Juegos.png', category: 'GPU Secundaria', desc: 'GPU secundaria dedicada a distribución de carga gráfica y soporte visual adicional.', perf: 85, specs: '16GB GDDR7, PCIe 5.0', graphs: ['assets/Ancho de banda de memoria GPU.png'] },
    { id: 'psu', name: 'Corsair HX1500i', price: 9000, image: 'assets/Corsair HX1500i (2025) Fuente de alimentación.png', category: 'Energía', desc: 'Fuente de poder de grado Titanio capaz de sostener las demandas transitorias de dos GPUs de alta gama.', perf: 100, specs: '1500W, 80+ Platinum, DSP', power: '1147W' },
    { id: 'nic', name: 'Intel X550-T2', price: 4500, image: 'assets/For Intel X550-T2, 10GbE Converged Network Adapter.png', category: 'Red', desc: 'Tarjeta de red de 10GbE para telemetría de ultra baja latencia (DIS/CIGI).', perf: 90, specs: 'Dual Port 10GBASE-T' },
    { id: 'os', name: 'Windows 11 Pro OEM', price: 395, image: 'assets/Windows 11 Pro(OEM).png', category: 'Sistema Operativo', desc: 'Sistema operativo principal.', perf: 100, specs: '64-bit' },
    { id: 'gabinete', name: 'Workstation principal', price: 6500, image: 'assets/Asus ROG Strix Helios ATX Full Tower Case.png', category: 'Gabinete', desc: 'Chasis E-ATX premium que alberga todos los componentes internos con flujo de aire optimizado.', perf: 100, specs: 'ATX Full Tower, Cristal Templado' }
];

const peripherals = [
    { id: 'yoke', name: 'Honeycomb Alpha Flight Controls', price: 6690, image: 'assets/Honeycomb Alpha Flight Controls Pro.png', category: 'Control', desc: 'Replica controles reales de aeronaves para una experiencia precisa.', perf: 85, specs: 'Sistema Profesional de Control', graph: 'assets/grafica-honeycomb-alpha.png' },
    { id: 'throttle', name: 'Honeycomb Bravo Throttle Quadrant', price: 6982, image: 'assets/Honeycomb Bravo Throttle Quadrant.png', category: 'Control', desc: 'Permite control preciso de potencia, flaps y sistemas de vuelo.', perf: 85, specs: 'Control Avanzado de Potencia', graph: 'assets/grafica-honeycomb-bravo.png' },
    { id: 'rudder', name: 'Thrustmaster TPR Pendular Rudder', price: 12500, image: 'assets/Thrustmaster TPR Pendular Rudder.png', category: 'Control', desc: 'Ofrece control realista del timón y estabilidad avanzada.', perf: 75, specs: 'Pedales Pendulares Profesionales', graph: 'assets/grafica-tpr-rudder.png' },
    { id: 'radio', name: 'Logitech/Saitek Pro Flight Radio Panel', price: 3500, image: 'assets/Logitech_Saitek Pro Flight Radio Panel.png', category: 'Control', desc: 'Panel de radio para comunicación y navegación directa sin usar el mouse.', perf: 85, specs: 'COM1/COM2/NAV1/NAV2/DME/ADF' },
    { id: 'autopilot', name: 'Logitech Pro Flight Autopilot Panel', price: 3500, image: 'assets/Logitech Pro Flight Autopilot Panel.png', category: 'Control', desc: 'Panel de piloto automático LED para ajuste de rumbo, altitud y velocidad vertical.', perf: 85, specs: 'Autothrottle, Flaps control' },
    { id: 'headset', name: 'Bose A30 Aviation Headset', price: 27309, image: 'assets/Bose A30 Aviation Headset.png', category: 'Audio', desc: 'Mejora inmersión y claridad de comunicación.', perf: 75, specs: 'Cancelación de Ruido Avanzada', graph: 'assets/grafica-bose-a30.png' },
    { id: 'monitors_center', name: 'LG Ultragear Curvo 34”', price: 6999, image: "assets/LG Monitor Gaming Curvo Ultragear 34'.png", category: 'Visual', desc: 'Amplía el campo visual para mejorar inmersión y percepción espacial.', perf: 75, specs: 'Ultrawide, Alta Frecuencia', graph: 'assets/grafica-monitor-lg.png' },
    { id: 'monitors_side', name: 'Samsung Curvo 32”', price: 4500, image: 'assets/Samsung 32 pulgadas S3.png', category: 'Visual', desc: 'Optimiza visualización de instrumentos y sistemas secundarios.', perf: 60, specs: 'Pantalla Curva UHD', graph: 'assets/grafica-monitor-samsung.png' },
    { id: 'mouse', name: 'Logitech MX Master 3S', price: 1553, image: 'assets/Logitech MX Master 3S Mouse Inalámbrico de Desempeño.png', category: 'Accesorio', desc: 'Diseñado para precisión y comodidad durante largas sesiones.', perf: 60, specs: 'Mouse Ergonómico Premium', graph: 'assets/grafica-mxmaster3s.png' },
    { id: 'keyboard', name: 'Logitech G Pro X TKL', price: 2349, image: 'assets/Logitech G Pro X TKL Rapid, Teclado para Gaming.png', category: 'Accesorio', desc: 'Facilita accesos rápidos y comandos eficientes.', perf: 60, specs: 'Teclado Mecánico TKL', graph: 'assets/grafica-logitech-keyboard.png' },
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
    
    const powerGroup = document.getElementById('modal-power-group');
    if (item.power) {
        document.getElementById('modal-power').innerText = item.power;
        powerGroup.style.display = 'block';
    } else {
        powerGroup.style.display = 'none';
    }
    
    const graphsContainer = document.getElementById('modal-graphs-container');
    graphsContainer.innerHTML = '';
    const graphsToRender = item.graphs || (item.graph ? [item.graph] : []);
    
    if (graphsToRender.length > 0) {
        graphsToRender.forEach(graphSrc => {
            const img = document.createElement('img');
            img.src = graphSrc;
            img.alt = 'Gráfica de rendimiento';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '8px';
            img.style.filter = 'drop-shadow(0 0 20px rgba(0,240,255,0.5))';
            img.style.border = '1px solid rgba(0,240,255,0.2)';
            img.style.padding = '10px';
            img.style.background = 'rgba(0,0,0,0.3)';
            graphsContainer.appendChild(img);
        });
        graphsContainer.style.display = 'flex';
    } else {
        graphsContainer.style.display = 'none';
    }
    
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



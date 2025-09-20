// ===== CONFIGURACIÓN INICIAL =====
let currentTheme = 'classic';
let flowerCount = 50;
let animationInterval;

// Configuración por defecto
const defaultConfig = {
    recipientName: 'Querida Persona Especial',
    senderName: 'Tu Persona Especial',
    mainMessage: '¡Feliz Día de las Flores Amarillas! 🌻',
    secondMessage: 'Que este día especial traiga a tu vida la misma alegría y calidez que estas hermosas flores amarillas representan.',
    colorTheme: 'classic',
    flowerCount: 50
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    loadDefaultValues();
    createBackgroundFlowers();
    createFloatingPetals();
    startSparkleEffect();
    
    // Auto-guardar cambios
    setInterval(saveToLocalStorage, 5000);
    
    // Cargar configuración guardada si existe
    loadFromLocalStorage();
});

// ===== FUNCIONES DE PERSONALIZACIÓN =====
function updateContent() {
    const recipientName = document.getElementById('recipientName').value || defaultConfig.recipientName;
    const senderName = document.getElementById('senderName').value || defaultConfig.senderName;
    const mainMessage = document.getElementById('mainMessage').value || defaultConfig.mainMessage;
    const secondMessage = document.getElementById('secondMessage').value || defaultConfig.secondMessage;
    
    // Actualizar contenido en tiempo real
    document.getElementById('displayRecipientName').textContent = recipientName;
    document.getElementById('displaySenderName').textContent = senderName;
    document.getElementById('displayMainMessage').textContent = mainMessage;
    document.getElementById('displaySecondMessage').textContent = secondMessage;
    
    // Añadir efecto de actualización
    addUpdateEffect();
}

function addUpdateEffect() {
    const elements = [
        document.getElementById('displayRecipientName'),
        document.getElementById('displaySenderName'),
        document.getElementById('displayMainMessage'),
        document.getElementById('displaySecondMessage')
    ];
    
    elements.forEach(element => {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    });
}

function changeTheme() {
    const newTheme = document.getElementById('colorTheme').value;
    currentTheme = newTheme;
    
    // Aplicar el nuevo tema
    document.body.setAttribute('data-theme', newTheme);
    
    // Recrear flores con nuevo tema
    setTimeout(() => {
        createBackgroundFlowers();
        createFloatingPetals();
    }, 300);
    
    showNotification(`Tema cambiado a: ${getThemeName(newTheme)}`);
}

function getThemeName(theme) {
    const themes = {
        'classic': 'Amarillo Clásico',
        'sunset': 'Atardecer',
        'golden': 'Dorado Real',
        'spring': 'Primavera'
    };
    return themes[theme] || 'Amarillo Clásico';
}

function updateFlowers() {
    const newFlowerCount = parseInt(document.getElementById('flowerCount').value);
    flowerCount = newFlowerCount;
    document.getElementById('flowerCountValue').textContent = newFlowerCount;
    
    // Recrear flores con nueva cantidad
    createBackgroundFlowers();
    createFloatingPetals();
    
    showNotification(`Cantidad de flores: ${newFlowerCount}`);
}

// ===== GESTIÓN DEL EDITOR =====
function toggleEditor() {
    const panel = document.getElementById('editorPanel');
    const btn = document.getElementById('showEditorBtn');
    
    if (panel.classList.contains('active')) {
        panel.classList.remove('active');
        btn.classList.remove('hidden');
    } else {
        panel.classList.add('active');
        btn.classList.add('hidden');
    }
}

// ===== CREACIÓN DE FLORES DE FONDO =====
function createBackgroundFlowers() {
    const flowersContainer = document.getElementById('flowersBackground');
    flowersContainer.innerHTML = '';
    
    const flowerEmojis = ['🌻', '🌼', '🌸', '🌺', '🏵️', '🌷'];
    
    for (let i = 0; i < Math.min(flowerCount, 80); i++) {
        const flower = document.createElement('div');
        flower.className = 'background-flower';
        flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        
        // Posición aleatoria
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        
        // Animación aleatoria
        flower.style.animationDelay = Math.random() * 6 + 's';
        flower.style.animationDuration = (4 + Math.random() * 4) + 's';
        
        // Tamaño y opacidad aleatoria
        const scale = 0.5 + Math.random() * 1;
        flower.style.transform = `scale(${scale})`;
        flower.style.opacity = 0.2 + Math.random() * 0.3;
        
        flowersContainer.appendChild(flower);
    }
}

// ===== PÉTALOS FLOTANTES =====
function createFloatingPetals() {
    const petalsContainer = document.getElementById('floatingPetals');
    petalsContainer.innerHTML = '';
    
    const petalEmojis = ['🌼', '🌸', '🍃', '✨'];
    const petalCount = Math.floor(flowerCount / 3);
    
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            createSinglePetal(petalsContainer, petalEmojis);
        }, i * 200);
    }
    
    // Crear pétalos continuamente
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    animationInterval = setInterval(() => {
        if (petalsContainer.children.length < petalCount) {
            createSinglePetal(petalsContainer, petalEmojis);
        }
    }, 2000);
}

function createSinglePetal(container, emojis) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posición inicial aleatoria
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-50px';
    
    // Duración y delay aleatorio
    const duration = 8 + Math.random() * 4;
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(petal);
    
    // Remover después de la animación
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, (duration + 2) * 1000);
}

// ===== EFECTO DE BRILLOS =====
function startSparkleEffect() {
    setInterval(createSparkle, 1000);
}

function createSparkle() {
    const container = document.querySelector('.container');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Posición aleatoria dentro del contenedor
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(sparkle);
    
    // Remover después de la animación
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
}

// ===== NOTIFICACIONES =====
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--primary-yellow);
        color: var(--text-primary);
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 4px 20px var(--shadow-color);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== EXPORTAR CSS PERSONALIZADO =====
function exportCSS() {
    const config = getCurrentConfig();
    
    // Crear nombre de archivo con guiones
    const recipientName = config.recipientName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
    const fileName = recipientName ? `flores-${recipientName}` : 'flores-amarillas';
    const cssFileName = `${fileName}-styles.css`;
    
    const customCSS = generateCustomCSS(config);
    const customHTML = generateCustomHTML(config, cssFileName);
    
    // Crear archivo ZIP con los archivos personalizados
    createDownloadableFiles(customCSS, customHTML, config, fileName, cssFileName);
}

function getCurrentConfig() {
    return {
        recipientName: document.getElementById('recipientName').value || defaultConfig.recipientName,
        senderName: document.getElementById('senderName').value || defaultConfig.senderName,
        mainMessage: document.getElementById('mainMessage').value || defaultConfig.mainMessage,
        secondMessage: document.getElementById('secondMessage').value || defaultConfig.secondMessage,
        colorTheme: document.getElementById('colorTheme').value || defaultConfig.colorTheme,
        flowerCount: parseInt(document.getElementById('flowerCount').value) || defaultConfig.flowerCount
    };
}

function generateCustomCSS(config) {
    // En lugar de generar CSS personalizado, simplemente leer y usar el CSS completo
    // con las variables de tema aplicadas
    const themeVariables = getThemeVariables(config.colorTheme);
    
    let customCSS = `/* Plantilla Personalizada - Flores Amarillas */\n`;
    customCSS += `/* Generado el: ${new Date().toLocaleDateString()} */\n`;
    customCSS += `/* Para: ${config.recipientName} | De: ${config.senderName} */\n\n`;
    
    // Añadir variables del tema seleccionado
    customCSS += `:root {\n`;
    for (const [key, value] of Object.entries(themeVariables)) {
        customCSS += `    ${key}: ${value};\n`;
    }
    customCSS += `    --text-primary: #333;\n`;
    customCSS += `    --text-secondary: #666;\n`;
    customCSS += `    --shadow-color: rgba(255, 193, 7, 0.3);\n`;
    customCSS += `    --border-color: rgba(255, 193, 7, 0.5);\n`;
    customCSS += `}\n\n`;
    
    // Incluir todo el CSS necesario copiando desde styles.css
    customCSS += `/* ===== RESET Y BASE ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    background: linear-gradient(135deg, var(--background-gradient-start), var(--background-gradient-end));
    min-height: 100vh;
    position: relative;
}

/* ===== CONTENEDOR PRINCIPAL ===== */
.container {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    z-index: 1;
}

.flowers-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.background-flower {
    position: absolute;
    font-size: 2rem;
    animation: float 6s ease-in-out infinite;
    z-index: 0;
}

/* ===== CONTENIDO PRINCIPAL ===== */
.main-content {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 25px;
    padding: 3rem;
    text-align: center;
    box-shadow: 0 20px 60px var(--shadow-color);
    border: 1px solid var(--border-color);
    max-width: 800px;
    width: 100%;
    position: relative;
    z-index: 2;
    margin: 2rem 0;
}

/* ===== SALUDOS ===== */
.greeting {
    margin-bottom: 2rem;
}

.recipient-name {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--primary-yellow);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px var(--shadow-color);
    animation: bounce 2s ease-in-out infinite;
}

.date-badge {
    display: inline-block;
    background: var(--primary-yellow);
    color: var(--text-primary);
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 4px 15px var(--shadow-color);
    animation: pulse 3s ease-in-out infinite;
}

.message-container {
    margin: 3rem 0;
}

.main-message {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2rem;
    line-height: 1.2;
}

.secondary-message {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* ===== GIRASOL CSS PRINCIPAL ===== */
.sunflower-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0;
    position: relative;
    min-height: 300px;
}

.sunflower {
    position: relative;
    width: 280px;
    height: 280px;
    animation: gentleSwing 6s ease-in-out infinite, sunflowerAppear 2s ease-out forwards;
    transform-origin: bottom center;
    z-index: 10;
    filter: drop-shadow(0 10px 25px var(--shadow-color));
}

/* Capa de pétalos */
.petals-layer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    opacity: 1;
}

/* Pétalos externos */
.outer-petals {
    width: 100%;
    height: 100%;
    animation: petalLayerSpin 30s linear infinite;
}

/* Pétalos internos */
.inner-petals {
    width: 75%;
    height: 75%;
    animation: petalLayerSpin 25s linear infinite reverse;
}

/* Estilo base de pétalos */
.petal {
    position: absolute;
    width: 50px;
    height: 100px;
    background: linear-gradient(145deg, 
        var(--primary-yellow) 0%, 
        var(--secondary-yellow) 25%, 
        var(--accent-yellow) 50%, 
        var(--primary-yellow) 75%, 
        var(--secondary-yellow) 100%);
    border-radius: 50% 50% 50% 50% / 90% 90% 10% 10%;
    top: 50%;
    left: 50%;
    transform-origin: 50% 100%;
    box-shadow: 
        inset 2px 2px 8px rgba(255, 255, 255, 0.6),
        inset -2px -2px 8px rgba(255, 140, 0, 0.4),
        0 4px 15px var(--shadow-color);
    animation: petalGlow 4s ease-in-out infinite alternate;
}

/* Posicionamiento de pétalos externos */
.outer-petals .petal-1 { transform: translate(-50%, -100%) rotate(0deg); }
.outer-petals .petal-2 { transform: translate(-50%, -100%) rotate(18deg); }
.outer-petals .petal-3 { transform: translate(-50%, -100%) rotate(36deg); }
.outer-petals .petal-4 { transform: translate(-50%, -100%) rotate(54deg); }
.outer-petals .petal-5 { transform: translate(-50%, -100%) rotate(72deg); }
.outer-petals .petal-6 { transform: translate(-50%, -100%) rotate(90deg); }
.outer-petals .petal-7 { transform: translate(-50%, -100%) rotate(108deg); }
.outer-petals .petal-8 { transform: translate(-50%, -100%) rotate(126deg); }
.outer-petals .petal-9 { transform: translate(-50%, -100%) rotate(144deg); }
.outer-petals .petal-10 { transform: translate(-50%, -100%) rotate(162deg); }
.outer-petals .petal-11 { transform: translate(-50%, -100%) rotate(180deg); }
.outer-petals .petal-12 { transform: translate(-50%, -100%) rotate(198deg); }
.outer-petals .petal-13 { transform: translate(-50%, -100%) rotate(216deg); }
.outer-petals .petal-14 { transform: translate(-50%, -100%) rotate(234deg); }
.outer-petals .petal-15 { transform: translate(-50%, -100%) rotate(252deg); }
.outer-petals .petal-16 { transform: translate(-50%, -100%) rotate(270deg); }
.outer-petals .petal-17 { transform: translate(-50%, -100%) rotate(288deg); }
.outer-petals .petal-18 { transform: translate(-50%, -100%) rotate(306deg); }
.outer-petals .petal-19 { transform: translate(-50%, -100%) rotate(324deg); }
.outer-petals .petal-20 { transform: translate(-50%, -100%) rotate(342deg); }

/* Posicionamiento de pétalos internos */
.inner-petals .petal {
    width: 38px;
    height: 76px;
    background: linear-gradient(145deg, 
        var(--secondary-yellow) 0%, 
        var(--primary-yellow) 30%, 
        var(--accent-yellow) 70%, 
        var(--secondary-yellow) 100%);
}

.inner-petals .petal-1 { transform: translate(-50%, -100%) rotate(11.25deg); }
.inner-petals .petal-2 { transform: translate(-50%, -100%) rotate(33.75deg); }
.inner-petals .petal-3 { transform: translate(-50%, -100%) rotate(56.25deg); }
.inner-petals .petal-4 { transform: translate(-50%, -100%) rotate(78.75deg); }
.inner-petals .petal-5 { transform: translate(-50%, -100%) rotate(101.25deg); }
.inner-petals .petal-6 { transform: translate(-50%, -100%) rotate(123.75deg); }
.inner-petals .petal-7 { transform: translate(-50%, -100%) rotate(146.25deg); }
.inner-petals .petal-8 { transform: translate(-50%, -100%) rotate(168.75deg); }
.inner-petals .petal-9 { transform: translate(-50%, -100%) rotate(191.25deg); }
.inner-petals .petal-10 { transform: translate(-50%, -100%) rotate(213.75deg); }
.inner-petals .petal-11 { transform: translate(-50%, -100%) rotate(236.25deg); }
.inner-petals .petal-12 { transform: translate(-50%, -100%) rotate(258.75deg); }
.inner-petals .petal-13 { transform: translate(-50%, -100%) rotate(281.25deg); }
.inner-petals .petal-14 { transform: translate(-50%, -100%) rotate(303.75deg); }
.inner-petals .petal-15 { transform: translate(-50%, -100%) rotate(326.25deg); }
.inner-petals .petal-16 { transform: translate(-50%, -100%) rotate(348.75deg); }

/* Centro de la flor */
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110px;
    height: 110px;
    background: radial-gradient(circle, 
        #8B4513 0%, 
        #A0522D 30%, 
        #654321 60%, 
        #2F1B14 100%);
    border-radius: 50%;
    box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 25px rgba(139, 69, 19, 0.6);
    z-index: 15;
    animation: centerRotateAndPulse 35s linear infinite;
}

/* Patrón de semillas */
.seeds-pattern {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.seed-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: seedRotate 8s linear infinite;
}

.ring-1 {
    width: 30%;
    height: 30%;
    animation-duration: 6s;
}

.ring-2 {
    width: 60%;
    height: 60%;
    animation-duration: 8s;
    animation-direction: reverse;
}

.ring-3 {
    width: 90%;
    height: 90%;
    animation-duration: 10s;
}

.seed {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #2F1B14, #000000);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: seedPulse 2s ease-in-out infinite;
}

/* Posicionamiento de semillas ring-1 */
.ring-1 .seed:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateY(-15px); animation-delay: 0s; }
.ring-1 .seed:nth-child(2) { transform: translate(-50%, -50%) rotate(45deg) translateY(-15px); animation-delay: 0.25s; }
.ring-1 .seed:nth-child(3) { transform: translate(-50%, -50%) rotate(90deg) translateY(-15px); animation-delay: 0.5s; }
.ring-1 .seed:nth-child(4) { transform: translate(-50%, -50%) rotate(135deg) translateY(-15px); animation-delay: 0.75s; }
.ring-1 .seed:nth-child(5) { transform: translate(-50%, -50%) rotate(180deg) translateY(-15px); animation-delay: 1s; }
.ring-1 .seed:nth-child(6) { transform: translate(-50%, -50%) rotate(225deg) translateY(-15px); animation-delay: 1.25s; }
.ring-1 .seed:nth-child(7) { transform: translate(-50%, -50%) rotate(270deg) translateY(-15px); animation-delay: 1.5s; }
.ring-1 .seed:nth-child(8) { transform: translate(-50%, -50%) rotate(315deg) translateY(-15px); animation-delay: 1.75s; }

/* Posicionamiento de semillas ring-2 */
.ring-2 .seed:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateY(-30px); animation-delay: 0s; }
.ring-2 .seed:nth-child(2) { transform: translate(-50%, -50%) rotate(30deg) translateY(-30px); animation-delay: 0.17s; }
.ring-2 .seed:nth-child(3) { transform: translate(-50%, -50%) rotate(60deg) translateY(-30px); animation-delay: 0.33s; }
.ring-2 .seed:nth-child(4) { transform: translate(-50%, -50%) rotate(90deg) translateY(-30px); animation-delay: 0.5s; }
.ring-2 .seed:nth-child(5) { transform: translate(-50%, -50%) rotate(120deg) translateY(-30px); animation-delay: 0.67s; }
.ring-2 .seed:nth-child(6) { transform: translate(-50%, -50%) rotate(150deg) translateY(-30px); animation-delay: 0.83s; }
.ring-2 .seed:nth-child(7) { transform: translate(-50%, -50%) rotate(180deg) translateY(-30px); animation-delay: 1s; }
.ring-2 .seed:nth-child(8) { transform: translate(-50%, -50%) rotate(210deg) translateY(-30px); animation-delay: 1.17s; }
.ring-2 .seed:nth-child(9) { transform: translate(-50%, -50%) rotate(240deg) translateY(-30px); animation-delay: 1.33s; }
.ring-2 .seed:nth-child(10) { transform: translate(-50%, -50%) rotate(270deg) translateY(-30px); animation-delay: 1.5s; }
.ring-2 .seed:nth-child(11) { transform: translate(-50%, -50%) rotate(300deg) translateY(-30px); animation-delay: 1.67s; }
.ring-2 .seed:nth-child(12) { transform: translate(-50%, -50%) rotate(330deg) translateY(-30px); animation-delay: 1.83s; }

/* Posicionamiento de semillas ring-3 */
.ring-3 .seed:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateY(-45px); animation-delay: 0s; }
.ring-3 .seed:nth-child(2) { transform: translate(-50%, -50%) rotate(22.5deg) translateY(-45px); animation-delay: 0.125s; }
.ring-3 .seed:nth-child(3) { transform: translate(-50%, -50%) rotate(45deg) translateY(-45px); animation-delay: 0.25s; }
.ring-3 .seed:nth-child(4) { transform: translate(-50%, -50%) rotate(67.5deg) translateY(-45px); animation-delay: 0.375s; }
.ring-3 .seed:nth-child(5) { transform: translate(-50%, -50%) rotate(90deg) translateY(-45px); animation-delay: 0.5s; }
.ring-3 .seed:nth-child(6) { transform: translate(-50%, -50%) rotate(112.5deg) translateY(-45px); animation-delay: 0.625s; }
.ring-3 .seed:nth-child(7) { transform: translate(-50%, -50%) rotate(135deg) translateY(-45px); animation-delay: 0.75s; }
.ring-3 .seed:nth-child(8) { transform: translate(-50%, -50%) rotate(157.5deg) translateY(-45px); animation-delay: 0.875s; }
.ring-3 .seed:nth-child(9) { transform: translate(-50%, -50%) rotate(180deg) translateY(-45px); animation-delay: 1s; }
.ring-3 .seed:nth-child(10) { transform: translate(-50%, -50%) rotate(202.5deg) translateY(-45px); animation-delay: 1.125s; }
.ring-3 .seed:nth-child(11) { transform: translate(-50%, -50%) rotate(225deg) translateY(-45px); animation-delay: 1.25s; }
.ring-3 .seed:nth-child(12) { transform: translate(-50%, -50%) rotate(247.5deg) translateY(-45px); animation-delay: 1.375s; }
.ring-3 .seed:nth-child(13) { transform: translate(-50%, -50%) rotate(270deg) translateY(-45px); animation-delay: 1.5s; }
.ring-3 .seed:nth-child(14) { transform: translate(-50%, -50%) rotate(292.5deg) translateY(-45px); animation-delay: 1.625s; }
.ring-3 .seed:nth-child(15) { transform: translate(-50%, -50%) rotate(315deg) translateY(-45px); animation-delay: 1.75s; }
.ring-3 .seed:nth-child(16) { transform: translate(-50%, -50%) rotate(337.5deg) translateY(-45px); animation-delay: 1.875s; }

/* ===== FLORES PEQUEÑAS DECORATIVAS ===== */
.small-sunflower {
    position: absolute;
    width: 70px;
    height: 70px;
    animation: smallFlowerFloat 8s ease-in-out infinite;
}

.small-flower-1 {
    top: 10%;
    left: 10%;
    animation-delay: -1s;
}

.small-flower-2 {
    top: 15%;
    right: 15%;
    animation-delay: -3s;
}

.small-flower-3 {
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: -2s;
}

.small-petals-layer {
    position: relative;
    width: 100%;
    height: 100%;
    animation: smallPetalSpin 12s linear infinite;
}

.small-petal {
    position: absolute;
    width: 20px;
    height: 32px;
    background: linear-gradient(145deg, var(--accent-yellow), var(--primary-yellow));
    border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
    transform-origin: 50% 90%;
    top: 50%;
    left: 50%;
    margin: -16px 0 0 -10px;
    box-shadow: 0 2px 6px var(--shadow-color);
    transform: rotate(var(--rotation)) translateY(-14px);
}

.small-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28px;
    height: 28px;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, #8B4513, #A0522D);
    border-radius: 50%;
    border: 2px solid #654321;
    z-index: 5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.signature {
    margin-top: 3rem;
}

.signature p {
    font-style: italic;
    color: var(--text-secondary);
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.sender-name {
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-yellow);
    text-shadow: 1px 1px 3px var(--shadow-color);
}

/* ===== PÉTALOS FLOTANTES ===== */
.floating-petals {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}

.floating-petals .petal {
    position: absolute;
    font-size: 1.5rem;
    animation: fall 12s linear infinite;
    opacity: 0.7;
}

/* ===== ANIMACIONES DEL GIRASOL ===== */
@keyframes sunflowerAppear {
    0% {
        opacity: 0;
        transform: scale(0.3) rotate(-10deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

@keyframes gentleSwing {
    0%, 100% { 
        transform: rotate(0deg); 
    }
    25% { 
        transform: rotate(2deg); 
    }
    75% { 
        transform: rotate(-2deg); 
    }
}

@keyframes petalLayerSpin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes petalGlow {
    0% {
        box-shadow: 
            inset 2px 2px 8px rgba(255, 255, 255, 0.6),
            inset -2px -2px 8px rgba(255, 140, 0, 0.4),
            0 4px 15px var(--shadow-color);
    }
    100% {
        box-shadow: 
            inset 3px 3px 12px rgba(255, 255, 255, 0.8),
            inset -3px -3px 12px rgba(255, 140, 0, 0.6),
            0 6px 25px var(--shadow-color);
    }
}

@keyframes centerRotateAndPulse {
    0% {
        transform: translate(-50%, -50%) rotate(0deg) scale(1);
        box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(139, 69, 19, 0.6);
    }
    11.43% {
        transform: translate(-50%, -50%) rotate(41.15deg) scale(1.05);
        box-shadow: 
            inset 0 0 25px rgba(0, 0, 0, 0.6),
            0 0 35px rgba(139, 69, 19, 0.8);
    }
    22.86% {
        transform: translate(-50%, -50%) rotate(82.3deg) scale(1);
        box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(139, 69, 19, 0.6);
    }
    34.29% {
        transform: translate(-50%, -50%) rotate(123.45deg) scale(1.05);
        box-shadow: 
            inset 0 0 25px rgba(0, 0, 0, 0.6),
            0 0 35px rgba(139, 69, 19, 0.8);
    }
    45.71% {
        transform: translate(-50%, -50%) rotate(164.6deg) scale(1);
        box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(139, 69, 19, 0.6);
    }
    57.14% {
        transform: translate(-50%, -50%) rotate(205.75deg) scale(1.05);
        box-shadow: 
            inset 0 0 25px rgba(0, 0, 0, 0.6),
            0 0 35px rgba(139, 69, 19, 0.8);
    }
    68.57% {
        transform: translate(-50%, -50%) rotate(246.9deg) scale(1);
        box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(139, 69, 19, 0.6);
    }
    80% {
        transform: translate(-50%, -50%) rotate(288deg) scale(1.05);
        box-shadow: 
            inset 0 0 25px rgba(0, 0, 0, 0.6),
            0 0 35px rgba(139, 69, 19, 0.8);
    }
    91.43% {
        transform: translate(-50%, -50%) rotate(329.15deg) scale(1);
        box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(139, 69, 19, 0.6);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg) scale(1);
        box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(139, 69, 19, 0.6);
    }
}

@keyframes seedRotate {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes seedPulse {
    0%, 100% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
}

@keyframes smallFlowerFloat {
    0%, 100% {
        transform: translateX(-50%) translateY(0px);
    }
    50% {
        transform: translateX(-50%) translateY(-10px);
    }
}

@keyframes smallPetalSpin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 4px 15px var(--shadow-color);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 6px 25px var(--shadow-color);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

@keyframes fall {
    0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
    .sunflower {
        width: 240px;
        height: 240px;
    }
    
    .petal {
        width: 42px;
        height: 84px;
    }
    
    .inner-petals .petal {
        width: 32px;
        height: 64px;
    }
    
    .center {
        width: 90px;
        height: 90px;
    }
    
    .small-sunflower {
        width: 60px;
        height: 60px;
    }
    
    .small-petal {
        width: 17px;
        height: 27px;
        margin: -13px 0 0 -8px;
    }
    
    .small-center {
        width: 24px;
        height: 24px;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .main-content {
        padding: 2rem;
        margin: 1rem 0;
    }
    
    .sunflower-container {
        min-height: 200px;
        margin: 2rem 0;
    }
    
    .sunflower {
        width: 200px;
        height: 200px;
    }
    
    .petal {
        width: 35px;
        height: 70px;
    }
    
    .inner-petals .petal {
        width: 26px;
        height: 52px;
    }
    
    .center {
        width: 75px;
        height: 75px;
    }
    
    .seed {
        width: 5px;
        height: 5px;
    }
    
    .small-sunflower {
        width: 50px;
        height: 50px;
    }
    
    .small-petal {
        width: 14px;
        height: 22px;
        margin: -11px 0 0 -7px;
    }
    
    .small-center {
        width: 20px;
        height: 20px;
    }
}

@media (max-width: 480px) {
    .main-content {
        padding: 1.5rem;
        border-radius: 15px;
    }
    
    .greeting {
        margin-bottom: 1.5rem;
    }
    
    .message-container {
        margin: 2rem 0;
    }
    
    .sunflower-container {
        margin: 1.5rem 0;
        min-height: 150px;
    }
    
    .sunflower {
        width: 160px;
        height: 160px;
    }
    
    .petal {
        width: 28px;
        height: 56px;
    }
    
    .inner-petals .petal {
        width: 21px;
        height: 42px;
    }
    
    .center {
        width: 60px;
        height: 60px;
    }
    
    .seed {
        width: 4px;
        height: 4px;
    }
    
    .small-sunflower {
        width: 40px;
        height: 40px;
    }
    
    .small-petal {
        width: 11px;
        height: 18px;
        margin: -9px 0 0 -5px;
    }
    
    .small-center {
        width: 16px;
        height: 16px;
    }
    
    .signature {
        margin-top: 2rem;
    }
}

/* ===== EFECTOS ESPECIALES ===== */
.sparkle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--primary-yellow);
    border-radius: 50%;
    animation: sparkle 2s ease-in-out infinite;
    box-shadow: 0 0 10px var(--primary-yellow);
}

@keyframes sparkle {
    0%, 100% {
        opacity: 0;
        transform: scale(0);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
}`;
    
    return customCSS;
}

function generateCustomHTML(config, cssFileName) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Para ${config.recipientName} - Flores Amarillas</title>
    <link rel="stylesheet" href="${cssFileName}">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body data-theme="${config.colorTheme}">
    <div class="container">
        <div class="flowers-background" id="flowersBackground"></div>
        
        <div class="main-content">
            <div class="greeting">
                <h1 class="recipient-name">${config.recipientName}</h1>
                <div class="date-badge">21 de Septiembre</div>
            </div>
            
            <div class="message-container">
                <h2 class="main-message">${config.mainMessage}</h2>
                <p class="secondary-message">${config.secondMessage}</p>
                
                <div class="sunflower-container">
                    <div class="sunflower">
                        <!-- Pétalos externos -->
                        <div class="petals-layer outer-petals">
                            <div class="petal petal-1"></div>
                            <div class="petal petal-2"></div>
                            <div class="petal petal-3"></div>
                            <div class="petal petal-4"></div>
                            <div class="petal petal-5"></div>
                            <div class="petal petal-6"></div>
                            <div class="petal petal-7"></div>
                            <div class="petal petal-8"></div>
                            <div class="petal petal-9"></div>
                            <div class="petal petal-10"></div>
                            <div class="petal petal-11"></div>
                            <div class="petal petal-12"></div>
                            <div class="petal petal-13"></div>
                            <div class="petal petal-14"></div>
                            <div class="petal petal-15"></div>
                            <div class="petal petal-16"></div>
                            <div class="petal petal-17"></div>
                            <div class="petal petal-18"></div>
                            <div class="petal petal-19"></div>
                            <div class="petal petal-20"></div>
                        </div>
                        
                        <!-- Pétalos internos -->
                        <div class="petals-layer inner-petals">
                            <div class="petal petal-1"></div>
                            <div class="petal petal-2"></div>
                            <div class="petal petal-3"></div>
                            <div class="petal petal-4"></div>
                            <div class="petal petal-5"></div>
                            <div class="petal petal-6"></div>
                            <div class="petal petal-7"></div>
                            <div class="petal petal-8"></div>
                            <div class="petal petal-9"></div>
                            <div class="petal petal-10"></div>
                            <div class="petal petal-11"></div>
                            <div class="petal petal-12"></div>
                            <div class="petal petal-13"></div>
                            <div class="petal petal-14"></div>
                            <div class="petal petal-15"></div>
                            <div class="petal petal-16"></div>
                        </div>
                        
                        <!-- Centro de la flor -->
                        <div class="center">
                            <div class="seeds-pattern">
                                <div class="seed-ring ring-1">
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                </div>
                                <div class="seed-ring ring-2">
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                </div>
                                <div class="seed-ring ring-3">
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                    <div class="seed"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Flores pequeñas decorativas -->
                    <div class="small-sunflower small-flower-1">
                        <div class="small-petals-layer">
                            <div class="small-petal" style="--rotation: 0deg;"></div>
                            <div class="small-petal" style="--rotation: 45deg;"></div>
                            <div class="small-petal" style="--rotation: 90deg;"></div>
                            <div class="small-petal" style="--rotation: 135deg;"></div>
                            <div class="small-petal" style="--rotation: 180deg;"></div>
                            <div class="small-petal" style="--rotation: 225deg;"></div>
                            <div class="small-petal" style="--rotation: 270deg;"></div>
                            <div class="small-petal" style="--rotation: 315deg;"></div>
                        </div>
                        <div class="small-center"></div>
                    </div>
                    
                    <div class="small-sunflower small-flower-2">
                        <div class="small-petals-layer">
                            <div class="small-petal" style="--rotation: 0deg;"></div>
                            <div class="small-petal" style="--rotation: 45deg;"></div>
                            <div class="small-petal" style="--rotation: 90deg;"></div>
                            <div class="small-petal" style="--rotation: 135deg;"></div>
                            <div class="small-petal" style="--rotation: 180deg;"></div>
                            <div class="small-petal" style="--rotation: 225deg;"></div>
                            <div class="small-petal" style="--rotation: 270deg;"></div>
                            <div class="small-petal" style="--rotation: 315deg;"></div>
                        </div>
                        <div class="small-center"></div>
                    </div>
                    
                    <div class="small-sunflower small-flower-3">
                        <div class="small-petals-layer">
                            <div class="small-petal" style="--rotation: 0deg;"></div>
                            <div class="small-petal" style="--rotation: 45deg;"></div>
                            <div class="small-petal" style="--rotation: 90deg;"></div>
                            <div class="small-petal" style="--rotation: 135deg;"></div>
                            <div class="small-petal" style="--rotation: 180deg;"></div>
                            <div class="small-petal" style="--rotation: 225deg;"></div>
                            <div class="small-petal" style="--rotation: 270deg;"></div>
                            <div class="small-petal" style="--rotation: 315deg;"></div>
                        </div>
                        <div class="small-center"></div>
                    </div>
                </div>
                
                <div class="signature">
                    <p>Con cariño,</p>
                    <h3 class="sender-name">${config.senderName}</h3>
                </div>
            </div>
        </div>
        
        <div class="floating-petals" id="floatingPetals"></div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            createBackgroundFlowers(${config.flowerCount});
            createFloatingPetals(${Math.floor(config.flowerCount / 3)});
            startSparkleEffect();
        });

        function createBackgroundFlowers(count) {
            const flowersContainer = document.getElementById('flowersBackground');
            const flowerEmojis = ['�', '�🌼', '🌸', '�', '🏵️', '🌷'];
            
            for (let i = 0; i < count; i++) {
                const flower = document.createElement('div');
                flower.className = 'background-flower';
                flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
                
                flower.style.left = Math.random() * 100 + '%';
                flower.style.top = Math.random() * 100 + '%';
                flower.style.animationDelay = Math.random() * 6 + 's';
                flower.style.animationDuration = (4 + Math.random() * 4) + 's';
                
                const scale = 0.5 + Math.random() * 1;
                flower.style.transform = 'scale(' + scale + ')';
                flower.style.opacity = 0.2 + Math.random() * 0.3;
                
                flowersContainer.appendChild(flower);
            }
        }

        function createFloatingPetals(count) {
            const petalsContainer = document.getElementById('floatingPetals');
            const petalEmojis = ['🌼', '🌸', '🍃', '✨'];
            
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const petal = document.createElement('div');
                    petal.className = 'petal';
                    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
                    
                    petal.style.left = Math.random() * 100 + '%';
                    petal.style.top = '-50px';
                    
                    const duration = 8 + Math.random() * 4;
                    petal.style.animationDuration = duration + 's';
                    
                    petalsContainer.appendChild(petal);
                    
                    setTimeout(() => {
                        if (petal.parentNode) {
                            petal.parentNode.removeChild(petal);
                        }
                    }, duration * 1000);
                }, i * 200);
            }
        }
        
        function startSparkleEffect() {
            setInterval(() => {
                const container = document.querySelector('.container');
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                
                container.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2000);
            }, 1000);
        }
    </script>
</body>
</html>`;
}

function getThemeVariables(theme) {
    const themes = {
        'classic': {
            '--primary-yellow': '#FFD700',
            '--secondary-yellow': '#FFF700',
            '--accent-yellow': '#FFEB3B',
            '--background-gradient-start': '#FFF9C4',
            '--background-gradient-end': '#FFECB3'
        },
        'sunset': {
            '--primary-yellow': '#FF8F00',
            '--secondary-yellow': '#FFA000',
            '--accent-yellow': '#FFB300',
            '--background-gradient-start': '#FFF3E0',
            '--background-gradient-end': '#FFE0B2'
        },
        'golden': {
            '--primary-yellow': '#B8860B',
            '--secondary-yellow': '#DAA520',
            '--accent-yellow': '#FFD700',
            '--background-gradient-start': '#FFFBF0',
            '--background-gradient-end': '#FFF8DC'
        },
        'spring': {
            '--primary-yellow': '#CDDC39',
            '--secondary-yellow': '#D4E157',
            '--accent-yellow': '#FFEB3B',
            '--background-gradient-start': '#F9FBE7',
            '--background-gradient-end': '#F0F4C3'
        }
    };
    return themes[theme] || themes['classic'];
}

function createDownloadableFiles(css, html, config, fileName, cssFileName) {
    // Crear un blob con el HTML
    const htmlBlob = new Blob([html], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    
    // Crear un enlace de descarga para HTML
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = `${fileName}.html`;
    document.body.appendChild(htmlLink);
    htmlLink.click();
    document.body.removeChild(htmlLink);
    
    // También crear el CSS personalizado
    setTimeout(() => {
        const cssBlob = new Blob([css], { type: 'text/css' });
        const cssUrl = URL.createObjectURL(cssBlob);
        
        const cssLink = document.createElement('a');
        cssLink.href = cssUrl;
        cssLink.download = cssFileName;
        document.body.appendChild(cssLink);
        cssLink.click();
        document.body.removeChild(cssLink);
        
        URL.revokeObjectURL(htmlUrl);
        URL.revokeObjectURL(cssUrl);
        
        showNotification('¡Archivos descargados exitosamente! 🎉');
    }, 1000);
}

// ===== RESETEAR A VALORES POR DEFECTO =====
function resetToDefault() {
    if (confirm('¿Estás seguro de que quieres resetear todo a los valores por defecto?')) {
        loadDefaultValues();
        updateContent();
        changeTheme();
        updateFlowers();
        showNotification('Configuración reseteada');
    }
}

function loadDefaultValues() {
    document.getElementById('recipientName').value = '';
    document.getElementById('senderName').value = '';
    document.getElementById('mainMessage').value = '';
    document.getElementById('secondMessage').value = '';
    document.getElementById('colorTheme').value = defaultConfig.colorTheme;
    document.getElementById('flowerCount').value = defaultConfig.flowerCount;
    document.getElementById('flowerCountValue').textContent = defaultConfig.flowerCount;
}

// ===== ALMACENAMIENTO LOCAL =====
function saveToLocalStorage() {
    const config = getCurrentConfig();
    localStorage.setItem('floresAmarillasConfig', JSON.stringify(config));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('floresAmarillasConfig');
    if (saved) {
        try {
            const config = JSON.parse(saved);
            
            document.getElementById('recipientName').value = config.recipientName || '';
            document.getElementById('senderName').value = config.senderName || '';
            document.getElementById('mainMessage').value = config.mainMessage || '';
            document.getElementById('secondMessage').value = config.secondMessage || '';
            document.getElementById('colorTheme').value = config.colorTheme || 'classic';
            document.getElementById('flowerCount').value = config.flowerCount || 50;
            
            updateContent();
            changeTheme();
            updateFlowers();
        } catch (e) {
            console.log('Error cargando configuración guardada:', e);
        }
    }
}

// ===== EVENTOS DE TECLADO =====
document.addEventListener('keydown', function(e) {
    // ESC para cerrar editor
    if (e.key === 'Escape') {
        const panel = document.getElementById('editorPanel');
        if (panel.classList.contains('active')) {
            toggleEditor();
        }
    }
    
    // Ctrl+S para descargar
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        exportCSS();
    }
});

// ===== RESPONSIVE TOUCH EVENTS =====
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - mostrar editor
            const panel = document.getElementById('editorPanel');
            if (!panel.classList.contains('active')) {
                toggleEditor();
            }
        }
    }
}

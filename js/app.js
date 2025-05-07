document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const volumeControl = document.getElementById('volume');
    const catFace = document.getElementById('cat-face');
    const audioVisualizer = document.getElementById('audio-visualizer');
    const soundButtons = document.querySelectorAll('.sound-btn');
    const timerDisplay = document.querySelector('.timer');
    
    // Variables de estado
    let currentAudio = null;
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let visualizerBars = [];
    let catMood = 'neutral';
    let catMoodTimer = null;
    let elapsedTime = 0;
    let timerInterval = null;
    
    // Inicializar visualizador
    initVisualizer();
    
    // Inicializar cara de gato
    initCatFace();
    
    // Iniciar cambio aleatorio de estado del gato
    startRandomCatMoodChanges();
    
    // Control de volumen
    volumeControl.addEventListener('input', function() {
        if (currentAudio) {
            currentAudio.volume = this.value / 100;
        }
    });
    
    // Configurar botones de sonido
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            const soundType = this.getAttribute('data-sound');
            playSound(soundType);
            
            // Desactivar botones activos anteriores
            soundButtons.forEach(btn => btn.classList.remove('active'));
            // Activar botón actual
            this.classList.add('active');
        });
    });
    

    
    // Función para inicializar el visualizador de audio
    function initVisualizer() {
        // Crear barras del visualizador
        for(let i = 0; i < 16; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            audioVisualizer.appendChild(bar);
            visualizerBars.push(bar);
        }
    }

    function connectAnalyser(audioElement) {
        if(!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }
        
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Iniciar animación
        updateVisualizer();
    }

    function updateVisualizer() {
        requestAnimationFrame(updateVisualizer);
        
        if(!analyser) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        visualizerBars.forEach((bar, index) => {
            const value = dataArray[index] / 128;
            const height = Math.max(2, value * 40);
            bar.style.height = `${height}px`;
        });
    }
    
    // Función para inicializar la cara del gato
    function initCatFace() {
        // Crear la cara inicial del gato con pixel art
        drawCatFace('neutral');
    }
    
    // Función para dibujar la cara del gato según el estado
    function drawCatFace(mood) {
        // Diferentes expresiones faciales para el gato en pixel art
        const catFaces = {
            neutral: `
                <div class="cat-pixel-art">
                    <div class="cat-ears"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">•   •</div>
                        <div class="cat-mouth">ᴥ</div>
                    </div>
                </div>
            `,
            happy: `
                <div class="cat-pixel-art">
                    <div class="cat-ears"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">^   ^</div>
                        <div class="cat-mouth">ᴥ</div>
                    </div>
                </div>
            `,
            sad: `
                <div class="cat-pixel-art">
                    <div class="cat-ears sad"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">•   •</div>
                        <div class="cat-mouth">ω</div>
                    </div>
                </div>
            `,
            angry: `
                <div class="cat-pixel-art">
                    <div class="cat-ears angry"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">ò   ó</div>
                        <div class="cat-mouth">ᴥ</div>
                    </div>
                </div>
            `,
            sleeping: `
                <div class="cat-pixel-art">
                    <div class="cat-ears"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">-   -</div>
                        <div class="cat-mouth">ᴥ</div>
                    </div>
                </div>
            `,
            surprised: `
                <div class="cat-pixel-art">
                    <div class="cat-ears"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">O   O</div>
                        <div class="cat-mouth">o</div>
                    </div>
                </div>
            `,
            playful: `
                <div class="cat-pixel-art">
                    <div class="cat-ears"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">^   ~</div>
                        <div class="cat-mouth">ᴥ</div>
                    </div>
                </div>
            `,
            curious: `
                <div class="cat-pixel-art">
                    <div class="cat-ears"></div>
                    <div class="cat-face">
                        <div class="cat-eyes">?   ?</div>
                        <div class="cat-mouth">ω</div>
                    </div>
                </div>
            `
        };
        
        // Asignar la cara correspondiente al estado
        catFace.innerHTML = catFaces[mood] || catFaces.neutral;
    }
    
    // Función para cambiar el estado del gato
    function changeCatMood(mood) {
        catMood = mood;
        drawCatFace(mood);
        
        // Reiniciar el temporizador de cambio aleatorio
        clearTimeout(catMoodTimer);
        startRandomCatMoodChanges();
    }
    
    // Función para iniciar cambios aleatorios de estado del gato
    function startRandomCatMoodChanges() {
        // Cambiar el estado del gato cada 20-30 segundos
        setInterval(() => {
            const moods = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'sleepy', 'curious', 'playful'];
            const randomMood = moods[Math.floor(Math.random() * moods.length)];
            changeCatMood(randomMood);
            
            // Actualizar visualmente qué botón de estado está activo
            moodButtons.forEach(btn => {
                if (btn.getAttribute('data-mood') === randomMood) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }, Math.random() * 10000 + 20000); // Entre 20 y 30 segundos
    }
    
    // Función para reproducir un sonido
    function playSound(soundType) {
        if(currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        const audio = new Audio(`sounds/${soundType}.mp3`);
        
        audio.volume = volumeControl.value / 100;
        audio.pause();
        audio.currentTime = 0;
        audio.loop = false;
        audio.play();
        
        // Conectar analizador
        connectAnalyser(audio);
        
        currentAudio = audio;
    }
    
    // Función para configurar el contexto de audio
    function setupAudioContext(audio) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            requestAnimationFrame(updateVisualizer);
        }
    }
    
    // Función para actualizar el visualizador
    function createVisualizerBars() {
        const visualizer = document.getElementById('audio-visualizer');
        visualizer.innerHTML = '';
        
        for(let i = 0; i < 32; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            visualizer.appendChild(bar);
        }
        visualizerBars = Array.from(visualizer.children);
    }
    
    // Actualizar el visualizador de audio
    function updateVisualizer() {
        if (!analyser) return;
        
        requestAnimationFrame(updateVisualizer);
        
        analyser.getByteFrequencyData(dataArray);
        
        const bufferLength = analyser.frequencyBinCount;
        const barCount = visualizerBars.length;
        
        for (let i = 0; i < barCount; i++) {
            const index = Math.floor(i * bufferLength / barCount);
            const value = dataArray[index];
            const height = value * 0.5;
            visualizerBars[i].style.height = `${height}px`;
        }
    }
    
    // Iniciar el temporizador
    function startTimer() {
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimerDisplay();
        }, 1000);
    }
    
    // Actualizar la visualización del temporizador
    function updateTimerDisplay() {
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    createVisualizerBars();
    requestAnimationFrame(updateVisualizer);
});
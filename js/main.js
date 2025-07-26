let boton = document.querySelector(".boton-cerrar-menu");
let tarjeta = document.querySelector(".menu");

let botonabrir = document.querySelector(".div1-menu-btnfondo");

const text = "Jeferson EH";
const breakIndex = text.indexOf(" ") !== -1 ? text.indexOf(" ") : text.length;
const typewriter = document.getElementById('typewriter');
const finalText = document.getElementById('final-text');
const colorBox = document.getElementById('color-box');
const movingDivs = [
    document.getElementById('mv0'),
    document.getElementById('mv1'),
    document.getElementById('mv2'),
    document.getElementById('mv3')
];
const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');

const checkbox = document.getElementById('toggle');
const audio = document.getElementById('backgroundAudio');


botonabrir.addEventListener("click", function () {
    tarjeta.classList.add("efecto-abrir");
});


boton.addEventListener("click", function () {
    tarjeta.classList.remove("efecto-abrir");
    tarjeta.classList.add("efecto-cerrar");
});

let i = 0;

function type() {
    let display = "";
    if (i <= text.length) {
        if (i <= breakIndex) {
            display = text.slice(0, i);
        } else {
            display = text.slice(0, breakIndex) + "<br>" + text.slice(breakIndex + 1, i);
        }
        typewriter.innerHTML = display + '<span class="cursor">|</span>';
        i++;
        setTimeout(type, 140);
    } else {
        typewriter.innerHTML = text.slice(0, breakIndex) + "<br>" + text.slice(breakIndex + 1) + '<span class="cursor">|</span>';
        setTimeout(() => {
            finalText.classList.add('visible');
            setTimeout(() => {
                colorBox.classList.add('visible');
                // Animar los 4 divs de derecha a izquierda, uno tras otro
                movingDivs.forEach((div, idx) => {
                    setTimeout(() => {
                        div.classList.add('visible');
                    }, idx * 250);
                });
            }, 400);
        }, 500);
    }
}
type();


/* canvas style */
// canvas syle 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function generateNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = imageData.data;

    for (let i = 0; i < buffer.length; i += 4) {
        const gray = Math.random() * 255;
        buffer[i] = buffer[i + 1] = buffer[i + 2] = gray;
        buffer[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

function loop() {
    generateNoise();
    requestAnimationFrame(loop);
}

loop();

// audio

// Lista de audios
const playlist = [
    './assets/audio/audio3.mp3',
    '/assets/audio/audio.mp3',
];

let currentTrack = 0;

// Cargar la primera pista
audio.src = playlist[currentTrack];

// 🎚️ Control de volumen (0.0 a 1.0)
audio.volume = 0.7; // Cambia este valor según el volumen deseado

// Cuando termina un audio, pasa al siguiente
audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    audio.src = playlist[currentTrack];
    audio.play();
});

// Al marcar o desmarcar el checkbox
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        audio.play();
    } else {
        audio.pause();
    }
});


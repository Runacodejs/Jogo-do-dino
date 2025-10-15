const dino = document.getElementById('dino');
const game = document.querySelector('.game');
const pontuacao = document.getElementById('pontuacao');

let pulando = false;
let score = 0;
let velocidade = 2000; // velocidade inicial dos cactos
let jogoAtivo = true;

// Função de pulo
function pular() {
    if (!pulando) {
        pulando = true;
        let altura = 0;
        let upInterval = setInterval(() => {
            if (altura >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (altura <= 0) {
                        clearInterval(downInterval);
                        pulando = false;
                    }
                    altura -= 10;
                    dino.style.bottom = altura + 'px';
                }, 20);
            }
            altura += 10;
            dino.style.bottom = altura + 'px';
        }, 20);
    }
}

// Tecla de pulo
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        pular();
    }
});

// Criar cactos aleatórios
function criarCacto() {
    if (!jogoAtivo) return;

    const cacto = document.createElement('div');
    cacto.classList.add('cacto');
    game.appendChild(cacto);
    let cactoPos = 800;
    let intervalo = setInterval(() => {
        if (cactoPos < -50) {
            clearInterval(intervalo);
            game.removeChild(cacto);
        } else if (cactoPos > 50 && cactoPos < 100 && parseInt(dino.style.bottom) < 50) {
            alert('Fim de jogo! Pontuação: ' + score);
            jogoAtivo = false;
            location.reload(); // reinicia o jogo
        } else {
            cactoPos -= 10;
            cacto.style.right = cactoPos + 'px';
        }
    }, 20);

    // Próximo cacto em tempo aleatório
    let tempo = Math.random() * 2000 + 1000; // 1s a 3s
    setTimeout(criarCacto, tempo);
}

// Pontuação
setInterval(() => {
    if (jogoAtivo) {
        score++;
        pontuacao.textContent = score;
        // Aumenta a dificuldade a cada 100 pontos
        if (score % 100 === 0 && velocidade > 500) {
            velocidade -= 100;
        }
    }
}, 200);

// Começa o jogo
criarCacto();
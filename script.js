/* ===================================================
   AGROFORTE - FUTURO SUSTENTÁVEL
   SCRIPT COMPLETO CORRIGIDO
=================================================== */

/* ================================
   CONTROLE DE TELAS
================================ */

const screens = document.querySelectorAll(".screen");

function showScreen(id){
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* ================================
   ELEMENTOS PRINCIPAIS
================================ */

const startBtn = document.getElementById("startPresentation");
const openBookBtn = document.getElementById("openBookBtn");
const backBookCover = document.getElementById("backBookCover");
const backPresentationBtn = document.getElementById("backPresentationBtn");
const restartBook = document.getElementById("restartBook");

const pages = document.querySelectorAll(".page");
let currentPage = 0;

/* ================================
   BARRA DE PROGRESSO
================================ */

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress(value){
    progressFill.style.width = value + "%";
    progressText.innerText = value + "%";
}

/* ================================
   INÍCIO
================================ */

startBtn.addEventListener("click", ()=>{
    showScreen("bookCover");
    updateProgress(5);
});

/* ================================
   ABRIR LIVRO
================================ */

openBookBtn.addEventListener("click", ()=>{
    showScreen("bookSection");
    pages.forEach(p => p.classList.remove("active-page"));
    pages[currentPage].classList.add("active-page");
    
    let progress = pages[currentPage].dataset.progress;
    updateProgress(progress);
});

/* ================================
   VOLTAR E RECOMEÇAR
================================ */

backBookCover.addEventListener("click", ()=>{
    showScreen("bookCover");
});

backPresentationBtn.addEventListener("click", ()=>{
    showScreen("presentationCover");
});

// Correção do botão "Voltar" na Capa do Livro (bookCover)
document.querySelector(".backPresentation").addEventListener("click", () => {
    showScreen("presentationCover");
    updateProgress(0);
});

restartBook.addEventListener("click", ()=>{
    currentPage = 0;
    pages.forEach(p => p.classList.remove("active-page"));
    pages[0].classList.add("active-page");
    
    // Reseta o fundo do livro para o padrão CSS original
    document.getElementById("bookSection").style.background = "";
    
    // Reseta o container de resultados das escolhas
    document.getElementById("futureResult").innerHTML = "";

    showScreen("presentationCover");
    updateProgress(0);
});

/* ================================
   NAVEGAÇÃO DE PÁGINAS
================================ */

// Lógica de avanço centralizada para evitar o pulo da página 8
document.getElementById("nextPage").addEventListener("click", ()=>{
    if(currentPage < pages.length - 1){
        pages[currentPage].classList.remove("active-page");
        currentPage++;
        pages[currentPage].classList.add("active-page");

        let progress = pages[currentPage].dataset.progress;
        updateProgress(progress);

        // Se o usuário acabou de chegar na última página (Capítulo 8)
        if(currentPage === pages.length - 1){
            setTimeout(()=>{
                showScreen("finalCover");
                activateFinal();
            }, 6000); // 6 segundos garantem tempo para ler e clicar nas escolhas
        }
    }
});

document.getElementById("prevPage").addEventListener("click", ()=>{
    if(currentPage > 0){
        pages[currentPage].classList.remove("active-page");
        currentPage--;
        pages[currentPage].classList.add("active-page");

        let progress = pages[currentPage].dataset.progress;
        updateProgress(progress);
    }
});

/* ================================
   MASCOTE SEMENTINHA
================================ */

const speech = document.querySelector(".speech");

const frases = [
    "Olá! Eu sou a Sementinha 🌱",
    "Vamos aprender sobre sustentabilidade!",
    "O agro pode crescer sem destruir a natureza!",
    "Você está indo muito bem nessa jornada!",
    "O futuro depende das nossas escolhas!"
];

setInterval(()=>{
    if(speech){
        speech.innerText = frases[Math.floor(Math.random() * frases.length)];
    }
}, 6000);

/* ================================
   MAPA DO BRASIL
================================ */

const regionInfo = document.getElementById("regionInfo");
const regions = document.querySelectorAll(".region");

const info = {
    norte: "🌳 Norte: Grande biodiversidade e preservação da Amazônia.",
    nordeste: "🌞 Nordeste: Agricultura adaptada ao clima semiárido.",
    centro: "🚜 Centro-Oeste: Potência do agronegócio brasileiro.",
    sudeste: "🏭 Sudeste: Tecnologia, café e inovação agrícola.",
    sul: "🌾 Sul: Agricultura sustentável e forte produção familiar."
};

regions.forEach(region=>{
    region.addEventListener("click", ()=>{
        regionInfo.innerText = info[region.dataset.region];
    });
});

/* ================================
   CURIOSIDADES
================================ */

const curiosities = document.querySelectorAll(".curiosity");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

curiosities.forEach(c=>{
    c.addEventListener("click", ()=>{
        modal.style.display = "flex";
        modalText.innerText = c.dataset.text;
    });
});

closeModal.addEventListener("click", ()=>{
    modal.style.display = "none";
});

window.addEventListener("click", (e)=>{
    if(e.target === modal){
        modal.style.display = "none";
    }
});

/* ================================
   ESCOLHAS DO FUTURO
================================ */

const positive = document.querySelector(".positive");
const negative = document.querySelector(".negative");
const result = document.getElementById("futureResult");

positive.addEventListener("click", ()=>{
    result.innerHTML = `
        🌱 Você escolheu preservar a natureza!<br><br>
        O futuro se torna verde, sustentável e equilibrado.
    `;
    document.getElementById("bookSection").style.background =
    "linear-gradient(180deg,#b7e4c7,#95d5b2,#52b788)";
});

negative.addEventListener("click", ()=>{
    result.innerHTML = `
        ⚠️ Impacto negativo!<br><br>
        O ambiente sofre com poluição e degradação.
    `;
    document.getElementById("bookSection").style.background =
    "linear-gradient(180deg,#5a5a5a,#2b2b2b,#1a1a1a)";
});

/* ================================
   FINAL - ANIMAÇÃO 100%
================================ */

const finalScreen = document.getElementById("finalCover");

function activateFinal(){
    finalScreen.classList.add("final-cover-active");
    updateProgress(100);
}

/* ================================
   INICIALIZAÇÃO
================================ */

showScreen("presentationCover");
updateProgress(0);
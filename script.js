/* ============================================================
PERSONNALISE TOUT ICI — c'est la seule section à modifier
============================================================ */
const CONFIG = {

accueil: {
eyebrow: "Une petite surprise",
titre: "Pour toi",
sousTitre: "J'ai préparé quelque chose rien que pour toi. Réponds aux questions, et laisse-toi guider jusqu'à la fin.",
},

meter: {
eyebrow: "Un petit test",
titre: "Combien tu m'aimes ?",
sousTitre: "Fais glisser la barre jusqu'à ton ressenti du moment.",
valeurDepart: 50,
// Modifie les paliers ici : "max" est le seuil haut (inclus) pour cet emoji/texte.
paliers: [
{ max: 19, emoji: "😐", texte: "Bof bof" },
{ max: 39, emoji: "🙂", texte: "Un petit peu" },
{ max: 59, emoji: "😊", texte: "Comme ci, comme ça" },
{ max: 79, emoji: "🥰", texte: "Beaucoup beaucoup" },
{ max: 100, emoji: "😍", texte: "À la folie" }
]
},

lettre: {
eyebrow: "Une lettre pour toi",
titre: "Ce que tu es pour moi",
paragraphes: [
"Il y a des personnes qui traversent une vie, et il y a toi, qui l'as illuminée. Depuis que tu es là, même les jours gris ont une lumière particulière, comme si le monde savait qu'il devait être plus doux pour toi.",
"Je t'aime dans les silences autant que dans les mots, dans tes éclats de rire autant que dans tes doutes. Je t'aime telle que tu es, sans rien à changer, parce que tu es déjà exactement ce que mon cœur cherchait sans le savoir.",
"Tu es sublime, non pas seulement dans le miroir, mais dans chaque geste que tu poses, chaque attention que tu offres sans y penser. Tu es parfaite, pas parce que tu ne fais jamais d'erreurs, mais parce que tu es entièrement, sincèrement toi.",
"Alors aujourd'hui, je voulais simplement te le dire, sans raison particulière, sans occasion à fêter : je t'aime. Plus qu'hier, un peu moins que demain, et ça continuera ainsi, encore et encore."
],
signature: "À toi, pour toujours."
},

final: {
titre: "Je t'aime",
message: "Tu es parfaite. Tu es sublime. Tu es la plus belle chose qui me soit arrivée, et je t'aime, aujourd'hui et pour toujours.",
texteRevele: "❤️ À moi aussi, pour toujours. ❤️"
}
};

/* ============================================================
LOGIQUE — pas besoin de modifier ce qui suit
============================================================ */

const screens = ["welcome", "meter", "letter", "final"];

function showScreen(name){
document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
document.querySelector(`.screen[data-screen="${name}"]`).classList.add("active");
const idx = screens.indexOf(name);
const pct = ((idx + 1) / screens.length) * 100;
document.getElementById("progressFill").style.width = pct + "%";
}

function initWelcome(){
document.getElementById("welcomeEyebrow").textContent = CONFIG.accueil.eyebrow;
document.getElementById("welcomeTitle").textContent = CONFIG.accueil.titre;
document.getElementById("welcomeSubtitle").textContent = CONFIG.accueil.sousTitre;
}

function getPalier(pct){
return CONFIG.meter.paliers.find(p => pct <= p.max) || CONFIG.meter.paliers[CONFIG.meter.paliers.length - 1];
}

function updateMeterDisplay(pct){
const palier = getPalier(pct);
document.getElementById("meterEmoji").textContent = palier.emoji;
document.getElementById("meterValue").textContent = pct + "%";
document.getElementById("meterCaption").textContent = palier.texte;
document.getElementById("loveSlider").style.background =
`linear-gradient(to right, var(--rose) ${pct}%, var(--track) ${pct}%)`;
}

function initMeter(){
document.getElementById("meterEyebrow").textContent = CONFIG.meter.eyebrow;
document.getElementById("meterTitle").textContent = CONFIG.meter.titre;
document.getElementById("meterSubtitle").textContent = CONFIG.meter.sousTitre;
const slider = document.getElementById("loveSlider");
slider.value = CONFIG.meter.valeurDepart;
updateMeterDisplay(Number(slider.value));
}

document.getElementById("loveSlider").addEventListener("input", (e) => {
updateMeterDisplay(Number(e.target.value));
});

function initLetter(){
document.getElementById("letterEyebrow").textContent = CONFIG.lettre.eyebrow;
document.getElementById("letterTitle").textContent = CONFIG.lettre.titre;
document.getElementById("letterSignature").textContent = CONFIG.lettre.signature;
const body = document.getElementById("letterBody");
body.innerHTML = "";
CONFIG.lettre.paragraphes.forEach(p => {
const el = document.createElement("p");
el.textContent = p;
body.appendChild(el);
});
}

function initFinal(){
document.getElementById("finalTitle").textContent = CONFIG.final.titre;
document.getElementById("finalMessage").textContent = CONFIG.final.message;
}

document.getElementById("startBtn").addEventListener("click", () => {
showScreen("meter");
initMeter();
});

document.getElementById("toLetterBtn").addEventListener("click", () => { showScreen("letter"); initLetter(); });
document.getElementById("toFinalBtn").addEventListener("click", () => { showScreen("final"); initFinal(); });

document.getElementById("meAlsoBtn").addEventListener("click", () => {
const reveal = document.getElementById("meAlsoReveal");
reveal.textContent = CONFIG.final.texteRevele;
reveal.classList.add("show");
document.getElementById("meAlsoBtn").style.display = "none";
});

initWelcome();
showScreen("welcome");


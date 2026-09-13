/* ============================================================
PERSONNALISE TOUT ICI — c'est la seule section à modifier
============================================================ */
const CONFIG = {

accueil: {
eyebrow: "Une petite surprise",
titre: "Pour toi",
sousTitre: "J'ai préparé quelque chose rien que pour toi. Réponds aux questions, et laisse-toi guider jusqu'à la fin.",
},

// Ajoute, retire ou modifie autant de questions que tu veux.
// "correct" est l'index (0, 1, 2...) de la bonne réponse dans "options".
questions: [
{
question: "Qu'est-ce qui prouve un amour vrai ?",
options: ["Les grands discours", "Rester après avoir tout vu de l'autre", "Les cadeaux", "Ne jamais se disputer"],
correct: 1
},
{
question: "Quand je pense à toi, je ressens surtout...",
options: ["De la curiosité", "De la nostalgie", "De la paix", "De l'excitation"],
correct: 2
},
{
question: "Le véritable amour se reconnaît quand...",
options: ["On se sent obligé de rester", "On choisit l'autre chaque jour, sans y être forcé", "On ne se dispute jamais", "On pense pareil sur tout"],
correct: 1
},
{
question: "Ce qui rend notre histoire unique ?",
options: ["Le hasard qui nous a réunis", "Le fait qu'on se choisit encore aujourd'hui", "Le temps qu'on a passé ensemble", "Toutes ces réponses"],
correct: 3
},
{
question: "Si je devais résumer mon amour pour toi en un mot...",
options: ["Évidence", "Chance", "Refuge", "Toi"],
correct: 3
}
],

meter: {
titre: "Ton score d'amour",
// Le commentaire s'adapte au score, voir getMeterComment() plus bas si tu veux changer les paliers.
},

photo: {
// Remplace assets/photo.jpg par votre photo (même nom de fichier, ou change le src dans index.html)
legende: "Notre premier souvenir",
// Colle ici un lien d'intégration Spotify officiel (clic droit sur un titre Spotify > Partager > Intégrer)
// Exemple de format : https://open.spotify.com/embed/track/ID_DU_TITRE
spotifyEmbedUrl: ""
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
message: "Tu es parfaite. Tu es sublime. Tu es la plus belle chose qui me soit arrivée, et je t'aime, aujourd'hui et pour toujours."
}
};

/* ============================================================
LOGIQUE — pas besoin de modifier ce qui suit
============================================================ */

const screens = ["welcome", "quiz", "meter", "photo", "letter", "final"];
let currentScreenIndex = 0;
let currentQuestion = 0;
let score = 0;

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

function renderQuestion(){
const q = CONFIG.questions[currentQuestion];
document.getElementById("quizCounter").textContent = `Question ${currentQuestion + 1} / ${CONFIG.questions.length}`;
document.getElementById("quizQuestion").textContent = q.question;
document.getElementById("quizFeedback").textContent = "";
document.getElementById("nextQuestionBtn").style.display = "none";

const optionsWrap = document.getElementById("quizOptions");
optionsWrap.innerHTML = "";
q.options.forEach((opt, i) => {
const btn = document.createElement("button");
btn.className = "option-btn";
btn.textContent = opt;
btn.addEventListener("click", () => answerQuestion(i, btn));
optionsWrap.appendChild(btn);
});
}

function answerQuestion(selectedIndex, btnEl){
const q = CONFIG.questions[currentQuestion];
const buttons = document.querySelectorAll("#quizOptions .option-btn");
buttons.forEach(b => b.disabled = true);

if (selectedIndex === q.correct){
score++;
btnEl.classList.add("correct");
document.getElementById("quizFeedback").textContent = "Bonne réponse !";
} else {
btnEl.classList.add("wrong");
buttons[q.correct].classList.add("correct");
document.getElementById("quizFeedback").textContent = "Pas tout à fait, mais on t'aime quand même.";
}

document.getElementById("nextQuestionBtn").style.display = "inline-block";
}

function nextQuestion(){
currentQuestion++;
if (currentQuestion < CONFIG.questions.length){
renderQuestion();
} else {
showMeter();
}
}

function getMeterComment(pct){
if (pct === 100) return "Un score parfait. On est faits l'un pour l'autre.";
if (pct >= 70) return "Très bien joué, tu me connais par cœur.";
if (pct >= 40) return "Pas mal du tout, on va combler les manques ensemble.";
return "On a encore plein de choses à découvrir l'un sur l'autre.";
}

function showMeter(){
showScreen("meter");
document.getElementById("meterTitle").textContent = CONFIG.meter.titre;
const pct = Math.round((score / CONFIG.questions.length) * 100);

const circumference = 283;
const offset = circumference - (circumference * pct) / 100;
const angle = -90 + (pct / 100) * 180;

requestAnimationFrame(() => {
document.getElementById("gaugeFill").style.strokeDashoffset = offset;
document.getElementById("gaugeNeedle").style.transform = `rotate(${angle}deg)`;
});

let displayed = 0;
const step = Math.max(1, Math.round(pct / 30));
const interval = setInterval(() => {
displayed = Math.min(pct, displayed + step);
document.getElementById("gaugeValue").textContent = displayed + "%";
if (displayed >= pct) clearInterval(interval);
}, 25);

document.getElementById("meterComment").textContent = getMeterComment(pct);
}

function initPhoto(){
document.getElementById("photoCaption").textContent = CONFIG.photo.legende;
const frame = document.getElementById("spotifyFrame");
const player = document.getElementById("spotifyPlayer");
if (CONFIG.photo.spotifyEmbedUrl){
frame.src = CONFIG.photo.spotifyEmbedUrl;
player.style.display = "block";
} else {
player.style.display = "none";
}
}

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

function restart(){
currentQuestion = 0;
score = 0;
showScreen("welcome");
}

document.getElementById("startBtn").addEventListener("click", () => {
currentQuestion = 0;
score = 0;
showScreen("quiz");
renderQuestion();
});

document.getElementById("nextQuestionBtn").addEventListener("click", nextQuestion);
document.getElementById("toPhotoBtn").addEventListener("click", () => { showScreen("photo"); initPhoto(); });
document.getElementById("toLetterBtn").addEventListener("click", () => { showScreen("letter"); initLetter(); });
document.getElementById("toFinalBtn").addEventListener("click", () => { showScreen("final"); initFinal(); });
document.getElementById("restartBtn").addEventListener("click", restart);

initWelcome();
showScreen("welcome");


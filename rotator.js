const textElement = document.getElementById("rotating-text");

/* STOP EVERYTHING ON MOBILE */
if (window.matchMedia("(max-width: 768px)").matches) {
    textElement.textContent = "";
    textElement.classList.remove("fade-out");
    return;
}

let phrases = [];
let lastIndex = -1;

async function loadPhrases() {
    const response = await fetch("../phrases.txt");
    const text = await response.text();

    phrases = text
        .split("\n")
        .map(l => l.trim())
        .filter(l => l);

    startRotation();
}

function pickRandom() {
    let index = Math.floor(Math.random() * phrases.length);

    while (index === lastIndex) {
        index = Math.floor(Math.random() * phrases.length);
    }

    lastIndex = index;
    return phrases[index];
}

function startRotation() {
    textElement.textContent = pickRandom();

    setInterval(() => {
        textElement.classList.add("fade-out");

        setTimeout(() => {
            textElement.textContent = pickRandom();
            textElement.classList.remove("fade-out");
        }, 1000);

    }, 5000);
}

loadPhrases();
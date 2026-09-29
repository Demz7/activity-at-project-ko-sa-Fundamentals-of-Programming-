let music = new Audio("totoo.mp3");

music.loop = false;
music.volume = 1.0;

let display = document.getElementById("display");

let lyrics = [
  { text: "kitang-kita na sa kilos mong kakaiba.", duration: 6800 },
  { text: "ooh, ako pa ba?!", duration: 6500 },
  { text: "ikaw at ako...", duration: 4000 },
  { text: "ang magkasama...", duration: 4000 },
  { text: "sa mga alaala", duration: 3600 },
  { text: "pwede bang kalimutan muna natin ang mundo?", duration: 11500 },
  { text: "at hawakan mo ang kamay ko.", duration: 4000 },
  { text: "magmahalan, na walang iniisip na kung ano.", duration: 8000 },
  { text: "ipakita lang ang totoong tayo.", duration: 7500 },
];

let lyricIndex = 0;
let lyricTimer = null;

function addToDisplay(value) {
  if (
    display.innerText === "Hello, world!" ||
    display.innerText === "Error"
  ) {
    display.innerText = "";
  }
  display.innerText += value;
}

function clearDisplay() {
  clearTimeout(lyricTimer);
  lyricTimer = null;
  lyricIndex = 0;
  display.innerText = "";
}

function deleteNumber() {
  display.innerText = display.innerText.slice(0, -1);
}

function percent() {
  let number = parseFloat(display.innerText);
  if (!isNaN(number)) {
    display.innerText = number / 100;
  }
}

function calculate() {
    clearTimeout(lyricTimer);
    lyricIndex = 0;

    try {
        let expression = display.innerText;

        expression = expression.replace(/×/g, "*");
        expression = expression.replace(/÷/g, "/");

        let result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            display.innerText = "Error";
            return;
        }

        // SPECIAL LYRIC + MUSIC TRIGGER
        if (result === 28) {
            music.currentTime = 0;
            music.play();

            showLyrics();
        } 
        else {
            display.innerText = result;
        }

    } catch (error) {
        display.innerText = "Error";
    }
}

function showLyrics() {
  if (lyricIndex >= lyrics.length) {
        music.pause();
        music.currentTime = 0;
        return;
  }

  let text = lyrics[lyricIndex].text;
  let duration = lyrics[lyricIndex].duration;

  display.innerHTML = "";

  let lyricsContainer = document.createElement("div");
  lyricsContainer.className = "lyrics";

  // Separate by words (not by letters)
  let words = text.split(" ");

  words.forEach((word, index) => {
    let span = document.createElement("span");
    span.innerText = word;
    span.className = "wave-word";
    span.style.animationDelay = `${index * 0.1}s`;

    lyricsContainer.appendChild(span);

    // Add space after each word except the last one
    if (index < words.length - 1) {
      lyricsContainer.appendChild(document.createTextNode(" "));
    }
  });

  display.appendChild(lyricsContainer);
  lyricIndex++;
  lyricTimer = setTimeout(showLyrics, duration);
}


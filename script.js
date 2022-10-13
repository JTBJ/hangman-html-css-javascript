// alert("Click ok to play");
"use strict";

const gameWords = [
  "abruptly",
  "absurd",
  "affix",
  "askew",
  "avenue",
  "awkward",
  "axiom",
  "azure",
  "bagpipes",
  "bandwagon",
  "banjo",
  "bayou",
  "beekeeper",
  "bikini",
  "blitz",
  "blizzard",
  "boggle",
  "bookworm",
  "boxcar",
  "boxful",
  "buckaroo",
  "buffalo",
  "buffoon",
  "buxom",
  "buzzard",
  "buzzing",
  "buzzwords",
  "caliph",
  "cobweb",
  "cockiness",
  "croquet",
  "crypt",
  "curacao",
  "cycle",
  "daiquiri",
  "dirndl",
  "disavow",
  "dizzying",
  "duplex",
  "dwarves",
  "embezzle",
  "equip",
  "espionage",
  "euouae",
  "exodus",
  "faking",
  "fishhook",
  "fixable",
  "fjord",
  "flapjack",
  "flopping",
  "fluffiness",
  "flyby",
  "foxglove",
  "frazzled",
  "frizzled",
  "fuchsia",
  "funny",
  "gabby",
  "galaxy",
  "galvanize",
  "gazebo",
  "giaour",
  "gizmo",
  "glowworm",
  "glyph",
  "gnarly",
  "gnostic",
  "gossip",
  "grogginess",
  "haiku",
  "haphazard",
  "hyphen",
  "iatrogenic",
  "icebox",
  "injury",
  "ivory",
  "ivy",
  "jackpot",
  "jaundice",
  "jawbreaker",
  "jaywalk",
  "jazziest",
  "jazzy",
  "jelly",
  "jigsaw",
  "jinx",
  "jiujitsu",
  "jockey",
  "jogging",
  "joking",
  "jovial",
  "joyful",
  "juicy",
  "jukebox",
  "jumbo",
  "kayak",
  "kazoo",
  "keyhole",
  "khaki",
  "kilobyte",
  "kiosk",
  "kitsch",
  "kiwifruit",
  "klutz",
  "knapsack",
  "larynx",
  "lengths",
  "lucky",
  "luxury",
  "lymph",
  "marquis",
  "matrix",
  "megahertz",
  "microwave",
  "mnemonic",
  "mystify",
  "naphtha",
  "nightclub",
  "nowadays",
  "numbskull",
  "nymph",
  "onyx",
  "ovary",
  "oxidize",
  "oxygen",
  "pajama",
  "peekaboo",
  "phlegm",
  "pixel",
  "pizazz",
  "pneumonia",
  "polka",
  "pshaw",
  "psyche",
  "puppy",
  "puzzling",
  "quartz",
  "queue",
  "quips",
  "quixotic",
  "quiz",
  "quizzes",
  "quorum",
  "razzmatazz",
  "rhubarb",
  "rhythm",
  "rickshaw",
  "schnapps",
  "scratch",
  "shiv",
  "snazzy",
  "sphinx",
  "spritz",
  "squawk",
  "staff",
  "strength",
  "strengths",
  "stretch",
  "stronghold",
  "stymied",
  "subway",
  "swivel",
  "syndrome",
  "thriftless",
  "thumbscrew",
  "topaz",
  "transcript",
  "transgress",
  "transplant",
  "triphthong",
  "twelfth",
  "twelfths",
  "unknown",
  "unworthy",
  "unzip",
  "uptown",
  "vaporize",
  "vixen",
  "vodka",
  "voodoo",
  "vortex",
  "voyeurism",
  "walkway",
  "waltz",
  "wave",
  "wavy",
  "waxy",
  "wellspring",
  "wheezy",
  "whiskey",
  "whizzing",
  "whomever",
  "wimpy",
  "witchcraft",
  "wizard",
  "woozy",
  "wristwatch",
  "wyvern",
  "xylophone",
  "yachtsman",
  "yippee",
  "yoked",
  "youthful",
  "yummy",
  "zephyr",
  "zigzag",
  "zigzagging",
  "zilch",
  "zipper",
  "zodiac",
  "zombie",
];

const form = document.getElementById("form");
const botton = document.getElementById("submit");
const hangmen = document.querySelector(".hangman");
const placeholder = document.getElementById("placeholder");
const guessesLeft = document.getElementById("no-of-guesses");
const score = document.getElementById("points");
const reset = document.getElementById("restart");
const winnerContainer = document.getElementById("canvas-container");
const mainScene = document.getElementById("main-scene");
const ctx = document.getElementById("canvas").getContext("2d");

let counter = 1;
let placeholdersSet = false;
let word = "hector";
let corretGuesses = [];

//setup to read user input and delegate api calls
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = document.getElementById("guess").value;
  if (validateLength(text)) {
    if (checkLetter(text)) {
      if (!checkDuplicate(text)) {
        console.log("no duplicate");

        incrementScore();
        showCorrectLetter(text);

        if (isGameWon()) {
          gameOver("winner");
        }
      } else {
        alert("Duplicate value");
      }

      console.log(text);
    } else {
      alert(`The letter "${text}" was not found`);
      hangman();
      decrementGuessCount();
    }
  }
  form.reset();
});

//api to check the length of user input
const validateLength = (text) => {
  if (text.length > 1) {
    alert("You may only enter 1 letter. Try again.");
    return false;
  } else if (text.length <= 0) {
    alert("Feild cannot be null. Try again.");
    return false;
  } else {
    return true;
  }
};

//api to select a game word from the game array
const selectGameWord = () => {
  word = gameWords[Math.floor(Math.random() * gameWords.length)];
  console.log(word);
  if (!placeholdersSet) {
    markPlaceHolders(word);
  }
};

//api to validate against the letter
const checkLetter = (text) => {
  if (word.includes(text)) {
    return true;
  } else {
    return false;
  }
};

//api to iterate hangman images and check counter
const hangman = () => {
  if (counter === 6) {
    counter++;
    hangmen.src = `/images/hgmn_${counter}.png`;
    setTimeout(() => {
      gameOver("loser");
    }, 2000);
  } else {
    counter++;
    hangmen.src = `/images/hgmn_${counter}.png`;
  }
};

//api to generate placeholders for each letter of the game word
const markPlaceHolders = (text) => {
  for (var i = 0; i < text.length; i++) {
    let mark = document.createElement("div");
    mark.id = `valueholder_${i}`;
    mark.className = "correct-guess";
    mark.innerText = "*";
    placeholder.insertAdjacentElement("beforeend", mark);
  }

  if (!placeholdersSet) {
    placeholdersSet = true;
  }
};

//decrement number of guesses
const decrementGuessCount = () => {
  guessesLeft.textContent = parseInt(guessesLeft.textContent) - 1;
};

//increment score
const incrementScore = () => {
  score.textContent = parseInt(score.textContent) + 10;
};

//resets the game
reset.addEventListener("click", () => {
  guessesLeft.textContent = 7;
  score.textContent = 0;
  hangmen.src = `/images/hgmn_1.png`;
  counter = 1;
  placeholdersSet = false;
  placeholder.innerHTML = "";
  form.reset();
  mainScene.style.display = "";
  winnerContainer.style.display = "none";
  corretGuesses = [];
  clearCanvas();
  selectGameWord();
});

//api to display correcr letters chosen
const showCorrectLetter = (text) => {
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i).localeCompare(text) == 0) {
      document.getElementById(`valueholder_${i}`).textContent = text;
      corretGuesses.push(text);
    }
  }
};

//api to determine if the player has won the game
const isGameWon = () => {
  if (corretGuesses.length == word.length) {
    return true;
  } else {
    return false;
  }
};

//api to determine if the game is lost
const isGameLost = () => {
  if (counter == 7) {
    return true;
  } else {
    return false;
  }
};

//api to display the winners and losers screens
const gameOver = (text) => {
  let image = new Image();
  ctx.font = "28px cursive";
  ctx.fillStyle = "white";

  if (text.localeCompare("winner") == 0) {
    ctx.fillText(`You are a winner!`, 40, 30);
    image.src = `/images/winners.gif`;
  } else if (text.localeCompare("loser") == 0) {
    ctx.fillText(`Sorry, you didn't win`, 40, 30);
    image.src = `/images/losers.gif`;
  }

  image.onload = () => {
    ctx.drawImage(image, 50, 40);
  };
  mainScene.style.display = "none";
  winnerContainer.style.display = "block";
};

//api to clear the canvas
const clearCanvas = () => {
  if (isGameWon || isGameLost) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

//api to check for duplicates
const checkDuplicate = (text) => {
  return corretGuesses.includes(text);
};

selectGameWord();

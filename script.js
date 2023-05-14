const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function randomCardNumber() {
  return Math.floor(Math.random() * 3) * 2 + 2;
}

function randomColorNumber() {
  return Math.floor(Math.random() * 5);
}

function randomColor() {
  return COLORS[randomColorNumber()];
}
let numberOfPairs = randomCardNumber();
console.log("Number of Pairs " + numberOfPairs);
function randomColorArray() {
  let newColorArray = [];

  for (i = 0; i < numberOfPairs; i++) {
    let color = randomColor();
    console.log(color);
    newColorArray.push(color);
    newColorArray.push(color);
  }
  return newColorArray;
}
let newColorArray = randomColorArray();

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(newColorArray);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let count = 0;
let match = [];
let selectedCards = [];
let matchedCards = [];
let finalScore = [];
let startButton = document.getElementById("start");
startButton.addEventListener("click", handleCardClick);
let restartButton = document.getElementById("restart");
restartButton.addEventListener("click", handleCardClick);
let score = 0;
let highScore4 = localStorage.highScore4 || 0;
let highScore8 = localStorage.highScore8 || 0;
let highScore12 = localStorage.highScore12 || 0;
document.querySelector("#score").innerHTML = score;
document.querySelector("#highScore4").innerHTML = highScore4;
document.querySelector("#highScore8").innerHTML = highScore8;
document.querySelector("#highScore12").innerHTML = highScore12;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target.classList);

  if (event.target.id == "start") {
    event.target.classList.toggle("on");
  }
  if (event.target.id == "restart") {
    document.location.reload();
  }
  if (
    startButton.classList == "on" &&
    event.target.id !== "start" &&
    event.target.id !== "restart" &&
    matchedCards.length !== newColorArray.length &&
    !event.target.classList.contains("match")
  ) {
    let cardSelect = event.target;
    {
      if (cardSelect !== selectedCards[0]) {
        if (count < 2) {
          selectedCards.push(cardSelect);
          cardSelect.style.backgroundColor = cardSelect.classList[0];
          match.push(event.target.style.backgroundColor);
          count++;
          score++;
          document.querySelector("#score").innerHTML = score;

          if (match.length == 2) {
            if (match[0] == match[1]) {
              console.log("You won");
              for (cards of selectedCards) {
                cards.classList.add("match");
                matchedCards.push(cards);
                count = 0;
                match = [];
              }
              selectedCards.pop();
              selectedCards.pop();
            } else {
              function backgroundRemove() {
                for (cards of selectedCards) {
                  cards.style.backgroundColor = "";
                  cards.style.backgroundColor = "";
                }
                selectedCards.pop();
                selectedCards.pop();
                console.log("Try Again");
                count = 0;
                match = [];
              }
              setTimeout(backgroundRemove, 1500);
            }
          }
        }
      }
    }
  }
  if (matchedCards.length == newColorArray.length) {
    console.log("You completed the game in " + score + " moves");
    if (numberOfPairs == 2) {
      if (highScore4 == 0 || score < highScore4) {
        document.querySelector("#highScore4").innerHTML = score;
        highScore = score;
        localStorage.setItem("highScore4", score);
      }
    }
    if (numberOfPairs == 4) {
      if (highScore8 == 0 || score < highScore8) {
        document.querySelector("#highScore8").innerHTML = score;
        highScore = score;
        localStorage.setItem("highScore8", score);
      }
    }
    if (numberOfPairs == 6) {
      if (highScore12 == 0 || score < highScore12) {
        document.querySelector("#highScore12").innerHTML = score;
        highScore = score;
        localStorage.setItem("highScore12", score);
      }
    }
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);

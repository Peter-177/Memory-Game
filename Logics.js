const Hello = document.querySelector(".name span");
const controlBtn = document.querySelector(".control-buttons");

document.querySelector(".control-buttons span").onclick = function () {
  controlBtn.remove();

  let Name = prompt("Whats your name?");

  if (Name == "") {
    Hello.innerHTML = "Unknown";
  } else {
    Hello.innerHTML = Name;
  }
};

let duration = 1000;
let blockContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // click event
  block.addEventListener("click", function () {
    flipCard(block);
  });
});

// shuffle
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    // swap
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}

// flip Cards
function flipCard(selectCard) {
  selectCard.classList.add("is-flipped");

  let allFlippedCards = blocks.filter((flipCard) =>
    flipCard.classList.contains("is-flipped")
  );

  // select two Cards
  if (allFlippedCards.length === 2) {
    StopClicking();
    checkMatchingCards(allFlippedCards[0], allFlippedCards[1]);
  }
}

function StopClicking() {
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    //Remove Class no clicking
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

// check matching cards
function checkMatchingCards(firstCard, secondCard) {
  let tries = document.querySelector(".tries span");

  if (firstCard.dataset.technology === secondCard.dataset.technology) {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    firstCard.classList.add("has-match");
    secondCard.classList.add("has-match");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
    }, duration);
  }
}

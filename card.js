const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = cards.length / 2;

function flipCard(event) {
  if (lockBoard) return;
  const el = event.currentTarget;
  if (el === firstCard) return;

  el.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = el;
    return;
  }

  secondCard = el;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedPairs++;

  
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      enlargeAllCards();
    }, 3000); // 延遲一點時間讓最後一張卡片完全翻轉
  } else {
    resetBoard();
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function enlargeAllCards() {
  cards.forEach(card => {
    card.style.transition = 'transform 0.5s';
    card.style.transform = 'scale(1.1)';
  });

  setTimeout(() => {
    shrinkAllCards();
  }, 1000);
}

function shrinkAllCards() {
  cards.forEach(card => {
    card.style.transform = 'scale(1)';
  });

  setTimeout(() => {
    flipAllCardsBack(); 
  }, 2000); 
}

function flipAllCardsBack() {
  cards.forEach(card => {
    card.classList.remove('flip'); 
    card.addEventListener('click', flipCard); 
    card.style.transition = '';
  });

  matchedPairs = 0;
  shuffle(); 
  resetBoard();
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));

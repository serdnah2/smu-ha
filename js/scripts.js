const cards = document.querySelectorAll(".smu-ha-cards-item-choose");
const cardsWrapper = document.querySelector('#smu-ha-cards');
const boardContent = document.querySelector('.smu-ha-board-item-content');
const cardsWrapperLineDividier = document.querySelector('.smu-ha-cards-line-dividier');
let cardsConfig = {
  'behavior': {
    selector: document.querySelector('#behavior-selector')
  },
  'emotion': {
    selector: document.querySelector('#emotion-selector')
  }
}

cards.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.id);
  });
});

/* boardContent.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log('enter here');
});*/

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text/plain");
  var cartDropped = document.getElementById(data);
  var dataAction = cartDropped.getAttribute('data-action');
  var isCardsPanel = ev.target.className.includes('smu-ha-cards-item-chooser-card') || (ev.target.getAttribute('draggable') && ev.target.parentElement.className.includes('smu-ha-cards-item-chooser-card'));
  var optionSelected = document.querySelector(`[value="${data}"]`);

  if (
    el.className.includes(dataAction) ||
    isCardsPanel
  ) {
    el.appendChild(cartDropped);

    if (isCardsPanel) {
      optionSelected.removeAttribute('disabled');
    } else {
      optionSelected.setAttribute('disabled', true);
    }

    if (!isCardsPanel) {
      var newCurrentCard = document.querySelector(`[data-action="${dataAction}"]`);
      newCurrentCard.classList.add('visible');
      cartDropped.classList.remove('visible');
      cardsConfig[dataAction].selector.value = newCurrentCard.getAttribute('data-id');
    }
  } else {
    console.log('NO se puede mover aca');
  }
}

function changeHandler(event) {
  if (event.target.checked) {
    cardsWrapper.classList.add('smu-ha-visible');
    if (cardsWrapperLineDividier) {
      cardsWrapperLineDividier.classList.add('smu-ha-visible');
    }
  } else {
    cardsWrapper.classList.remove('smu-ha-visible');
    if (cardsWrapperLineDividier) {
      cardsWrapperLineDividier.classList.remove('smu-ha-visible')
    }
  }
}

function selectorUpdated(event, chooser) {
  const currentCard = document.querySelector(`.smu-ha-cards-item-choose.visible[data-action="${chooser}"]`);
  const cardToSelect = document.querySelector(`.smu-ha-cards-item-choose[data-action="${chooser}"][data-id="${event.target.value}"]`);

  if (cardToSelect) {
    currentCard.classList.remove('visible');
    cardToSelect.classList.add('visible');
  }
}

function nextCard(chooser) {
  const currentCard = document.querySelector(`.smu-ha-cards-item-choose.visible[data-action="${chooser}"]`);
  const prevCard = currentCard && currentCard.previousElementSibling;
  const nextCard = currentCard && currentCard.nextElementSibling;

  if (nextCard) {
    currentCard.classList.remove('visible');
    nextCard.classList.add('visible');
    cardsConfig[chooser].selector.value = nextCard.getAttribute('data-id');
  }
}

function prevCard(chooser) {
  const currentCard = document.querySelector(`.smu-ha-cards-item-choose.visible[data-action="${chooser}"]`);
  const prevCard = currentCard && currentCard.previousElementSibling;
  const nextCard = currentCard && currentCard.nextElementSibling;

  if (prevCard) {
    currentCard.classList.remove('visible');
    prevCard.classList.add('visible');
    cardsConfig[chooser].selector.value = prevCard.getAttribute('data-id');
  }
}

/* function updateCard(chooser) {
  const dataSelected = `${chooser}-${cardsConfig[chooser].currentCard}`;
  cardsConfig[chooser].selector.value = dataSelected;
  const cardToHide = document.querySelector(`[data-id^="${chooser}"].visible`);
  cardToHide.classList.remove('visible');
  const cardToShow = document.querySelector(`[data-id="${dataSelected}"]`);
  cardToShow.classList.add('visible');
} */

function nextPage(page) {
  window.location.href = page;
}

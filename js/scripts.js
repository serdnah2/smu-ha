const cards = document.querySelectorAll(".smu-ha-cards-item-choose");
const cardsWrapper = document.querySelector('#smu-ha-cards');
const boardContent = document.querySelector('.smu-ha-board-item-content');
const cardsWrapperLineDividier = document.querySelector('.smu-ha-cards-line-dividier');
const categoriesList = document.querySelectorAll('#smu-ha-modal-request-categories div[name="categories"] button');
const categoryWrapper = document.querySelector('.smu-ha-details-category-description');
const emotionWrapper = document.querySelector('.smu-ha-previous-selection-wrapper .smu-ha-cards-item-choose-item');
const isGloberView = window.location.pathname.includes('glober');

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

if (categoriesList && categoriesList.length > 0) {
  categoriesList.forEach(category => {
    category.addEventListener('click', () => {
      category.classList.toggle('border-blue-cornflower');
      category.classList.toggle('bg-lavander');
      category.classList.toggle('smu-ha-category-active');
    });
  })
}

if (categoryWrapper) {
  if (localStorage.getItem('smu-ha-category-selected')) {
    categoryWrapper.innerHTML = localStorage.getItem('smu-ha-category-selected');
  }
}

if (emotionWrapper) {
  const emotions = ['Happy', 'Love', 'Surprise', 'Sad', 'Optimistic', 'Angry'];
  if (localStorage.getItem('smu-ha-emotion-selected') && localStorage.getItem('smu-ha-emotion-selected')) {
    const prefix = isGloberView ? '../' : '';
    let emotionSelected = Int(localStorage.getItem('smu-ha-emotion-selected')) || 0;
    emotionWrapper.innerHTML = `
      <span class="smu-ha-cards-item-choose-heading">${emotions[emotionSelected]}</span>
      <img src="${prefix}assets/emotions/emotion-${localStorage.getItem('smu-ha-emotion-selected')}.svg" alt="">
    `;
  }
}

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
  var isCardsPanel = el.className.includes('smu-ha-cards-item-chooser-card');
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


      if (dataAction === 'behavior') {
        const descriptionToShow = document.querySelector(`[data-description-id="${newCurrentCard.getAttribute('data-id')}"]`);
        const descriptionToHide = document.querySelector(`.smu-ha-card-description.visible`);

        if (descriptionToShow) {
          descriptionToShow.classList.add('visible');
        }

        if (descriptionToHide) {
          descriptionToHide.classList.remove('visible');
        }
      }

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

    if (chooser === 'behavior') {
      const descriptionToShow = document.querySelector(`[data-description-id="${event.target.value}"]`);
      const descriptionToHide = document.querySelector(`.smu-ha-card-description.visible`);

      if (descriptionToShow) {
        descriptionToShow.classList.add('visible');
      }

      if (descriptionToHide) {
        descriptionToHide.classList.remove('visible');
      }
    }
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

    if (chooser === 'behavior') {
      const descriptionToShow = document.querySelector(`[data-description-id="${nextCard.getAttribute('data-id')}"]`);
      const descriptionToHide = document.querySelector(`[data-description-id="${currentCard.getAttribute('data-id')}"]`);

      if (descriptionToShow) {
        descriptionToShow.classList.add('visible');
      }

      if (descriptionToHide) {
        descriptionToHide.classList.remove('visible');
      }
    }
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

    if (chooser === 'behavior') {
      const descriptionToShow = document.querySelector(`[data-description-id="${prevCard.getAttribute('data-id')}"]`);
      const descriptionToHide = document.querySelector(`[data-description-id="${currentCard.getAttribute('data-id')}"]`);

      if (descriptionToShow) {
        descriptionToShow.classList.add('visible');
      }

      if (descriptionToHide) {
        descriptionToHide.classList.remove('visible');
      }
    }
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

function openFeedbackPopUp() {
  const popup = document.querySelector('#smu-feedback-pop-up');

  if (popup) {
    popup.classList.toggle('opened');
  }
}

function openModal(modal) {
  const modalToOpen = document.querySelector(`#smu-ha-modal-request-${modal}`);
  const motelToClose = document.querySelector(`.suite-ui-modal.opened`);
  const popup = document.querySelector('#smu-feedback-pop-up');

  if (modalToOpen) {
    modalToOpen.classList.add('opened');
  }

  if (motelToClose) {
    motelToClose.classList.remove('opened');
  }

  if (popup) {
    popup.classList.remove('opened');
  }

  if (modal === 'completed') {
    const categorySelected = document.querySelector('.smu-ha-category-active');
    const emotionSelected = document.querySelector('#smu-ha-modal-request-categories .smu-ha-cards-item-choose.visible').getAttribute('data-id').replace('emotion-', '');
    localStorage.setItem('smu-ha-category-selected', categorySelected.innerHTML.trim());
    localStorage.setItem('smu-ha-emotion-selected', emotionSelected);
  }
}

function closeModal(modal) {
  const modalToClose = document.querySelector(`#smu-ha-modal-request-${modal}`);

  if (modalToClose) {
    modalToClose.classList.remove('opened');
  }
}

/* ---------- Selec Modal -------------- */

function openDropDownList(ev, dropDownWrapper) {
  const dropDown = document.querySelector(`#${dropDownWrapper}`);
  const dropDownList = document.querySelector(`#${dropDownWrapper} .smu-ha-dropdown-list-options`);
  dropDown.classList.toggle('select-v2--is-menu-open');
  dropDownList.classList.toggle('select-v2-menu--open');
}

function selectOption(optionSelected, dropDownWrapper) {
  const dropDown = document.querySelector(`#${dropDownWrapper}`);
  const dropDownList = document.querySelector(`#${dropDownWrapper} .smu-ha-dropdown-list-options`);
  dropDown.classList.toggle('select-v2--is-menu-open');
  dropDownList.classList.toggle('select-v2-menu--open');
  console.log(optionSelected);
}



export default class Card {
  constructor(page, cookieClass) {
    this.page = page;
    this.cookie = cookieClass;
  }

  // Возвращает подходящее состояние сообщения в карточке
  _getSaveMessageState() {
    const isLogged = this.cookie.getACookieValue('isLogged');
    // Конструкция сложная, но для поддержания, мне кажется, так понятнее, так как понятно,
    // что к какой странице отностися
    switch (this.page) {
      case 'main':
        if (isLogged === '1') {
          return {
            style: 'display: none',
            isLogged,
          };
        }
        return {
          style: '',
          isLogged,
          text: 'Войдите, чтобы сохранить',
        };

      case 'secondPage':
        return {
          style: '',
          isLogged,
          text: 'Убрать из сохраненных',
        };
    }
  }

  // Возвращает подходящее состояние кнопки на карточке
  _getSaveButtonState() {
    const isLogged = this.cookie.getACookieValue('isLogged');
    let toReturn = {};
    if (isLogged === '1') {
      toReturn = {
        disabled: '',
        isLogged,
      };
    } else {
      toReturn = {
        disabled: 'disabled',
        isLogged,
      };
    }
    if (this.page === 'main') {
      toReturn.class = 'card__button_add';
    } else {
      toReturn.class = 'card__button_delete';
    }
    return toReturn;
  }

  // Изменяет состояние кнопки на карточке при необходимости
  _setSaveButtonState() {
    const btnArr = document.querySelectorAll('.card__button_add');
    const status = this._getSaveButtonState();
    switch (status.isLogged) {
      case '1':
        btnArr.forEach((i) => {
          if (i.disabled) {
            i.removeAttribute('disabled');
          }
        });
        break;
      default:
        btnArr.forEach((i) => {
          if (!i.disabled) {
            const input = document.querySelector(`#${i.id}`);
            input.setAttribute('disabled', Boolean(status.disabled));
          }
        });
    }
  }

  // Изменяет состояние сообщения в карточке при необходимости
  _setSaveMessageState() {
    const messageArray = document.querySelectorAll('.card__message');
    const status = this._getSaveMessageState();
    messageArray.forEach((i) => {
      i.classList.remove(status.classToRemove);
      i.classList.add(status.class);
      i.style = status.style;
    });
  }

  // Собирает подходящую карточку на основе от переданных и опеределенных параметров
  renderCard(
    url,
    imgUrl,
    pubDate,
    title,
    description,
    source,
    orderNum,
    id = `a${Math.round((Math.random() / Math.random()) * 1000000000)}`,
    keyword,
  ) {
    const saveButton = this._getSaveButtonState();
    const saveMessage = this._getSaveMessageState();
    return `
      <a href="${url}" target="_blank" class="card" id="${orderNum}">
        <div class="card__main-part">

          <button ${saveButton.disabled} id=${id} type="button" class="card__button ${saveButton.class}"></button>
          <div style="${saveMessage.style}" class="card__message">${saveMessage.text}</div>

          <div ${this.page === 'main' ? 'style="display: none"' : ''} class="card__key-word">${keyword}</div>

          <img class="card__image" src="${imgUrl}" alt="Изображение новости">
          <p class="card__date">${pubDate}</p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">${description}</p>
        </div>
        <p class="card__source">${source}</p>

      </a>
    `;
  }

  // Вызывает совместно методы настройки карточки из вне
  setSaveButtonAndMessageState() {
    this._setSaveButtonState();
    this._setSaveMessageState();
  }

  // Устанавливает состояние кнопки сохранения при успешном нажатии
  setPushedButtonState(button) {
    if (button.classList.contains('card__button_add')) {
      button.classList.remove('card__button_add');
      button.classList.add('card__button_add-pushed');
    } else if (button.classList.contains('card__button_add-pushed')) {
      button.classList.remove('card__button_add-pushed');
      button.classList.add('card__button_add');
    }
    // if (button.classList.contains('card__button_add-pushed')) {
    //   button.classList.remove('card__button_add-pushed');
    //   button.classList.add('card__button_add');
    // }
  }
}

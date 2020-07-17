
export default class Card {
  constructor(cookieClass) {
    this.cookie = cookieClass;
  }

  _getSaveMessageState() {
    const isLogged = this.cookie.getACookieValue('isLogged');
    if (isLogged === '1') {
      return {
        class: 'save-checkbox__message_hide',
        style: '"display: none"',
        classToRemove: 'save-checkbox__message_show',
        isLogged,
      };
    }
    return {
      class: 'save-checkbox__message_show',
      style: '',
      classToRemove: 'save-checkbox__message_hide',
      isLogged,
    };
  }

  _getSaveCheckboxState() {
    const isLogged = this.cookie.getACookieValue('isLogged');
    if (isLogged === '1') {
      return {
        disabled: '',
        isLogged,
      };
    }
    return {
      disabled: 'disabled',
      isLogged,
    };
  }

  renderCard(
    url,
    imgUrl,
    pubDate,
    title,
    description,
    source,
    id = `a${Math.round((Math.random() / Math.random()) * 1000000000)}`,
  ) {
    return `
      <a href="${url}" target="_blank" class="card">
        <div class="card__main-part">
          <input ${this._getSaveCheckboxState().disabled} type="checkbox" class="save-checkbox save-checkbox_add" id="${id}">
          <label for="${id}" class="save-checkbox__lable"></label>
          <div style="${this._getSaveMessageState().style}" class="save-checkbox__message ${this._getSaveMessageState().class}">Войдите, чтобы сохранить</div>

          <img class="card__image" src="${imgUrl}" alt="Изображение новости">
          <p class="card__date">${pubDate}</p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">${description}</p>
        </div>
        <p class="card__source">${source}</p>

      </a>
    `;
  }

  _setSaveCheckboxState() {
    const checkboxArray = document.querySelectorAll('.save-checkbox');
    const status = this._getSaveCheckboxState();
    switch (status.isLogged) {
      case '1':
        checkboxArray.forEach((i) => {
          if (i.disabled) {
            i.removeAttribute('disabled');
          }
        });
        break;
      default:
        checkboxArray.forEach((i) => {
          if (!i.disabled) {
            const input = document.querySelector(`#${i.id}`);
            input.setAttribute('disabled', Boolean(status.disabled));
          }
        });
    }
  }

  _setSaveMessageState() {
    const checkboxArray = document.querySelectorAll('.save-checkbox__message');
    const status = this._getSaveMessageState();
    checkboxArray.forEach((i) => {
      i.classList.remove(status.classToRemove);
      i.classList.add(status.class);
      i.style = status.style;
    });
  }


  setCheckboxAndMessageState() {
    this._setSaveCheckboxState();
    this._setSaveMessageState();
  }
}

"use strict";
const header = document.querySelector('.header');
const headerForm = document.querySelector('.header__form');
const headersInput = document.querySelector('.header__input');
function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard)
        prevCard.remove();
}
function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`;
    header.insertAdjacentHTML('afterend', html);
}
// Отслеживаем отправку формы
headerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Отменяем отправку формы и обновление страницы
    let inputCity = headersInput.value.trim(); // Получаем название города
    // Делаем запрос на сервер
    const APIKEY = '1bcf45df148f431b87f120819250307';
    const URL = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${inputCity}`;
    fetch(URL).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.error) {
            removeCard();
            showError(data.error.message);
        }
        else {
            removeCard();
            // Разметка для карточки:
            const html = `
            <div class="card">
              <h2 class="card__city-name">${data.location.name} <span>${data.location.country.slice(0, 2).toUpperCase()}</span></h2>
              <div class="card__weather">
                <div class="card__temp">${Math.round(+data.current.temp_c)}℃</div>
                <img class="card__img" src="images/weather_icons/cloudy.svg" alt="Cloudy">
              </div>
              <div class="card__description bordered">${data.current.condition.text}</div>
            </div>
            `;
            header.insertAdjacentHTML('afterend', html);
        }
    });
});
//# sourceMappingURL=main.js.map
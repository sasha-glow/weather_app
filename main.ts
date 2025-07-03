

const header : HTMLElement = document.querySelector('.header') as HTMLElement;
const headerForm : HTMLFormElement = document.querySelector('.header__form') as HTMLFormElement;
const headersInput : HTMLInputElement = document.querySelector('.header__input') as HTMLInputElement;


function removeCard(): void {
    const prevCard : HTMLDivElement = document.querySelector('.card') as HTMLDivElement;
    if (prevCard) prevCard.remove();
}

function showError(errorMessage : string) : void {
    const html : string = `<div class="card">${errorMessage}</div>`;
    header.insertAdjacentHTML('afterend', html);
}


// Отслеживаем отправку формы
headerForm.addEventListener('submit', (e: Event) => {

    e.preventDefault(); // Отменяем отправку формы и обновление страницы

    let inputCity : string = headersInput.value.trim();// Получаем название города

    // Делаем запрос на сервер
    const APIKEY : string = '1bcf45df148f431b87f120819250307';
    const URL : string = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${inputCity}`;


    fetch(URL).then((response : Response) => {
        return response.json()
    }).then((data) => {
        if (data.error) {
            removeCard();
            showError(data.error.message)
        } else {
            removeCard();
            // Разметка для карточки:
            const html : string = `
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
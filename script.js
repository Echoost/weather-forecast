const form = document.querySelector('.main__form');
const input = document.querySelector('.main__input');
const heart = document.querySelector('.main__heart');
const list = document.querySelector('.main__list');
const ul = document.querySelector('.main__ul');
const citiesList = document.querySelector('.main__cities');
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
let cityName = '';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const degree = document.querySelector('.main__degree');
const city = document.querySelector('.main__city');
const img = document.querySelector('.main__img');
const cloud = 'img/cloud.png';
const snow = 'img/snowflake.png';
const clear = 'img/sun.png';
const rain = 'img/rain.png';

let dataBase = [];

// функция, изменяющая информацию погоды
const editElement = (town, degrees, weather) => {
    city.textContent = town;
    degree.textContent = degrees;
    img.src = weather
}

// функция добавляющая элемент в список избранных
const addElement = (element , city, nameOfClass) => {
    const newElement = document.createElement(element);
    newElement.className = nameOfClass;
    newElement.textContent = city;
    return newElement


}


const toShowElement = () => {
    const listName = document.querySelectorAll('.main__li');

    const showElement = (event) => {
        event.preventDefault();
        const getText = event.target.textContent;
        getWeatherOptinons(getText);

    }

    listName.forEach((item) => {
        item.addEventListener('click', showElement);
    })
}

const toDeleteElement = () => {
    const closeElement = document.querySelectorAll('.main__close');

    closeElement.forEach((item, i) => {
        item.addEventListener('click', (parent) => {
            parent.preventDefault();
            const block = parent.target.parentNode;
            dataBase.splice(i - 1, 1);
            block.remove()
        });
    })

    
}



const toMakeNewElement = () => {
    const block = addElement('div', '', "main__cities");
    ul.appendChild(block);

    const nameOfCity = addElement('li', toFirstUppercase(input.value), 'main__li');
    block.appendChild(nameOfCity)

    const close = addElement('div', '', 'main__close')
    block.appendChild(close);

   toDeleteElement();
   toShowElement()
}

const addLocation = (event) => {
    event.preventDefault();
    
    for (let i = 0; i < dataBase.length; i++) {
        if (dataBase[i] === input.value) return
    }
    
    dataBase[dataBase.length] = input.value;
    toMakeNewElement();  
    
}

const toFirstUppercase = (elem) => {
    return elem[0].toUpperCase() + elem.slice(1);
}

const getWeatherOptinons = (value) => {
    fetch(`${serverUrl}?q=${value}&appid=${apiKey}`)
        .then(result => result.json())
        .then(data => {
            let elements;
            switch(data.weather[0].main) {
                case 'Clouds':
                    elements = cloud;
                    break;
                case 'Snow':
                    elements = snow;
                    break;
                case 'Clear':
                    elements = clear;
                    break;
                case 'Rain':
                    elements = rain;
                    break;
                case 0:
                    throw new Error('Введен не существующий поселок')
            }
            editElement(toFirstUppercase(value), Math.round(data.main.temp - 273), elements);
            
        });
}

const addWeather = (event) => {
    event.preventDefault();
    getWeatherOptinons(input.value);
    heart.addEventListener('click', addLocation)
}
 



form.addEventListener('submit', addWeather);


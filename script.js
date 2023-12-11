const form = document.querySelector('.main__form');
const input = document.querySelector('.main__input');
const heart = document.querySelector('.main__heart');
const list = document.querySelector('.main__list');
const ul = document.querySelector('.main__ul');
const time = document.querySelectorAll('.main__time');
const temperature = document.querySelectorAll('.temperature');
const futureImg = document.querySelectorAll('.main__temp__img');
const feelings = document.querySelectorAll('.feelings');
const citiesList = document.querySelector('.main__cities');
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const serverUrlForTime = 'https://api.openweathermap.org/data/2.5/forecast';
let cityName = '';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const degree = document.querySelector('.main__degree');
const city = document.querySelector('.main__city');
const img = document.querySelector('.main__img');
const feels = document.getElementById('feels');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const cloud = 'img/cloud.png';
const snow = 'img/snowflake.png';
const clear = 'img/sun.png';
const rain = 'img/rain.png';

let dataBase = [];
let elements;

// когда пользователь вводит данные, вызывается данная функция
const addWeather = (event) => {
    event.preventDefault();
    getWeatherOptinons(input.value);
   
}



const getDate = (time) => {
    const toUTC = new Date(time * 1000) ;
    const hours = toUTC.getHours();
    const minutes = toUTC.getMinutes();
    const date = `${hours}:${minutes}`
    return date
}


// функция которая вывводит данные 
const getWeatherOptinons = (value) => {
    fetch(`${serverUrlForTime}?q=${value}&appid=${apiKey}`)
        .then(result => result.json())
        .then(data => {
            
            console.log(data);

            editImg(data.list[0].weather[0].main);
            editElement(toFirstUppercase(value), Math.round(data.list[0].main.temp - 273), elements, Math.round(data.list[0].main.feels_like - 273), getDate(data.city.sunrise), getDate(data.city.sunset));
            editFutureElements(data);

        });
}

const editImg = (data) => {
    switch(data) {
        case 'Clouds':
            elements = cloud;
            return elements;
        case 'Snow':
            elements = snow;
            return elements;
        case 'Clear':
            elements = clear;
            return elements;
        case 'Rain':
            elements = rain;
            return elements;
        case 0:
            throw new Error('Введен не существующий поселок')
    }
}

// функция, изменяющая информацию погоды
const editElement = (setCity, setDegree, setImg, setFeels, setSunrice, setSunset) => {
    city.textContent = setCity;
    degree.textContent = setDegree;
    img.src = setImg;
    feels.textContent = setFeels;
    sunrise.textContent = setSunrice;
    sunset.textContent = setSunset
}


// функция меняющая информацию будущих прогнозов
const editFutureElements = (data) => {
    const Data = data
    for(let i = 0; i < 3; i++) {
        time[i].textContent = (getDate(Data.list[i].dt)+'0');
    }

    for(let i = 0; i < 3; i++) {
        temperature[i].textContent = Math.round(Data.list[i].main.temp - 273);
    }

    for(let i = 0; i < 3; i++) {
        feelings[i].textContent = Math.round(Data.list[i].main.feels_like - 273);
    }
    
    for(let i = 0; i < 3; i++) {
        futureImg[i].src = editImg(Data.list[i].weather[0].main);
        console.log(editImg(Data.list[i].weather[0].main));
    }
    
}


// при клике на сердечко происходит проверка города, если нету в массиве, то он добавляется
const addLocation = (event) => {
    event.preventDefault();
    console.log(dataBase);
    
    if (dataBase.includes(input.value) === true) return
    
    
    dataBase[dataBase.length] = input.value;
    toMakeNewElement();  
    
}

// добавляет в список добавленных городов
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

//показывает элемент при клике на него
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

// удаляет элемент из списка избранных
const toDeleteElement = () => {
    const closeElement = document.querySelectorAll('.main__close');

    closeElement.forEach((item, i) => {
        item.addEventListener('click', (parent) => {
                parent.preventDefault();
                const block = parent.target.parentNode;
                dataBase.splice(i, 1);
                console.log(dataBase); 
                block.remove()
        });

    })
    
}

// функция добавляющая элемент в список избранных
const addElement = (element , city, nameOfClass) => {
    const newElement = document.createElement(element);
    newElement.className = nameOfClass;
    newElement.textContent = city;
    return newElement
}

// делает первую букву заглавной
const toFirstUppercase = (elem) => {
    return elem[0].toUpperCase() + elem.slice(1);
}

heart.addEventListener('click', addLocation)
form.addEventListener('submit', addWeather);

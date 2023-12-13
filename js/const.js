export const ELEMENTS = {
        FORM: document.querySelector('.main__form'),
        INPUT: document.querySelector('.main__input'),
        HEART: document.querySelector('.main__heart'),
        TIME: document.querySelectorAll('.main__time'),
        TEMPERATURE: document.querySelectorAll('.temperature'),
        FUTURE_IMG: document.querySelectorAll('.main__temp__img'),
        FEELINGS: document.querySelectorAll('.feelings'),
        DEGREE: document.querySelector('.main__degree'),
        CITY: document.querySelector('.main__city'),
        IMG: document.querySelector('.main__img'),
        FEELS: document.getElementById('feels'),
        SUNRISE: document.getElementById('sunrise'),
        SUNSET: document.getElementById('sunset'),
        UL: document.querySelector('.main__ul')
}

export const API = {

    SERVER_URL: 'https://api.openweathermap.org/data/2.5/forecast',
    API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f'

}

export const WEATHER = {
    CLOUD: 'img/cloud.png',
    SNOW: 'img/snowflake.png',
    CLEAR: 'img/sun.png',
    RAIN: 'img/rain.png'
}

export const ERROR = {
    CORRECT_NAME: "Please, enter a correct name",
    ENTER_NAME: "Please, enter name"
}


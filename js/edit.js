// функция, изменяющая информацию погоды
import { ELEMENTS, WEATHER } from "./const.js";
import { getDate } from "./constuctors.js";
export { editElement, editFutureElements, editImg };

const editElement = (setCity, setDegree, setImg, setFeels, setSunrice, setSunset) => {
    ELEMENTS.CITY.textContent = setCity;
    ELEMENTS.DEGREE.textContent = setDegree;
    ELEMENTS.IMG.src = setImg;
    ELEMENTS.FEELS.textContent = setFeels;
    ELEMENTS.SUNRISE.textContent = setSunrice;
    ELEMENTS.SUNSET.textContent = setSunset
}


// функция меняющая информацию будущих прогнозов
const editFutureElements = (data) => {
    const Data = data
    for(let i = 0; i < 3; i++) {
        ELEMENTS.TIME[i].textContent = (getDate(Data.list[i].dt)+'0');
    }

    for(let i = 0; i < 3; i++) {
        ELEMENTS.TEMPERATURE[i].textContent = Math.round(Data.list[i].main.temp - 273);
    }

    for(let i = 0; i < 3; i++) {
        ELEMENTS.FEELINGS[i].textContent = Math.round(Data.list[i].main.feels_like - 273);
    }
    
    for(let i = 0; i < 3; i++) {
        ELEMENTS.FUTURE_IMG[i].src = editImg(Data.list[i].weather[0].main);
    }
    
}




const editImg = (data) => {
    let elements;
    switch(data) {
        case 'Clouds':
            elements = WEATHER.CLOUD;
            return elements;
        case 'Snow':
            elements = WEATHER.SNOW;
            return elements;
        case 'Clear':
            elements = WEATHER.CLEAR;
            return elements;
        case 'Rain':
            elements = WEATHER.RAIN;
            return elements;
    }
}

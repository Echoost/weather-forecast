import { ELEMENTS, API, ERROR} from './const.js';
import { editElement, editFutureElements, editImg } from './edit.js';
import { addLocation } from './favorites.js';
import { toFirstUppercase, getDate } from './constuctors.js';
export let inputValue;

// когда пользователь вводит данные, вызывается данная функция
const addWeather = (event) => {
    inputValue = ELEMENTS.INPUT.value;
    event.preventDefault();
    getWeatherOptions(inputValue);
    
}

export async function getWeatherOptions (value) {
    const responce = await fetch(`${API.SERVER_URL}?q=${value}&appid=${API.API_KEY}`)
    console.log(responce);
    switch (responce.status) {
        case 400:
            alert(ERROR.ENTER_NAME);
            break;
        case 404:
            alert(ERROR.CORRECT_NAME);
            break;
    }
    const data = await responce.json();    
    editElement(toFirstUppercase(value), Math.round(data.list[0].main.temp - 273), editImg(data.list[0].weather[0].main), Math.round(data.list[0].main.feels_like - 273), getDate(data.city.sunrise), getDate(data.city.sunset));
    editFutureElements(data);
        
        
}

ELEMENTS.HEART.addEventListener('click', addLocation)
ELEMENTS.FORM.addEventListener('submit', addWeather);
export {addLocation, toDeleteElement, toShowElement}
import { getWeatherOptions, inputValue } from './main.js';
import { addElement, toFirstUppercase } from './constuctors.js';
import { ELEMENTS } from './const.js';
import { updateLocalStorage, loadLocalStorage, loadSavedCities } from './storage.js';
let dataBase = [];
let closeElement;
let listName;

loadLocalStorage(dataBase);


const addLocation = (event) => {
    event.preventDefault();
    

    if (dataBase.includes(inputValue) === true) return
    dataBase.push(inputValue);
    updateLocalStorage(dataBase);
    toMakeNewElement();

}

const toMakeNewElement = () => {
    const block = addElement('div', '', "main__cities");
    ELEMENTS.UL.appendChild(block);

    const nameOfCity = addElement('li', toFirstUppercase(inputValue), 'main__li');
    block.appendChild(nameOfCity)

    const close = addElement('div', '', 'main__close')
    block.appendChild(close);

    toDeleteElement();
    
    toShowElement();

}

const deleteElement = (parent) => {
    parent.preventDefault();
    const block = parent.target.parentNode;
    const index = Array.from(closeElement).indexOf(parent.target);
    dataBase.splice(index, 1);
    updateLocalStorage(dataBase);
    block.remove()
}
// удаляет элемент из списка избранных
const toDeleteElement = () => {
closeElement = document.querySelectorAll('.main__close');

closeElement.forEach((item) => {
    item.addEventListener('click', deleteElement , {useCapture: true});
    })
}

const showElement = (event) => {
    event.preventDefault();
    const getText = event.target.textContent;
    getWeatherOptions(getText);
    
}
//показывает элемент при клике на него
const toShowElement = () => {
    listName = document.querySelectorAll('.main__li');
    listName.forEach((item) => {
        item.addEventListener('click', showElement, {useCapture: true});
    })
    
    
    
}
loadSavedCities(dataBase);


const a = [1];
a.splice(0,1)
console.log(a)
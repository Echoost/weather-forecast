export {addLocation, toDeleteElement, toShowElement}
import { getWeatherOptions, inputValue } from './main.js';
import { addElement, toFirstUppercase } from './constuctors.js';
import { ELEMENTS } from './const.js';
import { updateLocalStorage, loadLocalStorage, loadSavedCities } from './storage.js';
const dataBase = new Set();
let closeElement;
let listName;

loadLocalStorage(dataBase);

const addLocation = (event) => {
    event.preventDefault();
    if (dataBase.has(inputValue) === true) return
    dataBase.add(inputValue);
    updateLocalStorage(dataBase);
    toMakeNewElement();
    console.log(dataBase)
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

export const getValueByIndex = (set, index) => {
    let counter = 0
    let result;

    for (let value of set) {
        if (counter === index) {
            result = value
            break
        }
        counter++
    }
    return result
}

const deleteElement = (parent) => {
    parent.preventDefault();
    const block = parent.target.parentNode;
    const index = Array.from(closeElement).indexOf(parent.target);
    const elementToDelete = getValueByIndex(dataBase, index);
    console.log(elementToDelete);
    dataBase.delete(elementToDelete);
    updateLocalStorage(dataBase);
    block.remove()
    closeElement = document.querySelectorAll('.main__close');
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



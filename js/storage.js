import { ELEMENTS } from "./const.js";
import { addElement, toFirstUppercase } from "./constuctors.js";
import { toDeleteElement, toShowElement } from "./favorites.js";
export const loadLocalStorage = (data) => {
    if (!localStorage.getItem('city')) return;
    const savedCities = JSON.parse(localStorage.getItem('city'));
    for(let i = 0; i < savedCities.length; i++) {
        data.add(savedCities[i]);
    }
    return data;
}

export const updateLocalStorage = (data) => {
    localStorage.setItem('city', JSON.stringify([...data]));
}

export const loadSavedCities = (data) => {
    const toArrayData = JSON.parse(JSON.stringify([...data]));
    for (let i = 0; i < toArrayData.length; i++) {
        const block = addElement('div', '', "main__cities");
        ELEMENTS.UL.appendChild(block);

        const nameOfCity = addElement('li', toFirstUppercase(toArrayData[i]), 'main__li');
        block.appendChild(nameOfCity)

        const close = addElement('div', '', 'main__close');
        block.appendChild(close);

        toDeleteElement();
    
        toShowElement();
    }
}
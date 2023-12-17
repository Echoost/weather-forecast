export {getDate, addElement, toFirstUppercase};
const getDate = (time) => {
    const toUTC = new Date(time * 1000) ;
    const hours = toUTC.getHours();
    const minutes = toUTC.getMinutes();
    const date = `${hours}:${minutes}`
    return date
}


// добавляет в список добавленных городов


// функция добавляющая элемент в список избранных
const addElement = (element , city, nameOfClass) => {
    const newElement = document.createElement(element);
    newElement.className = nameOfClass;
    newElement.textContent = city;
    return newElement
}

const toFirstUppercase = (elem) => {
    return elem[0].toUpperCase() + elem.slice(1);
}
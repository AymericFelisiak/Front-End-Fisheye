import { photographerFactory } from "../factories/photographer.js";

const firstFocusable = document.querySelector('#home');
let activeIndex = 0;
let focusableElements;

// Fetch photographers datas in json file
async function getPhotographers() {
    let photographers = await fetch("./data/photographers.json").then(dataSet => {
            if(!dataSet.ok) {
                throw new Error('File path incorrect');
            }
            return dataSet.json();
        }
    ).catch(error => 
        console.error('Fetch error : ', error)
    );
    return photographers;
}

// Creates every photographers' cards
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
    focusableElements = document.querySelectorAll('a');
    document.addEventListener('keydown', handleFocus);  
}

function handleFocus(e) {
    if(!(e.key == 'Tab') && !(e.key == 'ArrowLeft') && !(e.key == 'ArrowRight')) {
        return;
    }
    e.preventDefault();
    if(activeIndex == 0 && document.activeElement != firstFocusable) {
        firstFocusable.focus();
    }   
    else {
        if((e.key == 'Tab' && e.shiftKey == true) || (e.key == 'ArrowLeft')) {
            if(activeIndex > 0) {
                activeIndex--;
                focusableElements[activeIndex].focus();
            }
            else {
                activeIndex = focusableElements.length - 1;
                focusableElements[activeIndex].focus();
            }
        }
        else {  // If Tab or ArrowRight
            if(activeIndex < focusableElements.length - 1) {
                activeIndex++;
                focusableElements[activeIndex].focus();
            }
            else {
                firstFocusable.focus();
                activeIndex = 0;
            }
        }
    }
}

init();


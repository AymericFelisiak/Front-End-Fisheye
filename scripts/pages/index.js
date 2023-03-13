let activeIndex = 0;
const firstFocusable = document.querySelector("[tabindex='0']");
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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerFactory(photographer, undefined, 'index');
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes  
    const { photographers } = await getPhotographers();
    displayData(photographers);
    focusableElements = document.querySelectorAll('a');
    document.addEventListener('keydown', handleTabKeyDefault);  
}

function handleTabKeyDefault(e) {
    if(!(e.key == 'Tab') && !(e.key == 'ArrowLeft') && !(e.key == 'ArrowRight')) {
        return;
    }
    e.preventDefault();
    if(activeIndex == 0 && document.activeElement != firstFocusable) {
        this.activeElement = firstFocusable;
        firstFocusable.focus();
    }   
    else {
        if((e.key == 'Tab' && e.shiftKey == true) || (e.key == 'ArrowLeft')) {
            if(activeIndex > 0) {
                activeIndex--;
                focusableElements[activeIndex].focus();
            }
        }
        else {  // If Tab or ArrowRight
            if(activeIndex < focusableElements.length - 1) {
                activeIndex++;
                focusableElements[activeIndex].focus();
            }
        }
    }
}

init();


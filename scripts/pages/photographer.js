// Retrieves photographer id in URL
const url = window.location.search;
const urlParameter = new URLSearchParams(url);
const photographerId = urlParameter.get('photographer_id');
let photographer;

//DOM elements
const sortPopularity = document.querySelector('#popularity');
const sortDate = document.querySelector('#date');
const sortTitle = document.querySelector('#title');

// Event listeners
sortPopularity.addEventListener('focus', handleDropdownFocus);
sortTitle.addEventListener('focusout', handleDrowndownFocusOut);
document.addEventListener('keydown', handleEnterKey);

// Expands dropmenu when popularity button is focused
function handleDropdownFocus() {
    const chevronDown = document.querySelector('.fa-chevron-down');
    const chevronUp = document.querySelector('.fa-chevron-up');
    const dropDownContent = document.querySelector('.dropdown-content');

    chevronDown.style.display = "none";
    chevronUp.style.display = "block";
    dropDownContent.style.display = "block";
}

// Retracts dropmenu when title button is unfocused
function handleDrowndownFocusOut() {
    const chevronDown = document.querySelector('.fa-chevron-down');
    const chevronUp = document.querySelector('.fa-chevron-up');
    const dropDownContent = document.querySelector('.dropdown-content');

    chevronDown.style.display = "block";
    chevronUp.style.display = "none";
    dropDownContent.style.display = "none";
}

// Handles enter keypress on medias
function handleEnterKey(e) {
    if(e.key == 'Enter' && document.activeElement.tagName == 'DIV') {
        document.activeElement.click();
    }
}

// Gets photographer by id
async function getPhotographer() {
    
    let photographerData = await fetch("./data/photographers.json").then(dataSet => {
            if(!dataSet.ok) {
                throw new Error('File path incorrect');
            }
            return dataSet.json().then(data => {
                for(const photographer of data.photographers) {
                    if(photographer.id == photographerId) {
                        return photographer;
                    }
                }
            })
        }
    ).catch(error => 
        console.error('Fetch error : ', error)
    );
    return photographerData;
}

// Gets photographers medias 
async function getMedias() {
    const medias = [];
    await fetch("./data/photographers.json").then(dataSet => {
            if(!dataSet.ok) {
                throw new Error('File path incorrect');
            }
            return dataSet.json().then(data => {
                for(const media of data.media) {
                    if(media.photographerId == photographerId) {
                        medias.push(media);
                    }
                }
            })
        }
    ).catch(error => 
        console.error('Fetch error : ', error)
    );
    return medias;
}

async function init() {
    const photographerData  = await getPhotographer();
    const medias = await getMedias();
    photographer = new PhotographerFactory(photographerData, medias, 'profile');
    photographer.getProfilePage();
    sortPopularity.addEventListener("click", function() {
        photographer.sortByPopularity();
    });

    sortTitle.addEventListener("click", function() {
        photographer.sortByTitle();
    });
    sortDate.addEventListener("click", function() {
        photographer.sortByDate();
    });
}

init();

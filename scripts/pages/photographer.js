// Retrieves photographer id in URL
const url = window.location.search;
const urlParameter = new URLSearchParams(url);
const photographerId = urlParameter.get('photographer_id');
let photographer;

//DOM elements
const sortPopularity = document.querySelector('#popularity');
const sortDate = document.querySelector('#date');
const sortTitle = document.querySelector('#title');

// Handles enter keypress
document.addEventListener('keydown', handleEnterKey);

// Defines what does enter key when pressed
// Fires event of the focused element
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

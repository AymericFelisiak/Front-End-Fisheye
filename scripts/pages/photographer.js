// Récupère l'id du photographe passé dans l'URL
const url = window.location.search;
const urlParameter = new URLSearchParams(url);
const photographerId = urlParameter.get('photographer_id');
let photographer;

//Eléments DOM
const sortPopularity = document.querySelector('#popularity');
const sortDate = document.querySelector('#date');
const sortTitle = document.querySelector('#title');

//Event listener

// Récupère le photographe par rapport à l'id
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

// Récupère les médias du photographe
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

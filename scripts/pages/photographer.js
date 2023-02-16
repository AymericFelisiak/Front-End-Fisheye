// Récupère l'id du photographe passé dans l'URL
const url = window.location.search;
const urlParameter = new URLSearchParams(url);
const photographerId = urlParameter.get('photographer_id');

// Récupère le photographe par rapport à l'id
async function getPhotographer() {
    
    let photographer = await fetch("./data/photographers.json").then(dataSet => {
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
    return photographer;
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

async function displayData(photographer, medias) {
    const profileHeader = document.querySelector(".photograph-header");
    const factory = new photographerFactory(photographer, medias, 'profile');
    const profileHeaderInfos = factory.getProfileInformationsDOM();
    const {div, button, img} = profileHeaderInfos;
    console.log(profileHeaderInfos);
    profileHeader.appendChild();
}

async function init() {
    const photographer  = await getPhotographer();
    const medias = await getMedias();
    displayData(photographer, medias);
}

init();

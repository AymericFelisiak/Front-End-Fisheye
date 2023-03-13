// Retrieves photographer id in URL
const url = window.location.search;
const urlParameter = new URLSearchParams(url);
const photographerId = urlParameter.get('photographer_id');
let photographer;

//DOM elements
const dropDownMenu = document.querySelector('.dropdown-menu');
const sortPopularity = document.querySelector('#popularity');
const sortDate = document.querySelector('#date');
const sortTitle = document.querySelector('#title');

// Event listeners
dropDownMenu.addEventListener('mouseover', ariaExpandedTrue);
dropDownMenu.addEventListener('mouseout', ariaExpandedFalse);
sortPopularity.addEventListener('focus', expandMenu);
// sortTitle.addEventListener('blur', retractMenu);
document.addEventListener('keydown', handleEnterKey);

function ariaExpandedTrue() {
    dropDownMenu.setAttribute('aria-expanded', 'true');
}

function ariaExpandedFalse() {
    dropDownMenu.setAttribute('aria-expanded', 'false');
}

// Expands dropmenu when popularity button is focused
function expandMenu() {
    const chevronDown = document.querySelector('.fa-chevron-down');
    const chevronUp = document.querySelector('.fa-chevron-up');
    const dropDownContent = document.querySelector('.dropdown-content');

    ariaExpandedTrue();

    chevronDown.style.display = "none";
    chevronUp.style.display = "block";
    dropDownContent.style.display = "block";
}

// Retracts dropmenu when title button is unfocused
// function retractMenu() {
//     const chevronDown = document.querySelector('.fa-chevron-down');
//     const chevronUp = document.querySelector('.fa-chevron-up');
//     const dropDownContent = document.querySelector('.dropdown-content');

//     ariaExpandedFalse();

//     chevronDown.removeAttribute('style');
//     chevronUp.removeAttribute('style');
//     dropDownContent.removeAttribute('style');
// }

// Handles enter keypress on medias
function handleEnterKey(e) {
    if(e.key == 'Enter' && document.activeElement.tagName == 'DIV') {
        document.activeElement.click();
    }
}

function sortByPopularity() {
    photographer.getPhotographerMedias.sort(likesComparator);
    removeMedia();
    photographer.getMedia();
}

function sortByDate() {
    photographer.getPhotographerMedias.sort(dateComparator);
    removeMedia();
    photographer.getMedia();
}

function sortByTitle() {
    photographer.getPhotographerMedias.sort(titleComparator);
    removeMedia();
    photographer.getMedia();
}

function likesComparator(a, b) {
    return parseInt(b.likes, 10) - parseInt(a.likes, 10);
}

function titleComparator(a, b) {
    if(a.title < b.title) {
        return -1;
    }
    if(a.title > b.title) {
        return 1;
    }
    return 0;
}

function dateComparator(a, b) {
    return new Date(a.date) - new Date(b.date);
}

// Function called in listener when like button under a media is clicked
function handleLike(node) {
    const totalLikes = document.querySelector('.total-likes');
    const like = parseInt(node.textContent, 10) + 1;
    const p = node.querySelector('p');
    photographer.totalLikes++;
    totalLikes.textContent = photographer.getTotalLikes;
    p.textContent = like;
}

// Removes media from lightbox
function removeMedia() {
    const mediaWrapper = document.querySelector('.media-wrapper');
    while(mediaWrapper.firstChild) {
        mediaWrapper.removeChild(mediaWrapper.lastChild);
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
        sortByPopularity();
        retractMenu();
    });

    sortTitle.addEventListener("click", function() {
        sortByTitle();
        retractMenu();
    });
    sortDate.addEventListener("click", function() {
        sortByDate();
        retractMenu();
    });
}

init();

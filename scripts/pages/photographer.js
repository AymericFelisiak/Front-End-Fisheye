import { createLightbox } from "../utils/lightbox.js";
import { photographerFactory } from "../factories/photographer.js";
import { profileFactory } from "../factories/profile.js";
import { displayModal } from "../utils/contactForm.js";

export let medias;
const firstFocusable = document.querySelector('#home');
let focusableElements;
let activeIndex = 0;

// Retrieves photographer id in URL
const url = window.location.search;
const urlParameter = new URLSearchParams(url);
const photographerId = urlParameter.get('photographer_id');

//DOM elements
const dropDownMenu = document.querySelector('.dropdown-menu');
const sortPopularity = document.querySelector('#popularity');
const sortDate = document.querySelector('#date');
const sortTitle = document.querySelector('#title');
const contactButton = document.querySelector('.contact-button');

// Listeners
contactButton.addEventListener('click', displayModal);
dropDownMenu.addEventListener('mouseover', ariaExpandedTrue);
dropDownMenu.addEventListener('mouseout', ariaExpandedFalse);
sortPopularity.addEventListener('focus', expandMenu);

// Sets aria-expanded to true when the dropdown menu is expanded
function ariaExpandedTrue() {
    dropDownMenu.setAttribute('aria-expanded', 'true');
}

// Sets aria-expanded to false when the drop downmenu is collapsed
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
function retractMenu() {
    const chevronDown = document.querySelector('.fa-chevron-down');
    const chevronUp = document.querySelector('.fa-chevron-up');
    const dropDownContent = document.querySelector('.dropdown-content');

    ariaExpandedFalse();

    chevronDown.removeAttribute('style');
    chevronUp.removeAttribute('style');
    dropDownContent.removeAttribute('style');
}

// Handles enter keypress on medias
function handleEnterKey(e) {
    if (e.key == 'Enter' && document.activeElement.tagName == 'DIV') {
        document.activeElement.click();
    }
}

function sortByPopularity() {
    medias.sort(likesComparator);
    removeMedia();
    updateMedia();
}

function sortByDate() {
    medias.sort(dateComparator);
    removeMedia();
    updateMedia();
}

function sortByTitle() {
    medias.sort(titleComparator);
    removeMedia();
    updateMedia();
}

function likesComparator(a, b) {
    return parseInt(b.likes, 10) - parseInt(a.likes, 10);
}

function titleComparator(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

function dateComparator(a, b) {
    return new Date(a.date) - new Date(b.date);
}

function addLike(id) {
    medias.forEach(media => {
        if(media.id == id) {
            media.likes++;
        }
    });
}

// Function called in listener when like button under a media is clicked
export function handleLike() {
    const totalLikesElement = document.querySelector('.total-likes');
    const totalLikes = parseInt(totalLikesElement.textContent, 10) + 1;
    const like = parseInt(this.textContent, 10) + 1;
    const p = this.querySelector('p');
    const id = this.parentElement.parentElement.querySelector('[id]').id;
    addLike(id);
    totalLikesElement.textContent = totalLikes;
    p.textContent = like;
}

// Handles keyboard events for the focus in the profile page
function handleFocus(e) {
    if (!(e.key == 'Tab') && !(e.key == 'ArrowLeft') && !(e.key == 'ArrowRight')) {
        return;
    }
    e.preventDefault();
    if (activeIndex == 0 && document.activeElement != firstFocusable) {
        firstFocusable.focus();
    }
    else {
        if ((e.key == 'Tab' && e.shiftKey == true) || (e.key == 'ArrowLeft')) {
            if (activeIndex > 0) {
                activeIndex--;
                focusableElements[activeIndex].focus();
            }
            else {
                activeIndex = focusableElements.length - 1;
                focusableElements[activeIndex].focus();
            }
        }
        else {  // If Tab or ArrowRight
            if (activeIndex < focusableElements.length - 1) {
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

export function createKeyboardEvents() {
    document.addEventListener('keydown', handleEnterKey);
    document.addEventListener('keydown', handleFocus);
}

export function removeDocumentKeyboardEvents() {
    document.removeEventListener('keydown', handleEnterKey);
    document.removeEventListener('keydown', handleFocus);
}

function getFocusableElements() {
    return document.querySelectorAll("#home, #contact, .navbutton, .media-image-wrapper");
}

// Removes media from lightbox
function removeMedia() {
    const mediaWrapper = document.querySelector('.media-wrapper');
    while (mediaWrapper.firstChild) {
        mediaWrapper.removeChild(mediaWrapper.lastChild);
    }
}

// Retrieves every media in the grid and passes each node to a function creating the Listener
function createLightboxEvent() {
    const grid = document.querySelectorAll('.media-image-wrapper');
    let i = 0;
    grid.forEach(media => {
        addLightboxListener(i, media);
        i++;
    });
}

function createLikeEvent() {
    const likeDivs = document.querySelectorAll('.media-image-likes');
    likeDivs.forEach(div => {
        div.addEventListener('click', handleLike, { once: true })
    }
    );
}

// Links EventListener to the node
function addLightboxListener(i, node) {
    const { title, video, image } = medias[i];
    const path = getPath(video, image);
    node.addEventListener('click', function () {
        createLightbox(title, path, video, i);
    });
}

// Creates image/video path and returns it
function getPath(video, image) {
    if (video == undefined) {
        return `assets/images/${photographerId}/${image}`;
    }
    else return `assets/images/${photographerId}/${video}`;
}

// Updating media galery after sort
function updateMedia() {
    const mediaWrapper = document.querySelector('.media-wrapper');

    medias.forEach(media => {
        const profileModel = profileFactory(media);
        const thumbnail = profileModel.getThumbnail();
        mediaWrapper.appendChild(thumbnail);
    });
}

// Gets photographer by id
async function getPhotographer() {

    let photographerData = await fetch("./data/photographers.json").then(dataSet => {
        if (!dataSet.ok) {
            throw new Error('File path incorrect');
        }
        return dataSet.json().then(data => {
            for (const photographer of data.photographers) {
                if (photographer.id == photographerId) {
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
        if (!dataSet.ok) {
            throw new Error('File path incorrect');
        }
        return dataSet.json().then(data => {
            for (const media of data.media) {
                if (media.photographerId == photographerId) {
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

// Displays total likes and price per day for the photographer
async function displayTotalLikes(totalLikes) {
    const likeDiv = document.querySelector(".photographer-like-wrapper");
    const like = document.querySelector(".total-likes");
    
    const heart = document.createElement("i");

    heart.setAttribute("class", "fa-solid fa-heart")
    likeDiv.appendChild(heart);

    like.textContent = totalLikes;
}

// Displays profile data after fetch
async function displayData(photographer) {
    const mediaWrapper = document.querySelector('.media-wrapper');
    const photographerModel = photographerFactory(photographer);
    photographerModel.getProfileInformationsDOM();

    let totalLikes = 0;

    medias.forEach(media => {
        const profileModel = profileFactory(media);
        const thumbnail = profileModel.getThumbnail();
        totalLikes = totalLikes + parseInt(profileModel.likes, 10);
        mediaWrapper.appendChild(thumbnail);
    });
    displayTotalLikes(totalLikes);
}

async function init() {
    const photographerData = await getPhotographer();
    medias = await getMedias();
    displayData(photographerData);
    focusableElements = getFocusableElements();

    sortPopularity.addEventListener("click", function () {
        sortByPopularity();
        focusableElements = getFocusableElements();
        createLightboxEvent();
        createLikeEvent();
        retractMenu();
    });

    sortTitle.addEventListener("click", function () {
        sortByTitle();
        focusableElements = getFocusableElements();
        createLightboxEvent();
        createLikeEvent();
        retractMenu();
    });
    sortDate.addEventListener("click", function () {
        sortByDate();
        focusableElements = getFocusableElements();
        createLightboxEvent();
        createLikeEvent();
        retractMenu();
    });
    createKeyboardEvents();
    createLightboxEvent();
    createLikeEvent();
}

init();

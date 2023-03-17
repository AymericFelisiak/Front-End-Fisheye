import {createKeyboardEvents} from "/scripts/pages/photographer.js";
import {removeDocumentKeyboardEvents} from "/scripts/pages/photographer.js";

// Current index (in the medias array)
let index; 

// All the medias of the photographer
let medias;

// Display the lightbox
function displayLightbox() {
    removeDocumentKeyboardEvents();
    const lightbox = document.querySelector(".lightbox-wrapper");
    document.body.setAttribute('class', 'hide-scrollbar');
    lightbox.setAttribute('class', 'lightbox-wrapper displayed');
}

// Close the lightbox
function closeLightbox() {
    createKeyboardEvents();
    const lightbox = document.querySelector(".lightbox-wrapper");
    document.removeEventListener('keydown', keyboardEvents);
    lightbox.innerHTML = '';
    document.body.removeAttribute('class');
    lightbox.setAttribute('class', 'lightbox-wrapper');
}

// Creates image/video path and returns it
function getImagePath() {
    const {image, video, photographerId} = medias[index];
    if(video == undefined) {
        return `assets/images/${photographerId}/${image}`;
    } 
    else return `assets/images/${photographerId}/${video}`;
}

// Function to create the lightbox when an image is clicked
export function createLightbox(title, path, type, i, data) {
    index = i;
    medias = data;
    const lightbox = document.querySelector(".lightbox-wrapper");
    
    const leftWrapper = document.createElement('div');
    leftWrapper.setAttribute('class', 'lightbox-left-wrapper');

    const centerWrapper = document.createElement('div');
    centerWrapper.setAttribute('class', 'lightbox-center-wrapper');

    const rightWrapper = document.createElement('div');
    rightWrapper.setAttribute('class', 'lightbox-right-wrapper');

    const mediaWrapper = document.createElement('div');
    mediaWrapper.setAttribute('class', 'lightbox-media-wrapper');
    
    const titleWrapper = document.createElement('div');
    titleWrapper.setAttribute('class', 'lightbox-title-wrapper');

    const mediaTitle = document.createElement('h2');
    mediaTitle.textContent = title;
    mediaTitle.setAttribute('class', 'lightbox-image-title');

    const leftChevron = document.createElement('i');
    leftChevron.setAttribute('class', 'fa-solid fa-chevron-left');
    leftChevron.addEventListener('click', previous);
    
    document.addEventListener('keydown', keyboardEvents);

    const rightChevron = document.createElement('i');
    rightChevron.setAttribute('class', 'fa-solid fa-chevron-right');
    rightChevron.addEventListener('click', next);

    

    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa-solid fa-xmark');
    closeIcon.addEventListener('click', closeLightbox);
    
    let media = createContent(type, path);

    mediaWrapper.append(media);

    titleWrapper.appendChild(mediaTitle);

    centerWrapper.appendChild(mediaWrapper);
    centerWrapper.appendChild(titleWrapper);

    leftWrapper.appendChild(leftChevron);

    rightWrapper.appendChild(closeIcon);
    rightWrapper.appendChild(rightChevron);

    lightbox.appendChild(leftWrapper);
    lightbox.appendChild(centerWrapper);
    lightbox.appendChild(rightWrapper);

    displayLightbox();
}

// Returns a video or img html tag
function createContent(type, path) {
    let media;
    if(type != undefined) {
        const source = document.createElement('source');
        source.setAttribute('src', path);
        media = document.createElement('video');
        media.setAttribute('class', 'lightbox-video');
        media.setAttribute('controls', '');
        media.appendChild(source);
    } else {
        media = document.createElement('img');
        media.setAttribute('src', path);
        media.setAttribute('class', 'lightbox-image');
    }
    return media;
}

// Removes children of the lightbox media wrapper
function removeContent() {
    const lightboxMediaWrapper = document.querySelector('.lightbox-media-wrapper');
    while(lightboxMediaWrapper.firstChild) {
        lightboxMediaWrapper.removeChild(lightboxMediaWrapper.lastChild);
    }
}

// Displays next content in lightbox
function next() {
    if(index < (medias.length - 1)) {
        index = index + 1;
        const lightboxMediaWrapper = document.querySelector('.lightbox-media-wrapper');
        const lightBoxTitle = document.querySelector('.lightbox-image-title');
        const {title, video} = medias[index];
        removeContent();
        const media = createContent(video, getImagePath(medias));
        lightBoxTitle.textContent = title;
        lightboxMediaWrapper.appendChild(media);
    }
}

// Displays previous content in lightbox
function previous() {
    if(index > 0) {
        index = index - 1;
        const lightboxMediaWrapper = document.querySelector('.lightbox-media-wrapper');
        const lightBoxTitle = document.querySelector('.lightbox-image-title');
        const {title, video} = medias[index];
        removeContent();
        const media = createContent(video, getImagePath());
        lightBoxTitle.textContent = title;
        lightboxMediaWrapper.appendChild(media);
    }
}

// Handles keyboard events
function keyboardEvents(e) {
    if(e.key == 'ArrowLeft') {
        previous();
    }
    if(e.key == 'ArrowRight') {
        next();
    }
    if(e.key == 'Escape') {
        closeLightbox();
    }
}
let source;

// Display the lightbox
function displayLightbox() {
    const lightbox = document.querySelector(".lightbox-wrapper");
    document.body.style.overflow = 'hidden';
	lightbox.style.display = "flex";
}

// Close the lightbox
function closeLightbox() {
    const lightbox = document.querySelector(".lightbox-wrapper");
    lightbox.innerHTML = '';
    document.body.style.overflow = 'visible';
    lightbox.style.display = "none";
}

function getImagePath(medias) {
    const {image, video, photographerId} = medias[source];
    if(video == undefined) {
        return `assets/images/${photographerId}/${image}`;
    } 
    else return `assets/images/${photographerId}/${video}`;
    
}

// Function to create the lightbox when an image is clicked
function createLightbox(title, path, type, index, medias) {
    source = index;
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
    leftChevron.addEventListener('click', function() {
        previous(medias);
    });

    const rightChevron = document.createElement('i');
    rightChevron.setAttribute('class', 'fa-solid fa-chevron-right');
    rightChevron.addEventListener('click', function() {
        next(medias);
    });

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

function removeContent() {
    const lightboxMediaWrapper = document.querySelector('.lightbox-media-wrapper');
    while(lightboxMediaWrapper.firstChild) {
        lightboxMediaWrapper.removeChild(lightboxMediaWrapper.lastChild);
    }
}

function next(medias) {
    if(source < (medias.length - 1)) {
        source = source + 1;
        const lightboxMediaWrapper = document.querySelector('.lightbox-media-wrapper');
        const lightBoxTitle = document.querySelector('.lightbox-image-title');
        const {title, video} = medias[source];
        removeContent();
        const media = createContent(video, getImagePath(medias));
        lightBoxTitle.textContent = title;
        lightboxMediaWrapper.appendChild(media);
    }
}

function previous(medias) {
    if(source > 0) {
        source = source - 1;
        const lightboxMediaWrapper = document.querySelector('.lightbox-media-wrapper');
        const lightBoxTitle = document.querySelector('.lightbox-image-title');
        const {title, video} = medias[source];
        removeContent();
        const media = createContent(video, getImagePath(medias));
        lightBoxTitle.textContent = title;
        lightboxMediaWrapper.appendChild(media);
    }
}
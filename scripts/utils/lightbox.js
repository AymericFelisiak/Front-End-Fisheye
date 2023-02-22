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

// Function to create the lightbox when an image is clicked
function createLightbox(title, path, type, node) {
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

    const leftChevron = document.createElement('i');
    leftChevron.setAttribute('class', 'fa-solid fa-chevron-left');
    leftChevron.addEventListener('click', function() {
        previous(node);
    });

    const rightChevron = document.createElement('i');
    rightChevron.setAttribute('class', 'fa-solid fa-chevron-right');
    rightChevron.addEventListener('click', function() {
        next(node);
    });

    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa-solid fa-xmark');
    closeIcon.addEventListener('click', closeLightbox);
    
    let media;
    if(type != undefined) {
        const source = document.createElement('source');
        source.setAttribute('src', path);
        media = document.createElement('video');
        media.setAttribute('controls', '');
        media.appendChild(source);
    } else {
        media = document.createElement('img');
        media.setAttribute('src', path);
    }

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

function next(node) {
    const content = document.querySelector('.media-wrapper');
    let nextContent;
    content.childNodes.forEach(child => {
        nextContent = child.nextSibling;
        if(child == node && nextContent != undefined) {
            const event = new Event("click");
            closeLightbox();
            nextContent.querySelector('.media-image-wrapper').dispatchEvent(event);
        }
    })
}

function previous(node) {
    const content = document.querySelector('.media-wrapper');
    let previousContent;
    content.childNodes.forEach(child => {
        previousContent = child.previousSibling;
        if(child == node && previousContent != undefined) {
            const event = new Event("click");
            closeLightbox();
            previousContent.querySelector('.media-image-wrapper').dispatchEvent(event);
        }
    })
}
// Factory for photographer profile
export function profileFactory(data) {
    const {photographerId, id, title, image, video, likes, date  } = data;

    // Creates media thumbnail from the data passed when factory is created
    function getThumbnail() {
        const section = document.createElement('section');
        this.totalLikes = this.totalLikes + likes;

        section.setAttribute('class', 'media-content-wrapper');
        
        const imgWrapper = document.createElement('div');
        imgWrapper.setAttribute('class', 'media-image-wrapper');
        imgWrapper.setAttribute('tabindex', '0');
        
        let img;
        let path;

        // Defines if the media is a video or a photo
        if(video == undefined) {
            path = `assets/images/${photographerId}/${image}`;
            img = document.createElement('img');
            img.setAttribute('src', path);
            img.setAttribute('alt', title);
            img.setAttribute('id', id)
        }
        else {
            path = `assets/images/${photographerId}/${video}`;
            img = document.createElement('video');
            img.setAttribute('id', id);
            const source = document.createElement('source');
            source.setAttribute('src', path);
            img.appendChild(source);
        }
        img.setAttribute('aria-label', title + ", closeup view");

        const informationsWrapper = document.createElement('div');
        informationsWrapper.setAttribute('class', 'media-image-informations');

        const titleWrapper = document.createElement('div');
        titleWrapper.setAttribute('class', 'media-image-title-wrapper');
        
        const h2 = document.createElement('h2');
        h2.textContent = title;
        titleWrapper.appendChild(h2);

        const likesWrapper = document.createElement('div');
        likesWrapper.setAttribute('class', 'media-image-likes');
        const p = document.createElement('p');
        p.textContent = likes;
        const i = document.createElement('i');
        i.setAttribute('class', 'fa-solid fa-heart');

        imgWrapper.appendChild(img);
        likesWrapper.appendChild(p);
        likesWrapper.appendChild(i);

        informationsWrapper.appendChild(titleWrapper);
        informationsWrapper.appendChild(likesWrapper);
        section.appendChild(imgWrapper);
        section.appendChild(informationsWrapper);

        return (section);
    }

    return { id, title, likes, date, getThumbnail  }
}
class PhotographerFactory {
    constructor(data, medias, type) {
        if(type == 'index') {
            return new PhotographerIndexFactory(data);
        }
        if(type == 'profile') {
            return new PhotographerProfileFactory(data, medias);
        }
    }
}

class PhotographerIndexFactory {
    constructor(data, index) {
        this.data = data;
        this.index = index;
    }

    getUserCardDOM() {
        const { name, portrait, city, country, tagline, price, id  } = this.data;
        const picture = `assets/photographers/${portrait}`;
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        const url = "photographer.html?photographer_id=" + id;
        a.setAttribute("href", url);
        article.setAttribute("tabindex", this.index);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("class", "photographer-portrait");
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.setAttribute("class", "photographer-name");
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h3.setAttribute("class", "photographer-location");
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.setAttribute("class", "photographer-tagline");
        const p = document.createElement('p');
        p.textContent = price + "€/jour";
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h3);
        a.appendChild(h4);
        a.appendChild(p);   
        article.appendChild(a);
        return (article);
    }
}

class PhotographerProfileFactory {
    constructor(photographerData, photographerMedias) {
        this.photographerData = photographerData;
        this.photographerMedias = photographerMedias;
        this.totalLikes = 0;
    }
    
    getProfileInformationsDOM() {
        const {name, portrait , city, country, tagline} = this.photographerData;
        const picture = `assets/photographers/${portrait}`;

        const h2 = document.querySelector('.photographer-name');
        h2.textContent = name;

        const h3= document.querySelector('.photographer-location');
        h3.textContent = city + ', ' + country;

        const h4 = document.querySelector('.photographer-tagline');
        h4.textContent = tagline;

        const img = document.querySelector('.photographer-portrait');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const formName = document.querySelector('.form-photographer-name');
        formName.textContent = "Contactez-moi " + name;
    }

    createThumbnail(data, index) {
        const {id} = this.photographerData;
        const {title, image, video, likes} = data;
        const medias = this.photographerMedias;
        const section = document.createElement('section');
        this.totalLikes = this.totalLikes + likes;

        section.setAttribute('class', 'media-content-wrapper');
        
        const imgWrapper = document.createElement('div');
        imgWrapper.setAttribute('class', 'media-image-wrapper');
        let img;
        let path;
        if(video == undefined) {
            path = `assets/images/${id}/${image}`;
            img = document.createElement('img');
            img.setAttribute('src', path);
            img.setAttribute('alt', title);
        }
        else {
            path = `assets/images/${id}/${video}`;
            img = document.createElement('video');
            const source = document.createElement('source');
            source.setAttribute('src', path);
            img.appendChild(source);
        }
        img.setAttribute('aria-label', title + ", closeup view");

        const informationsWrapper = document.createElement('div');
        informationsWrapper.setAttribute('class', 'media-image-informations');

        const h2 = document.createElement('h2');
        h2.textContent = title;

        const likesWrapper = document.createElement('div');
        likesWrapper.setAttribute('class', 'media-image-likes');
        const p = document.createElement('p');
        p.textContent = likes;
        const i = document.createElement('i');
        i.setAttribute('class', 'fa-solid fa-heart');

        imgWrapper.appendChild(img);
        likesWrapper.appendChild(p);
        likesWrapper.appendChild(i);

        likesWrapper.addEventListener('click', function() {
            this.handleLike();
        });

        informationsWrapper.appendChild(h2);
        informationsWrapper.appendChild(likesWrapper);
        section.appendChild(imgWrapper);
        section.appendChild(informationsWrapper);

        imgWrapper.addEventListener("click", function() {
            createLightbox(title, path, video, index, medias);
        });

        imgWrapper.setAttribute('tabindex', '0');
        return (section);
    }

    getTotalLikesCard() {
        const likeDiv = document.querySelector(".photographer-like-wrapper");
        const like = document.querySelector(".total-likes");
        const price = document.querySelector(".photographer-price");
        const heart = document.createElement("i");

        heart.setAttribute("class", "fa-solid fa-heart")
        likeDiv.appendChild(heart);

        like.textContent = this.totalLikes;
        price.textContent = this.photographerData.price + "€ / jour";
    }

    getMedia() {
        const mediaWrapper = document.querySelector('.media-wrapper');
        let i = 0;
        this.photographerMedias.forEach(element => {
            const article = this.createThumbnail(element, i);
            i++;
            mediaWrapper.appendChild(article);
        });
    }

    getProfilePage() {
        this.getProfileInformationsDOM();
        this.getMedia();
        this.getTotalLikesCard();
    }

    get getTotalLikes() {
        return this.totalLikes;
    }

    get getPhotographerData() {
        return this.photographerData;
    }

    get getPhotographerMedias() {
        return this.photographerMedias;
    }
}
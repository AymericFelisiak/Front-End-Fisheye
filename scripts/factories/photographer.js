class photographerFactory {
    constructor(data, medias, type) {
        if(type == 'index') {
            return new photographerIndexFactory(data);
        }
        if(type == 'profile') {
            return new photographerProfileFactory(data, medias);
        }
    }
}

class photographerIndexFactory {
    constructor(data) {
        this.data = data;
    }

    getUserCardDOM() {
        const { name, portrait, city, country, tagline, price, id  } = this.data;
        const picture = `assets/photographers/${portrait}`;
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        const url = "photographer.html?photographer_id=" + id;
        a.setAttribute("href", url);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("class", "photographer-portrait")
        img.setAttribute("alt", name)
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
        p.textContent = price + "/jour";
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        return (article);
    }
}

class photographerProfileFactory {
    constructor(photographerData, photographerMedias) {
        this.photographerData = photographerData;
        this.photographerMedias = photographerMedias;
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
    }
}
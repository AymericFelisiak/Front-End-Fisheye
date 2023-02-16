class photographerFactory {
    constructor(data, type) {
        if(type == 'index') {
            return new photographerIndexFactory(data);
        }
        if(type == 'profile') {
            return new photographerProfileFactory(data);
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
        img.setAttribute("class", "photographer_portrait")
        img.setAttribute("alt", name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
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
    constructor(data) {
        this.data = data;
    }

    getProfileDOM() {

    }
}
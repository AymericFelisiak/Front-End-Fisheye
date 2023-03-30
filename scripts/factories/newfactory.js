export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id  } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const picture = `assets/photographers/${portrait}`;
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        const url = "photographer.html?photographer_id=" + id;
        a.setAttribute("href", url);
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

    function getProfileInformationsDOM() {
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

        const priceWrapper = document.querySelector(".photographer-price");
        priceWrapper.textContent = price + "€ / jour";
    }

    return { name, picture, getUserCardDOM, getProfileInformationsDOM }
}
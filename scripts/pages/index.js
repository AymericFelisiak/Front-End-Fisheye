// Fetch les datas des photographes dans le fichier json
async function getPhotographers() {
    let photographers = await fetch("./data/photographers.json").then(dataSet => {
            if(!dataSet.ok) {
                throw new Error('File path incorrect');
            }
            return dataSet.json();
        }
    ).catch(error => 
        console.error('Fetch error : ', error)
    );
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = new photographerFactory(photographer, undefined, 'index');
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();


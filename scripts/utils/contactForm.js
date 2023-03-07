function displayModal() {
    const modal = document.querySelector(".contact_modal");
	modal.style.display = "flex";
    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal() {
    const modal = document.querySelector(".contact_modal");
    modal.style.display = "none";
    document.removeEventListener('keydown', handleEscapeKey);
}

function sendForm() {
    const firstName = document.querySelector('#firstname');
    const lastName = document.querySelector('#lastname');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');
    
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(message.value);

    closeModal();
    // window.location.reload();
    return false;
}

function handleEscapeKey(e) {
    if(e.key == 'Escape') {
        closeModal();
    }
}
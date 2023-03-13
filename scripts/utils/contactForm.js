const modal = document.querySelector(".contact_modal");
const firstFocusable = modal.querySelector("[tabindex='0']");
const focusableElements = modal.querySelectorAll("[tabindex='0'], input, textarea, button");
let activeIndex = 0;

function displayModal() {
	modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleFocus);
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleEscapeKey);
    document.removeEventListener('keydown', handleFocus);
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
    return false;
}

function handleEscapeKey(e) {
    if(e.key == 'Escape') {
        closeModal();
    }
}

// Handler to trap focus elements to modal window
function handleFocus(e) {
    if(!(e.key == 'Tab')) {
        return;
    }
    e.preventDefault();
    if(modal.activeElement == undefined) {
        modal.activeElement = firstFocusable;
        firstFocusable.focus();
    }   
    else {
        if(e.key == 'Tab' && e.shiftKey == true) {
            if(activeIndex > 0) {
                activeIndex--;
                focusableElements[activeIndex].focus();
            }
        }
        else {
            if(activeIndex < focusableElements.length - 1) {
                activeIndex++;
                focusableElements[activeIndex].focus();
            }
        }
    }
}
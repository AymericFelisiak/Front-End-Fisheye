import {createKeyboardEvents} from "/scripts/pages/photographer.js";
import {removeDocumentKeyboardEvents} from "/scripts/pages/photographer.js";


// DOM Elements
const modal = document.querySelector(".contact-modal");
const firstFocusable = modal.querySelector("[tabindex='-1']");
const focusableElements = modal.querySelectorAll("[tabindex='-1']");
const closeButton = modal.querySelector('[alt="close"]');
const sendButton = modal.querySelector('#send-form');

// Listeners
closeButton.addEventListener('click', closeModal);
closeButton.addEventListener('keydown', handleEnterToClose);
sendButton.addEventListener('click', sendForm);

let activeIndex = 0;

export function displayModal() {
    removeDocumentKeyboardEvents();
    modal.setAttribute('class', 'contact-modal displayModal');
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleFocus);
}

function closeModal() {
    createKeyboardEvents();
    modal.setAttribute('class', 'contact-modal');
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

function handleEnterToClose(e) {
    if(e.key == 'Enter') {
        closeModal();
    }
}

function handleEscapeKey(e) {
    if(e.key == 'Escape') {
        closeModal();
    }
}

// Handler to trap focus elements to modal window
function handleFocus(e) {
    if(!(e.key == 'Tab') && !(e.key == 'ArrowLeft') && !(e.key == 'ArrowRight')) {
        return;
    }
    e.preventDefault();
    if(activeIndex == 0 && modal.activeElement != firstFocusable) {
        firstFocusable.focus();
        modal.activeElement = firstFocusable;
    }   
    else {
        if((e.key == 'Tab' && e.shiftKey == true) || (e.key == 'ArrowLeft')) {
            if(activeIndex > 0) {
                activeIndex--;
                focusableElements[activeIndex].focus();
                modal.activeElement = focusableElements[activeIndex];
            }
        }
        else {  // If Tab or ArrowRight
            if(activeIndex < focusableElements.length - 1) {
                activeIndex++;
                focusableElements[activeIndex].focus();
                modal.activeElement = focusableElements[activeIndex];
            }
        }
    }
}
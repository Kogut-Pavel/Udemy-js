'use strict';

function openModal(modalSelector, modalTimerId) { 
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);  
    }
}

function closeModal(modalSelector) { 
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {  
    // Modal

    const modal = document.querySelector(modalSelector);
    const modalTrigger = document.querySelectorAll(triggerSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
        }
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape") {
            closeModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    });
    
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal, openModal};
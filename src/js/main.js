import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";
import picture from "./modules/picture";
import accordion from "./modules/accordion";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let modalState = {};

    modals();

    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');

    forms(modalState);

    mask('[name="phone"]');

    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');

    showMoreStyles('.button-styles', '#styles .row');

    calc('#size', '#material', '#options', '.promocode', '.calc-price', modalState);
    filter();

    picture('.sizes-block');

    accordion('.accordion-heading');

    burger('.burger', '.burger-menu');

    scrolling('.pageup');
    
    drop();
}); 
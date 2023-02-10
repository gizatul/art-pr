const burger = (triggerSelector, menuSelector) => {
    const burgerBtn = document.querySelector(triggerSelector),
          burgerMenu = document.querySelector(menuSelector);
    
    burgerMenu.style.display = 'none';

    burgerBtn.addEventListener('click', () => {
        if (burgerMenu.style.display == 'none' && window.screen.availWidth < 992) {
            burgerMenu.style.display = 'block';
        } else {
            burgerMenu.style.display = 'none';
        }
    });
    //window.screen.availWidth - Свойство availWidth возвращает ширину экрана пользователя служащую непосредственно для вывода информации (т.е. ширина без размера таких элементов браузера как панель задач, полоса прокрутки и т.д.).
    window.addEventListener('resize', () => { //событие ресайз отслеживает когда польз изменяет размер экрана
        if (window.screen.availWidth > 991) {
            burgerMenu.style.display = 'none';
        }
    });
    
};
export default burger;
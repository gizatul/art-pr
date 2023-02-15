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
    
    window.addEventListener('resize', () => { 
        if (window.screen.availWidth > 991) {
            burgerMenu.style.display = 'none';
        }
    });
};
export default burger;
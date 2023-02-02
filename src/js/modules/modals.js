import calcScroll from "./calcScroll";
const modals = () => {
    let btnPressed;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector), //кнопка вызова окна
              modal = document .querySelector(modalSelector), // модал окно
              close = document.querySelector(closeSelector), // закрытие окна
              windows = document.querySelectorAll('[data-modal]'), // получаем все модальные окна чтобы их потом закрыть
              gift = document.querySelector('.fixed-gift'),
              scroll = calcScroll();
     
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); // отмена стандартного поведения браузера(если вдруг внутри ссылка, браузер по умол. перезагружает страницу)
                }
                btnPressed = true; //если пользователь кликнул хоть куда-то, то btnPressed меняем с undefined на true
                
                if (destroy) {
                    item.remove(); //удаляем триггер на который нажали (реализовано для подарка)
                }

                windows.forEach(item => { 
                    item.style.display = 'none'; //при открытии модал окна старые все закрываются
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block'; // появление окна
                document.body.style.overflow = 'hidden'; //блок прокрутки
                document.body.style.marginRight = `${scroll}px`; //страница будет смещена вправо на ширину скрола
                gift.style.right = `${(+getComputedStyle(gift).right.replace(/\D/g, '')) + scroll}px`;
                
            });
            
        });
        close.addEventListener('click', () => {
            modal.style.display = 'none'; //скрытие окна
            document.body.style.overflow = ''; //восстановление прокрутки
            windows.forEach(item => { 
                item.style.display = 'none'; //закрытие всех окон при нажатии на крестик(сделано для калькулятора)
            });
            document.body.style.marginRight = `0px`;
            gift.style.right = ``; //при появлении скрола будет 0
        });
        modal.addEventListener('click', (e) => { //закрытие при клике на подложку
            if (e.target === modal) {// Если клик на подложку и параметр true, то ф-я ниже выполнится. closeClickOverlay мы специально искуственно создали чтобы контролировать какие именно окна закрывать с помощью клика на подложку
                windows.forEach(item => { 
                    item.style.display = 'none'; //закрытие всех окон при нажатии на подложку
                });
                modal.style.display = 'none'; //скрытие окна
                document.body.style.overflow = ''; //восстановление прокрутки  
                document.body.style.marginRight = ``;
                gift.style.right = ``; //при появлении скрола будет 0
            }
        });
    }

    function showModalByTime(selector, time, shiftBtn) { //показ окна спустя время
        setTimeout(() => {
            let anyModalShow; //сейчас undefined, т.е. false

            document.querySelectorAll('[data-modal]').forEach(item => { //выдергиваем модал окна
                if (getComputedStyle(item).display !== 'none') { //getComputedStyle - позволяет выдернуть скомпилированный браузером стиль //если св-во display не равно none 
                    anyModalShow = true; // в переменную display записывае block
                }
            });
            if (!anyModalShow) { //если false то показывем окно
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll(); //тк у скролл ниже нет доступа к ф-ии calcScroll в связи что setTimeour - callback-ф-я, то мы ее переназначим
                document.body.style.marginRight = `${scroll}px`; //страница будет смещена вправо на ширину скрола
                document.querySelector(shiftBtn).style.right = `${(+(getComputedStyle(document.querySelector(shiftBtn))).right.replace(/\D/g, '')) + scroll}px`; //блок перемещения подарка во время появления окна
            }
        }, time);
        
    }
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); //для совместимости со старыми браузерами
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1)) { // -1 ставим тк иначе не срабатывает
                document.querySelector(selector).click(); //вызываем автоматический якобы клик по элементу
            } //если пользователь не кликнул ни на одну кнопку и 
        });
    }

    //window.pageYOffset - контент который остался сверху при пролистывании вниз
    //document.documentElement.clientHeight - то что пользователь видит
    //window.pageYOffset + document.documentElement.clientHeight полная высота документа
    //documentElement.scrollHeight - измерение высоты контента в элементе, включая содержимое, невидимое из-за прокрутки

    
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift'); //вызов ф-ии скролла до конца
    showModalByTime('.popup-consultation', 5000, '.fixed-gift');
};
export default modals;
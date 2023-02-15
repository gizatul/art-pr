import calcScroll from "./calcScroll";
const modals = () => {
    let btnPressed;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector), 
              modal = document .querySelector(modalSelector), 
              close = document.querySelector(closeSelector), 
              windows = document.querySelectorAll('[data-modal]'), 
              gift = document.querySelector('.fixed-gift'),
              scroll = calcScroll();
     
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); 
                }
                btnPressed = true; 
                
                if (destroy) {
                    item.remove(); 
                }

                windows.forEach(item => { 
                    item.style.display = 'none'; 
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block'; 
                document.body.style.overflow = 'hidden'; 
                document.body.style.marginRight = `${scroll}px`; 
                gift.style.right = `${(+getComputedStyle(gift).right.replace(/\D/g, '')) + scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = 'none'; 
            document.body.style.overflow = ''; 
            windows.forEach(item => { 
                item.style.display = 'none'; 
            });
            document.body.style.marginRight = `0px`;
            gift.style.right = ``; 
        });
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) {
                windows.forEach(item => { 
                    item.style.display = 'none'; 
                });
                modal.style.display = 'none'; 
                document.body.style.overflow = ''; 
                document.body.style.marginRight = ``; 
                gift.style.right = ``; 
            }
        });
    }

    function showModalByTime(selector, time, shiftBtn) { 
        setTimeout(() => {
            let anyModalShow; 

            document.querySelectorAll('[data-modal]').forEach(item => { 
                if (getComputedStyle(item).display !== 'none') { 
                    anyModalShow = true; 
                }
            });
            if (!anyModalShow) { 
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll(); 
                document.body.style.marginRight = `${scroll}px`;
                try {
                    document.querySelector(shiftBtn).style.right = `${(+(getComputedStyle(document.querySelector(shiftBtn))).right.replace(/\D/g, '')) + scroll}px`;
                } catch(e){}
            }
        }, time);
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1)) { 
                document.querySelector(selector).click(); 
            } 
        });
    }
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift'); 
    showModalByTime('.popup-consultation', 5000, '.fixed-gift');
};
export default modals;
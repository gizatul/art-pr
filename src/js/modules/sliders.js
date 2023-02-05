const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1, //отражает текущий слайд
        paused = false; //нужно ли остановить переключение
    const items = document.querySelectorAll(slides);
          
    //Ф-я отвечающая за перемещение слайда и slideIndex
    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1; //при долистывании до конца будет показан 1-й слайд
        }
        if (n < 1) {
            slideIndex = items.length; //при долистывании до начала буден показан последний слайд
        }

        items.forEach(item => { //скрытие всех слайдов 
            item.classList.add('animated'); //добавляем класс анимации
            item.style.display = 'none'; //скрытие всех слайдов
        });
        items[slideIndex - 1].style.display = 'block'; //показ нужного слайда
    }
    showSlides(slideIndex); //при заходе на страницу будет показан 1-й слайд

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try { //размещаем в try чтобы ошибка не остановила код. кнопки след и пред будут отсутствовать в одном из слайдов
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1); //перелистывание слайдов
            items[slideIndex - 1].classList.remove('slideInLeft'); //настройка анимацию. Эти классы уже есть в animate.css
            items[slideIndex - 1].classList.add('slideInRight');
        });
        nextBtn.addEventListener('click', () => {
            plusSlides(1); //перелистывание слайдов
            items[slideIndex - 1].classList.add('slideInLeft');
            items[slideIndex - 1].classList.remove('slideInRight');
        }); 
    } catch(e){}

    function activateAnimation() {
        // Реализация направления (dir) и автопереключения
        if (dir === 'vertical') {
            paused = setInterval(function() { //добавляем переменную paused
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown'); //анимация вниз
            }, 3000);
        } else { //горизонтальное направление
            paused = setInterval(function() { //добавляем переменную paused
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInLeft');
                items[slideIndex - 1].classList.remove('slideInRight');
            }, 3000);
        }
    }
    activateAnimation();
    //Реализация остановки по наведению мыши
    items[0].parentNode.addEventListener('mouseenter', () => { //когда наводим мышь на родителя слайдов
        clearInterval(paused); //очищаем setInterval
    });
    items[0].parentNode.addEventListener('mouseleave', () => { //когда убираем мышь с родителя слайдов
        activateAnimation(); //запускаем анимацию
    });
};
export default sliders;
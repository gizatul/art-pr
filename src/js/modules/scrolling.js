const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.style.opacity = '1';
        } else {
            upElem.style.opacity = '0';
        }
    });
    //2-я часть // с помощью requestAnimationFrame
    let links = document.querySelectorAll('[href^="#"]'), // [href^=`#`]' - поиск всех ссылок начинающихся с #
        speed = 0.2;

    links.forEach(link => {
        if (link.getAttribute('href') != '#') {
            link.addEventListener('click', function(e){
                e.preventDefault();
                let heightTop = document.documentElement.scrollTop,
                    hash = this.hash, // получаем hash
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,  //Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим). В данном случае используем top, т.е. сверху
                    start = null; //переменная определяющая стартовую позицию

                requestAnimationFrame(step);

                //Ф-я кот-я занимается анимацией
                function step(frame) { //frame будет передаваться автоматически
                    if (start === null) { // в первый ли раз будет запускаться анимация
                        start = frame;
                    }

                    let progress = frame - start, //вычисляет 
                        r = (toBlock < 0 ? Math.max(heightTop - (progress / speed), heightTop + toBlock) : Math.min(heightTop + (progress / speed, heightTop + toBlock))); // кол-во пикселе, кот-е необходимо пролистать в течении этой анимации // нужна для того чтобы понимать на сколько пикселей нам нужно продвинуть анимацию и в какую сторону
                        document.documentElement.scrollTo(0, r); //на этом этапе идет анимация
                        
                    //Условие о том когда анимация должна остановиться
                    if (r != heightTop + toBlock) { //если она равна значит уже долистали до пикселя
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash; //анимация заканчивается
                    }
                }
            });
        }
    });


    //2-я часть реализации // Код на чистом JS 
    // const element = document.documentElement, //указывыем сразу 2 вида, тк разные браузеры по разному это рассчитывают
    //       body = document.body;
    // // подсчет того сколько нужно пролистать и как это сделать
    // const countScroll = () => {
    //     upElem.addEventListener('click', function(e) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); // Какое расстояние пролистано сверху пользователем
    //         if (this.hash !== '') { //если хеш не пустой
    //             e.preventDefault();
                
    //             let hashElement = document.querySelector(this.hash), //Получаем тот элемент, к которому будем скролить
    //                 hashElementTop = 0; //сколько нужно пролистать до родителя элемента
    //             //Свойство location.hash возвращает якорную часть URL-адреса, включая знак решетки (#).

    //             while (hashElement.offsetParent) { //в свойстве offsetParent находится предок элемента, который используется внутри браузера для вычисления координат при рендеринге.
    //                 hashElementTop += hashElement.offsetTop; //cвойство offsetTop содержит координату x относительно верхнего угла offsetParent
    //                 hashElement = hashElement.offsetParent; //перебор всех родителей, кот-е могут быть основой для позиционирования элемента
    //             }
                
    //             hashElementTop = Math.round(hashElementTop); //сколько пикселей стоит от родительского элемента
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // }

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1, //знач-е ч/з кот-е будет производится анимация
    //         prevScrollTop, // предшествующее значение
    //         speed; //скорость анимации

    //     if (to > from) { //если hashElementTop будет больше расстояния пролистанного сверху
    //         speed = 30; //движение сверху вниз
    //     } else {
    //         speed = -30; //движение снизу вверх
    //     }
    //     //Ф-я анимации
    //     let move = setInterval(function() { 
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); //в SetInterval это значение будет постоянно меняться
    //         if ( //условие о том что пользователь долистал до нужного момента
    //             prevScrollTop === scrollTop || //пред анимация, кот-я была воспроизведена равна уже тому что мы хотели получить // это значит, что нам некуда скролить страницу
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             console.log(history);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop; //каждый раз переписывается в это строчке //будем знать сколько еще осталось до того момента как мы долистаем
    //         }
    //     }, timeInterval);
    // }
    // countScroll();
};
export default scrolling;
    //Ф-я для подсчета ширины скрола
    function calcScroll () {
        let div = document.createElement('div'); //блок для подсчета ширины скрола
        div.style.width = '50px'; //чтобы блок был на странице
        div.style.height = '50px'; //чтобы блок был на странице
        div.style.overflowY = 'scroll'; //включаем полосу вертикальной(Y) прокрутки навсегда
        div.style.visibility = 'hidden'; //элемент скроем

        document.body.appendChild(div); //размещаем элемент на страницу
        let scrollWidth = div.offsetWidth - div.clientWidth; //offsetWidth - полная ширина, clietWidth включает padding и главный контент = ширина прокрутки
        div.remove();
        return scrollWidth;
    }
    export default calcScroll;
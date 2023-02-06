const mask = (selector) => {
    //Ф-я установки позиция курсора
    let setCursorPosition = (pos, elem) => { //в pos будет кол-во символов //elem -this - 'ktvyn с которым мы будем работать
        elem.focus(); //вручную ставим focus на элементе
        
        if (elem.setSelectionRange) { 
           elem.setSelectionRange(pos, pos); 
        } else if (elem.createTextRange) { //Ниже пойдет ручной полифилл для старых браузеров IE
            let range = elem.createTextRange(); // создание диапазона, кот-й нужно выделить
            //с помощью метода createTextRange создается Объект TextRange

            range.collapse(true); //Метод collapse объединяет граничные точки диапазона, т.е. первое с последней позицией
            range.moveEnd('character', pos); //указываем коду где будет конечная точка выделения. character - символ
            range.moveStart('character', pos); //указываем коду где будет конечная точка выделения (в итоге будет одно и то же место)
            range.select(); //установка курсора и выделение того значения которое сформировалось при помощи 2-х предыдущих параметров(move)
        }
    };

    function createMask(event) {
        let matrix = `+7 (___) ___ __ __`, //матрица для создания
            i = 0, //итератор
            def = matrix.replace(/\D/g, ''), //значение статичное на основе матрицы - default (получаем все НЕцифры)
            val = this.value.replace(/\D/g, ''); //значение динамичное на основании что ввел пользователь
        
        if (def.length >= val.length) {
            val = def; // если пользователь вдруг удаляет семерку и плюс, то у него не получится
        }
        this.value = matrix.replace(/./g, function(a) {//перебор символов в матрице и возврат в зависимости от определенных условий // a - тех. аргумент
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
        ///[_\d]/ - диапазон поиска цифр и подчеркиваний
        //Метод regexp.test(str) ищет совпадение и возвращает true/false, в зависимости от того, находит ли он его.
        //val.charAt(i++) - метод charAt() возвращает символ по заданному индексу внутри строки

        // Отработка события blur/focus
        if (event.type === 'blur') { //если пользователь нажал вне инпута 
            if (this.value.length == 2) { // если в инпуте 2 символа
                this.value = ''; // то очистим инпут
            }
            } else { // если focus
                setCursorPosition(this.value.length, this);//то срабатывает эта ф-я //this.value.length - кол-во символов
            }
        }
        // событие focus вызывается в момент фокусировки, а blur – когда элемент теряет фокус.
    
    let inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('keypress', createMask); //обработчик keypress, который срабатывает от нажатия на клавишу и ещё до того, как был введён какой-то символ, перемещает курсор перед кодом страны
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};
export default mask;
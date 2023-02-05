const checkTextInputs = (selector) => {
        const textInputs = document.querySelectorAll(selector);
        textInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-я 0-9]/ig, ''); //при введении не цифр ввводится пустая строка
            });
        });
    };

export default checkTextInputs;
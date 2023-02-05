//Введение в поле с телефоном только цифр
const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); //при введении не цифр ввводится пустая строка
        });
    });
};
export default checkNumInputs;
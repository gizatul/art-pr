const calc = (size, material, options, promo, result, state) => {
    const resultBlock = document.querySelector(result),
          sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promoBlock = document.querySelector(promo),
          calcSelect = document.querySelectorAll('.calc select');
    let sum = 0;

    const calcFunction = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value)); 
        
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Выберите размер и материал картины";
        } else if (promoBlock.value === 'IWANTPOPART') {
            resultBlock.innerHTML = `Общая стоимость заказа: <br>  ${Math.round(sum * 0.7)} руб.`;
            state.result = Math.round(sum * 0.7);
        } else {
            resultBlock.innerHTML = `Общая стоимость заказа: <br> ${Math.round(sum)} руб.`; 
            state.result = Math.round(sum);
        }
        if (promoBlock.value) {
            state.promo = promoBlock.value;
        }
        calcSelect.forEach(select => {
            updateObject(select, 'size', 'size', sizeBlock);
            updateObject(select, 'material', 'material', materialBlock);
            updateObject(select, 'options', 'options', optionsBlock);
        });
        console.log(state);      
    };

    function updateObject(select, value, key, block) {
        if(select.getAttribute("id") == value) {
            state[key] = block.value;
        }
    }
    
    sizeBlock.addEventListener('change', calcFunction);
    materialBlock.addEventListener('change', calcFunction);
    optionsBlock.addEventListener('change', calcFunction);
    promoBlock.addEventListener('input', calcFunction);
};
export default calc;
import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger),
          block = document.querySelector(wrapper);
        //   cards = document.querySelectorAll(blocks);


    // Первый вариант (когда элементы просто скрыты на странице)
    // cards.forEach(item => {
    //     item.classList.add('animated', 'fadeInUp');
    // });
    // btn.addEventListener('click', () => {
    //     cards.forEach(item => {
    //         item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.remove();
    // });

    //Второй вариант (когда элементы на сервере)
    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')
            .then(res => createCards(res))
            .catch(() => showError());
        this.remove();
    });
    //Ф-я по перебору и размещению данных из сервера на страницу
    function createCards(response) { //в запросе приходит объект из сервера
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');
            card.innerHTML = `
            <div class=styles-block>
			<img src=${src} alt="style">
				<h4>${title}</h4>
					<a href="${link}">Подробнее</a>
		    </div>`;

            block.appendChild(card); //размещаем карты на странице
        });
    }
    function showError() {
        let statusError = document.createElement('div');
        statusError.classList.add('animated', 'fadeInUp');
        statusError.textContent = 'Что-то пошло не так...';
        statusError.style.cssText = `
        text-align:center;
        color: red;
        font-size: 200%`;
        block.appendChild(statusError);
    }
};
export default showMoreStyles;
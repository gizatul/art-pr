import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger),
          block = document.querySelector(wrapper);

    btn.addEventListener('click', function() {
        getResource('assets/db.json')
            .then(res => createCards(res.styles))
            .catch(() => showError());
        this.remove();
    });
    
    function createCards(response) { 
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');
            card.innerHTML = `
            <div class=styles-block>
			<img src=${src} alt="style">
				<h4>${title}</h4>
					<a href="${link}">Подробнее</a>
		    </div>`;

            block.appendChild(card); 
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
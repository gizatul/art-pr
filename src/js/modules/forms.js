import { postData } from "../services/requests";
import clearObject from "./clearObject";
import shortFileName from "./shortFileName";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          windows = document.querySelectorAll('[data-modal]'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]'); 
    
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'; 
        });
    }

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    }

    upload.forEach(item => {
        item.addEventListener('input', () => { 
            shortFileName(item);
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); 
            document.body.style.overflow = '';
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage); 

            item.classList.add('animated', 'fadeOutUp'); 
            setTimeout(() => {
                item.style.display = 'none'; 
            }, 400);
            
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusImg.style.cssText = `
            display: block;
            margin: 0 auto`;
            statusMessage.appendChild(statusImg);
            
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            textMessage.style.textAlign = 'center';
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api; 

            item.closest('.popup-design') || item.classList.contains('calc_form') ? 
            api = path.designer : 
            api = path.question;

            if (item.classList.contains('calc_form')) {
                for (let key in state) {
                    formData.append(key, state[key]); 
                };
            }
            console.log(api);
            
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok); 
                    textMessage.textContent = message.success; 
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail); 
                    textMessage.textContent = message.failure; 
                })
                .finally(() => {
                    clearInputs(); 
                    setTimeout(() => {
                        statusMessage.remove(); 
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.remove('fadeInUp');
                        clearObject(state);  
                        document.querySelectorAll('.calc select').forEach(select => {
                            select.value = ''; 
                        });   
                    }, 5000);      
                }); 
        });
    });
};
export default forms;
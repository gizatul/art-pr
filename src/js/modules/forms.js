import { postData } from "../services/requests";
import clearObject from "./clearObject";
const forms = (state) => {

    const form = document.querySelectorAll('form'),
          windows = document.querySelectorAll('[data-modal]'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]'); //выдергиваем upload для названия загружаемого изображения
    
    //Ф-я для очищения полей
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'; //возвращаем наименование после отправки изображения
        });
    }

    //Создание объекта с сообщениями
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

    //Размещение названия файла вместо "Файл не выбран"
    upload.forEach(item => {
        item.addEventListener('input', () => { //ОС сработает когда пользователь положит в поле
            console.log(item.files[0]); // item.files[0] - обращение к загруженному файлу
            let dots; // точки
            const arrName = item.files[0].name.split('.');
            arrName[0].length > 6 ? dots = '...' : dots = '.';
            const name = arrName[0].substring(0, 6) + dots + arrName[1];
            item.previousElementSibling.textContent = name; //<div>Файл не выбран</div> является предыдущим соседом [name="upload"]. Внедряем туда имя файла
        });
        //item.files[0].name - полная строка
        //item.files[0].name.split('.') - разбиваем строку на 2 части. Возвращает массив: ['имя файла', 'jpg'].
        //item.files[0].name.split('.')[0] - обращение к первому аргументу массива те имени файла
        //item.files[0].name.split('.')[0].length > 6 - проверка на длину имени файла

        //item.files[0].name.split('.')[0].substring(0, 6) - обрезаем строку 6 символов
        //item.files[0].name.split('.')[1] - расширение файла
        //в объекте files лежат не только файлы , а еще дополнительные свойства,обращаясь к files[0] ты ищешь именно файл, а не свойства объекта files
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); //отмена перезагрузки страницы
            document.body.style.overflow = '';
            
            //Создание блока с статусом запроса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage); //размещаем блок  изображения в родителя формы

            item.classList.add('animated', 'fadeOutUp'); //форма станет прозрачной
            setTimeout(() => {
                item.style.display = 'none'; //потом еще и исчезнет
            }, 400);
            // а)Создание блока с изображением
            let statusImg = document.createElement('img');
                statusImg.setAttribute('src', message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusImg.style.cssText = `
                display: block;
                margin: 0 auto`;
                statusMessage.appendChild(statusImg);
            // б)Создание блока с текстом
            let textMessage = document.createElement('div');
                textMessage.textContent = message.loading;
                textMessage.style.textAlign = 'center';
                statusMessage.appendChild(textMessage);

            // Cоздание форм-даты для отправки на сервер
            const formData = new FormData(item);
            let api; //переменная для формирования динамического пути для отправки данных
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question; //если у какого нибудь родителя формы есть класс popup-design то в api размещаем путь к дизайнеру, если же нет то к вопроснику
            console.log(api);

            //Выведение сообщений на страницу
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok); //рисунки статусов
                    textMessage.textContent = message.success; //плашка об успешности
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail); //рисунки статусов
                    textMessage.textContent = message.failure; //плашка о неудаче   
                })
                .finally(() => {
                    clearInputs(); //очищение полей после успешной/неуспешной отправки
                    setTimeout(() => {
                        statusMessage.remove(); //удаляем сообщение через 5 сек
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.remove('fadeInUp');
                        clearObject(state);  
                        document.querySelectorAll('.calc select').forEach(select => {
                            select.value = ''; //очистка формы с заказом
                        });   
                    }, 5000); 
                            
                }); 
        });
    });
};
export default forms;


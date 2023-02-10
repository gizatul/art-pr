import { postData } from "../services/requests";
const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
    function preventDefaults(e) {   
        e.preventDefault();
        e.stopPropagation(); //останавливает всплытие (bubbling) события “клик” к родительским элементам.
    }
    //Ф-я подсветки элемента
    function highLight(item) {
        item.closest('.file_upload').style.border = '3px solid #a12ab1';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .2)';
    }
    //Ф-я отключения подсветки элемента
    function unhighLight(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if (item.closest('.popup-content')) {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => { //когда файл впервые появляется над зоной(dragenter) и когда двигаем мышкой над dropArea(dragover) 
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => { //когда файл отпускаем в инпут(drop) или уводим мышку от нее (dragleve)
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            //input.files - в св-ве лежат файлы кот-е загрузил пользователь
            //e.dataTransfer.files - Объект DataTransfer используется для хранения данных, перетаскиваемых мышью во время операции drag and drop.
            //Моментальная отправка на сервер при дропе на главной странице
            if (input.closest('.main')) {
                e.preventDefault();
                e.stopPropagation();
                const formData = new FormData();
                console.log([...input.files]);
                [...input.files].forEach(file => {
                    formData.append('image', file);
                    postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(() => {
                        console.error('Не удалось загрузить');   
                    }); 
                });

            }

            let dots; // точки
            const arrName = input.files[0].name.split('.');
            arrName[0].length > 6 ? dots = '...' : dots = '.';
            const name = arrName[0].substring(0, 6) + dots + arrName[1];
            input.previousElementSibling.textContent = name;
        });
    });

};
export default drop;
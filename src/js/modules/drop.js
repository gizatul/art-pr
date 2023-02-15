import { postData } from "../services/requests";
import shortFileName from "./shortFileName";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
    
    function preventDefaults(e) {   
        e.preventDefault();
        e.stopPropagation(); 
    }
    
    function highLight(item) {
        item.closest('.file_upload').style.border = '3px solid #a12ab1';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .2)';
    }
    
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

    ['dragenter', 'dragover'].forEach(eventName => { 
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => { 
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

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

            shortFileName(input);
        });
    });
};
export default drop;
const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          tabs = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          contentAll = wrapper.querySelectorAll('.all'),
          contentNo = document.querySelector('.portfolio-no');
    // Ф-я фильтрации
    const typeFilter = (contentType) => {
        contentAll.forEach(item => {
            item.style.display = 'none'; //скрываем все элементы
            item.classList.remove('animated', 'fadeIn');

        });
        contentNo.style.display = "none"; //скрываем элемент
        contentNo.classList.remove('animated', 'fadeIn');

        if(contentType) { //если контент присутствует
            contentType.forEach(block => {
                block.style.display = 'block'; //показываем все элементы
                block.classList.add('animated', 'fadeIn');
            });
        } 
        if (contentType.length == 0) {
            contentNo.style.display = 'block';
            contentNo.classList.add('animated', 'fadeIn');
          }
    };

    //Добавление активности нужному табу
    menu.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == 'LI') {
            tabs.forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });

    menu.addEventListener('click', (e) => {
        let classSelect = e.target.classList[0]; //из класса выдергиваем первый класс
        let allElems = wrapper.querySelectorAll(`.${classSelect}`);
        typeFilter(allElems);
      });
    
};
export default filter;
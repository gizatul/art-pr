const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          tabs = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          contentAll = wrapper.querySelectorAll('.all'),
          contentNo = document.querySelector('.portfolio-no');
    
    const typeFilter = (contentType) => {
        contentAll.forEach(item => {
            item.style.display = 'none'; 
            item.classList.remove('animated', 'fadeIn');
        });

        contentNo.style.display = "none"; 
        contentNo.classList.remove('animated', 'fadeIn');

        if(contentType) { 
            contentType.forEach(block => {
                block.style.display = 'block'; 
                block.classList.add('animated', 'fadeIn');
            });
        } 
        if (contentType.length == 0) {
            contentNo.style.display = 'block';
            contentNo.classList.add('animated', 'fadeIn');
        }
    };

    menu.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == 'LI') {
            tabs.forEach(btn => {
                btn.classList.remove('active'); 
            });
            e.target.classList.add('active'); 
        }
        let classSelect = e.target.classList[0]; 
        typeFilter(wrapper.querySelectorAll(`.${classSelect}`)); 
    });
};
export default filter;
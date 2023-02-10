const accordion = (headSelector) => {
    const trigger = document.querySelectorAll(headSelector);
        
    trigger.forEach(item => {
        item.addEventListener('click', function() {
            //Ф-я по скрытию контента
            trigger.forEach(item => {
                if (!this.classList.contains('active-style')) {
                    item.classList.remove('active-style');
                    item.nextElementSibling.classList.remove('active-content');
                    item.nextElementSibling.style.maxHeight = '0px';
                }
            });

            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'; //ставим макс высоту
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
    
    
    
    
    // Реализация с помощью CSS
    // const content = document.querySelectorAll(blockSelector);
    // content.forEach(item => {
    //     item.classList.add('animated', 'fadeInDown');
    // });

    // trigger.forEach(item => {
    //     item.addEventListener('click', function() {
    //         if (!this.classList.contains('active')) {
    //             trigger.forEach(item => {
    //                 item.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });
}
export default accordion;
const accordion = (headSelector) => {
    const trigger = document.querySelectorAll(headSelector);
        
    trigger.forEach(item => {
        item.addEventListener('click', function() {
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
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'; 
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });  
}
export default accordion;
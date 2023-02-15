const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.style.opacity = '1';
        } else {
            upElem.style.opacity = '0';
        }
    });
    
    let links = document.querySelectorAll('[href^="#"]'), 
        speed = 0.2;

    links.forEach(link => {
        if (link.getAttribute('href') != '#') {
            link.addEventListener('click', function(e){
                e.preventDefault();
                let heightTop = document.documentElement.scrollTop,
                    hash = this.hash, 
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,  
                    start = null; 

                requestAnimationFrame(step);

                function step(frame) { 
                    if (start === null) { 
                        start = frame;
                    }

                    let progress = frame - start, 
                        r = (toBlock < 0 ? 
                            Math.max(heightTop - (progress / speed), heightTop + toBlock) :
                            Math.min(heightTop + (progress / speed, heightTop + toBlock)));
                    
                    document.documentElement.scrollTo(0, r); 
                    
                    if (r != heightTop + toBlock) { 
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash; 
                    }
                }
            });
        }
    });
};
export default scrolling;
let images = [{
        url: './images/projects/1.webp',
        title: ''
    }, {
        url: './images/projects/2.webp',
        title: ''
    }, {
        url: './images/projects/3.webp',
        title: ''
    }, {
        url: './images/projects/4.webp',
        title: ''
    },{
        url: './images/projects/5.webp',
        title: ''
    },{
        url: './images/projects/6.webp',
        title: ''
    },{
        url: './images/projects/7.webp',
        title: ''
    } 
];

function initSlider(images, options){

    if(!images || !images.length) return;
    
    options = options || {
        dots: false,
        titles: false,
        autoplay: false,
    };

    const sliderWrapper = document.querySelector('.slider');
    const sliderImages = document.querySelector('.slider__images');
    const sliderArrow = document.querySelector('.slider__arrows');

    initImages();
    initArrows();

    if(options.dots){
        initDots();
    };

    if(options.titles){
        initTitles();
    };

    if(options.autoplay){
        initAutoplay();
    };

    function initAutoplay() {        
        setInterval(() => {
            let curNumber = +sliderImages.querySelector('.active').dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.autoplayTime)
    };

    function initImages() {
        images.forEach((image, index) => {
            let imageElement = document.createElement('div');
            imageElement.className = `image n${index} ${index ? '' : 'active'}`;
            imageElement.dataset.index = index;
            imageElement.style.backgroundImage = `url(${image.url})`;
            sliderImages.appendChild(imageElement);
        });            
    };

    function initArrows() {
        let lastIndex = images.length - 1;
        sliderArrow.querySelectorAll('.arrow').forEach(arrow =>{
            arrow.addEventListener('click', function(){            
                let curNumber = +sliderImages.querySelector('.active').dataset.index;
                let nextNumber;
                if(arrow.classList.contains('left')){
                    nextNumber = curNumber === 0 ? lastIndex : curNumber - 1;
                } else {
                    nextNumber = curNumber === lastIndex ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    };
    
    function moveSlider(num){
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector(`.n${num}`).classList.add('active');

        if(options.dots){
            let dotsWrapper = document.querySelector('.slider__dots');
            dotsWrapper.querySelector('.active').classList.remove('active');
            dotsWrapper.querySelector(`.n${num}`).classList.add('active');
        };

        if(options.titles){
            let title = sliderImages.querySelector('.slider__images-title');
            if(images[num].title){
                title.innerHTML = images[num].title;
                title.style.display = 'block';
            } else {
                title.style.display = 'none';
            };            
        };
    };

    function initDots() {
        let dotsWrapper = document.createElement('div');
        dotsWrapper.className = 'slider__dots';
        images.forEach((image, index) => {
            let dot = document.createElement('div');
            dot.className = `dot n${index} ${index ? '' : 'active'}`;
            dot.dataset.index = index;
            dot.addEventListener('click', function(){
                moveSlider(this.dataset.index);                
            });
            dotsWrapper.appendChild(dot);
        });
        sliderWrapper.appendChild(dotsWrapper);
    };

    function initTitles() {
        let titleHTML = `<div class="slider__images-title">${images[0].title}</div>`;
        sliderImages.innerHTML += titleHTML;
    };   
}

document.addEventListener('DOMContentLoaded', function(){
    let sliderOptions = {
        dots: true,
        titles: false,
        autoplay: true,
        autoplayTime: 2000,
    }

    initSlider(images, sliderOptions);
});
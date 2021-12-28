(function (window) {

    function slideshowLibrary() {

        let slideshowObject = {

            start: init,

            effect: "sliding",

            autoplay: false,

            delay: 3000,

            title: '',

        }

        function init(selector) {

            const slides = document.querySelector(selector);

            const delay = slideshowObject.delay;

            slides.classList.add(slideshowObject.effect);

            // Bordures d'images
            // var imgs = document.querySelectorAll(`${selector} > img`);

            // for( var i = 0; i < imgs.length; i++ ) {
            //     imgs[i].style.border = `${borderSize}px solid ${borderColor}`;
            //     imgs[i].style.padding = `${borderSize}px`;
            // }

            // const slidesCount = slides.childElementCount;
            const slidesCount = slides.getElementsByTagName("img").length;

            const titleBox = document.querySelector(`${selector} > .title-box`);

            if (slideshowObject.title !== '') {

                titleBox.style.width = `${slidesCount * 100}%`;

                titleBox.innerHTML += `${slideshowObject.title}`;

            } else {

                titleBox.style.display = "none";

            }

            const maxLeft = (slidesCount - 1) * 100 * -1;

            let current = 0;

            function changeSlide(next = true) {
                if (next) {
                    current += current > maxLeft ? -100 : current * -1;
                    
                } else {
                    current = current < 0 ? current + 100 : maxLeft;
                }

                slides.style.left = current + "%";
                console.log(current);

                titleBox.style.top = current + "%";

            }

            if (slideshowObject.autoplay !== false) {

                let autoChange = setInterval(changeSlide, delay);
                
                const restart = function() {
                        clearInterval(autoChange);
                        autoChange = setInterval(changeSlide, delay);
                };

                document.querySelector(".next-slide").addEventListener("click", function() {
                    changeSlide();
                    restart();
                });

                document.querySelector(".prev-slide").addEventListener("click", function() {
                    changeSlide(false);
                    restart();
                });

            } else {

                document.querySelector(".next-slide").addEventListener("click", function() {
                    changeSlide();
                });

                document.querySelector(".prev-slide").addEventListener("click", function() {
                    changeSlide(false);
                });

            }

        }
        return slideshowObject;
    }

    if (typeof window.SlideshowGlobalLibrary === "undefined") {
        window.GlobalSlideshowLibrary = slideshowLibrary();
    }
})(window);

export default GlobalSlideshowLibrary;
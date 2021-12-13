import * as $ from 'jquery';
import * as slider from 'slick-carousel';
import changeProgress from "./player";
import '../styles/style.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

window.addEventListener('DOMContentLoaded', () => {
//////////////////////////// Welcome section slider ////////////////////////////////

    const slider = $('.welcome__slider');
    const slidesCount = $('.welcome__slider-item');

    $('.progress-input').on('input', changeProgress);

    $('.volume-input').on('input', changeProgress);

    slider.slick({
        draggable: true,
        swipeToSlide: true,
        arrows: true,
        dots: true,
        speed: 1000,
        appendDots: $('.welcome__slider-dots'),
        appendArrows: $('.welcome__slider-arrows')
    });

    $('#slides-count').text(`0${slidesCount.length}`);

    slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#current-slide').text(`0${nextSlide + 1}`);
    });

//////////////////////////// Explore section slider ////////////////////////////////

    (function() {
        const exploreSlider = document.querySelector('.explore__slider');
        const before = exploreSlider.querySelector('.before');
        const compare = exploreSlider.querySelector('.compare');
        const startWidth = exploreSlider.getBoundingClientRect().x;
        const compareWidth = compare.offsetWidth;
        const sliderWidth = exploreSlider.offsetWidth;

        function moveHandle (e) {
            // if (Math.floor(Number(compare.style.left.slice(0, 3))) < sliderWidth - compareWidth) {
            //     console.log(compare.style.left);

            compare.style.left = `${e.clientX - startWidth}px`;
            before.style.width = `${e.clientX  - startWidth + (compareWidth / 2)}px`;
            // }
        }

        compare.addEventListener('mousedown', () => {
            exploreSlider.addEventListener('mousemove', moveHandle)
        });

        exploreSlider.addEventListener('mouseup', () => {
            exploreSlider.removeEventListener('mousemove', moveHandle)
        });
    })();

////////////////////////////// Video section slider ////////////////////////////////

    const videoSlider = $('.video__slider');

    videoSlider.slick({
        draggable: true,
        swipeToSlide: true,
        arrows: true,
        dots: true,
        speed: 1000,
        appendDots: $('.video__slider-dots'),
        appendArrows: $('.video__slider-arrows'),
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

//////////////////////////// Booking tickets form /////////////////////////////////

    const formCloser = document.querySelector('.close');
    const formOpener = document.querySelector('.buy');
    const form = document.querySelector('.booking-tickets');
    const overlay = document.querySelector('.overlay');

    function openForm() {
        form.style.left = '0';
    }

    function closeForm() {
        form.style.left = '-200vw';
    }

    formOpener.addEventListener('click', openForm);
    formCloser.addEventListener('click', closeForm);
    form.addEventListener('click', (e) => {
        if (e.target === form) {
            closeForm();
        }
    });

//////////////////////////// Gallery /////////////////////////////////

    const gallery = Array.from(document.querySelector('.picture-inner-container').children);
    let array = [];

    for (let n = 1; n <= 15; n++) {
        array.push(`img/galery/galery${n}.jpg`);
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    gallery.forEach((picture, i) => {
        picture.src = array[i];
    });

    // Animation:

    const gallerySectionImages = document.querySelectorAll('.gallery__picture');

    if (gallerySectionImages.length > 0) {
        window.addEventListener('scroll', showImagesOnScroll);

        function showImagesOnScroll() {
            gallerySectionImages.forEach(gallerySectionImage => {
                const galleryImageHeight = gallerySectionImage.offsetHeight;
                const galleryImageOffset = offset(gallerySectionImage).top;
                const animStart = 8;

                let imagePoint = window.innerHeight - galleryImageHeight / animStart;
                if (galleryImageHeight > window.innerHeight) {
                    imagePoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > galleryImageOffset - imagePoint) && pageYOffset < (galleryImageOffset + galleryImageHeight)) {
                    gallerySectionImage.classList.add('gallery__picture-active');
                } else {
                    gallerySectionImage.classList.remove('gallery__picture-active');
                }
            })
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
    }

//////////////////////////// Map /////////////////////////////////////

    mapboxgl.accessToken = 'pk.eyJ1IjoibmVrb2d1YXJkIiwiYSI6ImNrdWZpN2RoNTE2N24ybnJ2NGVxMTN3bTEifQ.SYHfKPsPLWKvg95LMHrUsw';

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        center: [2.3364, 48.86091], // starting position [lng, lat]
        zoom: 15.75, // starting zoom
    });

    const mapNav = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true
    });

    map.addControl(mapNav, 'top-right');

    const marker1 = new mapboxgl.Marker({ color: '#101010' })
        .setLngLat([2.3364, 48.86091])
        .addTo(map);

    const marker2 = new mapboxgl.Marker({ color: '#767676' })
        .setLngLat([2.3333, 48.8602])
        .addTo(map);

    const marker3 = new mapboxgl.Marker({ color: '#767676' })
        .setLngLat([2.3397, 48.8607])
        .addTo(map);

    const marker4 = new mapboxgl.Marker({ color: '#767676' })
        .setLngLat([2.3330, 48.8619])
        .addTo(map);

    const marker5 = new mapboxgl.Marker({ color: '#767676' })
        .setLngLat([2.3365, 48.8625])
        .addTo(map);

//////////////////////////////// Form validation //////////////////////////

    const ticketsForm = document.querySelector('.booking-tickets__form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    let nameMessage = document.querySelector('.name-message');
    let emailMessage = document.querySelector('.email-message');
    let phoneMessage = document.querySelector('.phone-message');

    nameInput.addEventListener('input', (e) => {
        // Каждый раз, когда пользователь что-то вводит, мы проверяем, являются ли поля формы валидными
        if (nameInput.validity.valid) {
            // Если на момент валидации какое-то сообщение об ошибке уже отображается, если поле валидно, удаляем сообщение
            nameMessage.textContent = ''; // Сбросить содержимое сообщения
            nameMessage.style.display = 'none'; // Сбросить визуальное состояние сообщения
        } else {
            // Если поле не валидно, показываем правильную ошибку
            showError();
        }
    });

    emailInput.addEventListener('input', (e) => {
        if (emailInput.validity.valid) {
            emailMessage.textContent = '';
            emailMessage.style.display = 'none';
        } else {
            showError();
        }
    });

    phoneInput.addEventListener('input', (e) => {
        if (phoneInput.validity.valid) {
            phoneMessage.textContent = '';
            phoneMessage.style.display = 'none';
        } else {
            showError();
        }
    });

    ticketsForm.addEventListener('submit', (e) => {
        if(!nameInput.validity.valid || !emailInput.validity.valid || !phoneInput.validity.valid) {
            // Если какое-либо поле не валидно, отображаем соответствующее сообщение об ошибке
            showError();
            // Затем предотвращаем стандартное событие отправки формы
            e.preventDefault();
        }
    })

    function showError() {
        if(nameInput.validity.valueMissing) {
            // Если поле пустое, отображаем следующее сообщение об ошибке
            nameMessage.textContent = 'Please enter your name';
            nameMessage.style.display = 'block'; // Отображаем блок с ошибкой
        } else if (emailInput.validity.valueMissing) {
            emailMessage.textContent = 'Please enter your email';
            emailMessage.style.display = 'block'; // Отображаем блок с ошибкой
        } else if (phoneInput.validity.valueMissing) {
            phoneMessage.textContent = 'Please enter your phone';
            phoneMessage.style.display = 'block'; // Отображаем блок с ошибкой
        } else if(nameInput.validity.tooShort) {
            // Если содержимое слишком короткое, отображаем следующее сообщение об ошибке
            nameMessage.textContent = `Name should be at least ${ nameInput.minLength } characters`;
            nameMessage.style.display = 'block'; // Отображаем блок с ошибкой
        } else if(nameInput.validity.patternMismatch) {
            // Если содержимое не соответствует шаблону, отображаем следующее сообщение об ошибке
            nameMessage.textContent = 'Name should contain only letters and spaces';
            nameMessage.style.display = 'block'; // Отображаем блок с ошибкой
        } else if(emailInput.validity.patternMismatch) {
            // Если содержимое не соответствует шаблону, отображаем следующее сообщение об ошибке
            emailMessage.textContent = 'E-mail must look like username@example.com';
            emailMessage.style.display = 'block'; // Отображаем блок с ошибкой
        } else if(phoneInput.validity.patternMismatch) {
            // Если содержимое не соответствует шаблону, отображаем следующее сообщение об ошибке
            phoneMessage.textContent = 'Phone number must be no longer than 10 characters and contain only numbers';
            phoneMessage.style.display = 'block'; // Отображаем блок с ошибкой
        }
    }

///////////////////////////// Tickets calculator ////////////////////////////

    const ticketsPermanent = document.querySelector('.permanent');
    const ticketsTemporary = document.querySelector('.temporary');
    const ticketsCombined= document.querySelector('.combined');
    const basicTicketsCount= document.querySelector('.basic-count');
    const seniorTicketsCount= document.querySelector('.senior-count');
    const totalSum = document.getElementById('tickets-total-sum');
    let sum = 0;



///////////////////////////// Video player ////////////////////////////

    const player = document.querySelector('.player');
    const video = player.querySelector('.video');
    const videoPlayToggle = player.querySelector('.video-play');
    const playerControls = player.querySelector('.player__controls');
    const progressInput = playerControls.querySelector('.progress-input');
    const volumeInput = playerControls.querySelector('.volume-input');
    const controlsPlayToggle = playerControls.querySelector('.controls__play');
    const controlsPlayToggleImg = controlsPlayToggle.querySelector('img');
    const controlsVolumeToggle = playerControls.querySelector('.controls__volume');
    const controlsVolumeToggleImg = controlsVolumeToggle.querySelector('img');
    const controlsFullscreen = playerControls.querySelector('.controls__fullscreen');
    const controlsFullscreenImg = controlsFullscreen.querySelector('img');

    function togglePlay() {
        if (video.paused) {
            video.play();
            console.log(video.volume);
            videoPlayToggle.style.display = 'none';
            controlsPlayToggleImg.src = 'svg/pause-real.svg';
        } else {
            video.pause();
            videoPlayToggle.style.display = 'block';
            controlsPlayToggleImg.src = 'svg/pause.svg';
        }
    }

    function handleProgress() {
        progressInput.value = (video.currentTime / video.duration) * 100;
        progressInput.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressInput.value}%, #fff ${progressInput.value}%, white 100%)`;
    }

    function handleSound() {
        video.volume = volumeInput.value;
        volumeInput.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeInput.value * 100}%, #fff ${volumeInput.value * 100}%, white 100%)`;

        if (video.volume === 0.0) {
            controlsVolumeToggleImg.src = 'svg/mute.svg';
        } else {
            controlsVolumeToggleImg.src = 'svg/vol.svg';
        }
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progressInput.offsetWidth) * video.duration;
        video.currentTime = scrubTime;

        if (video.currentTime === video.duration) {
            togglePlay();
        }
    }

    function fullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        }
    }

    controlsFullscreen.addEventListener('click', function() {
        controlsFullscreenImg.src = 'svg/fullscreen_exit.svg';
        fullscreen(player);
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyF') {
            event.preventDefault();
            controlsFullscreenImg.src = 'svg/fullscreen_exit.svg';
            fullscreen(player);
        }
    });

    if (document.fullscreenEnabled) {
        controlsFullscreen.addEventListener('click', function() {
            document.exitFullscreen().catch(err => Promise.resolve(err));
            controlsFullscreenImg.src = 'svg/fullscr.svg';
        });

        document.addEventListener('keydown', function(event) {
            if (event.code === 'KeyF') {
                event.preventDefault();
                document.exitFullscreen().catch(err => Promise.resolve(err));
                controlsFullscreenImg.src = 'svg/fullscr.svg';
            }
        });
    }

    video.addEventListener('click', togglePlay);

    video.addEventListener('timeupdate', handleProgress);

    volumeInput.addEventListener('input', handleSound);

    videoPlayToggle.addEventListener('click', togglePlay);

    controlsPlayToggle.addEventListener('click', togglePlay);

    progressInput.addEventListener('click', scrub);

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            togglePlay();
        }
    });
});
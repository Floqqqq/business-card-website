// Конфигурация анимации
const ANIMATION_CONFIG = {
  triggerOffset: 0,    // Когда начинать анимацию (px)
  scatterDistance: 420,  // Базовая дистанция разлета (px)
  distanceRandom: 50,    // Случайное добавление к дистанции (px)
  rotationRange: 60,     // Диапазон вращения (градусы)
  scatterDelay: 150,     // Задержка между словами (ms)
  resetDelay: 100        // Задержка при возврате (ms)
};

// Направления для разлета каждого слова
const SCATTER_DIRECTIONS = [
  { x: -0.8, y: -0.6 }, // Вверх-влево
  { x: 0.8, y: -0.5 },  // Вверх-вправо
  { x: -0.7, y: 0.5 },  // Вниз-влево
  { x: 0.9, y: 0.6 }    // Вниз-вправо
];

// Начальные углы поворота для слов
const INITIAL_ROTATIONS = [-5, 3, -2, 4];

document.addEventListener('DOMContentLoaded', function() {
  const words = document.querySelectorAll('.word');
  let animationStarted = false;
  
  // Инициализация - показ слов
  function initWords() {
    setTimeout(() => {
      words.forEach(word => {
        word.classList.add('show');
      });
    }, 500);
  }

  // Анимация разлета слов
  function scatterWords() {
    words.forEach((word, index) => {
      setTimeout(() => {
        const direction = SCATTER_DIRECTIONS[index];
        const distance = ANIMATION_CONFIG.scatterDistance + 
                        Math.random() * ANIMATION_CONFIG.distanceRandom;
        const rotation = (Math.random() - 0.5) * ANIMATION_CONFIG.rotationRange;
        
        word.style.transform = `
          translateX(calc(-50% + ${direction.x * distance}px))
          translateY(${direction.y * distance}px)
          rotate(${rotation}deg)
        `;
        word.style.opacity = '0.8';
      }, index * ANIMATION_CONFIG.scatterDelay);
    });
  }

  // Возврат слов в исходное положение
  function resetWords() {
    words.forEach((word, index) => {
      setTimeout(() => {
        word.style.transform = `
          translateX(-50%) 
          rotate(${INITIAL_ROTATIONS[index]}deg)
        `;
        word.style.opacity = '1';
      }, index * ANIMATION_CONFIG.resetDelay);
    });
  }

  // Оптимизированный обработчик скролла
  function setupScrollHandler() {
    let lastScrollY = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (lastScrollY > ANIMATION_CONFIG.triggerOffset && !animationStarted) {
            animationStarted = true;
            scatterWords();
          } 
          else if (lastScrollY <= ANIMATION_CONFIG.triggerOffset && animationStarted) {
            animationStarted = false;
            resetWords();
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Инициализация
  initWords();
  setupScrollHandler();
});
//----------------
const slider = document.querySelector('.slider');

const prevButton = document.querySelector('.prev-button');

const nextButton = document.querySelector('.next-button');

const slides = Array.from(slider.querySelectorAll('img'));

const slideCount = slides.length;

let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок

prevButton.addEventListener('click', showPreviousSlide);

nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда

function showPreviousSlide() {

  slideIndex = (slideIndex - 1 + slideCount) % slideCount;

  updateSlider();

}

// Функция для показа следующего слайда

function showNextSlide() {

  slideIndex = (slideIndex + 1) % slideCount;

  updateSlider();

}

// Функция для обновления отображения слайдера

function updateSlider() {

  slides.forEach((slide, index) => {

    if (index === slideIndex) {

      slide.style.display = 'block';

    } else {

      slide.style.display = 'none';

    }

  });

}

// Инициализация слайдера

updateSlider();
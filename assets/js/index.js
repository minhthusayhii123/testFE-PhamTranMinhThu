const slideItems = document.querySelectorAll(".slider-item");
const imgs = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".btnPrev");
const btnNext = document.querySelector(".btnNext");
const length = imgs.length;
let current = 0;

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel-1");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];


let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const handleChangSlide = () => {
  if (current == length - 1) {
    current = 0;
  } else {
    current++;
  }
  let width = imgs[0].offsetWidth;
  slideItems.forEach((item) => {
    item.style.transform = `translateX(${-width * current}px)`;
  });
};

btnNext.addEventListener("click", () => {
  clearInterval(handleEventChangSlide);
  handleChangSlide();
  handleEventChangSlide = setInterval(handleChangSlide, 4000);
});

btnPrev.addEventListener("click", () => {
  if (current === 0) {
    current = length - 1;
  } else {
    current--;
  }
  let width = imgs[0].offsetWidth;
  slideItems.forEach((item) => {
    item.style.transform = `translateX(${-width * current}px)`;
  });
});

let handleEventChangSlide = setInterval(handleChangSlide, 4000);

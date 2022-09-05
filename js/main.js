// swiper 
const workSwiper = new Swiper('.work__slider', {
  slidesPerView: 3,
  initialSlide: 1,
  centeredSlides: true,
  loop: true,
  setWrapperSize: true,
  spaceBetween: -32,
  speed: 700,
  pagination: {
    el: ".work__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.work__next',
    prevEl: '.work__prev',
  },
});

const workSwiper2 = new Swiper('.work-gallery__slider', {
  loop: true,
  setWrapperSize: true,
  speed: 700,
  navigation: {
    nextEl: '.work-gallery__next',
    prevEl: '.work-gallery__prev',
  },
});



const locationSwiper = new Swiper('.locations__slider', {
  slidesPerView: 3,
  initialSlide: 1,
  centeredSlides: true,
  loop: true,
  spaceBetween: 27,
  speed: 700,
  navigation: {
    nextEl: '.locations__next',
    prevEl: '.locations__prev',
  },
});

const locationSwiper2 = new Swiper('.locations-gallery__slider', {
  loop: true,
  setWrapperSize: true,
  speed: 700,
  navigation: {
    nextEl: '.locations-gallery__next',
    prevEl: '.locations-gallery__prev',
  },
});


const reviewsSwiper = new Swiper('.reviews__slider', {
  slidesPerView: 3,
  initialSlide: 1,
  centeredSlides: true,
  loop: true,
  spaceBetween: 16,
  speed: 700,
  navigation: {
    nextEl: '.reviews__next',
    prevEl: '.reviews__prev',
  },
});


// accordion
let buttons = Array.from(document.querySelectorAll('.info__more'))

buttons.forEach((box) => {
  box.addEventListener('click', boxHandler)
})

function boxHandler(e) {
  e.preventDefault();
  let currentBox = e.target.closest('.accordion')
  let currentHead = currentBox.querySelector('.accordion__head')
  let currentContent = currentBox.querySelector('.info__panel')
  currentBox.classList.toggle("accordion-active")
  if (currentBox.classList.contains("accordion-active")) {

    currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    currentBox.querySelector('.info__btn').innerHTML = `Скрыть`;
    currentHead.lastElementChild.style.display = 'none'
  } else {
    currentContent.style.maxHeight = 0
    currentBox.querySelector('.info__btn').innerHTML = 'Подробнее';
    currentHead.lastElementChild.style.display = 'block'
  }
}


// modal
let modalBtns = document.querySelectorAll('.modal-open');
let modals = document.querySelectorAll('.modal');
let body = document.body;

function openModal(elem) {
  elem.classList.add('modal-active')
  body.classList.add('_locked')
  }

  function closeModal(e) {
    if(e.target.classList.contains('modal__close') || e.target.closest('.modal__close') || e.target.classList.contains('modal__bg')) {
      e.target.closest('.modal').classList.remove('modal-active')
      body.classList.remove('_locked')
    }
    }

modalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let data = e.target.dataset.modalOpen
    modals.forEach(modal => {
      if(modal.classList.contains('modal-active')) {
        modal.classList.remove('modal-active')
      }
      if(modal.dataset.modal == data || modal.dataset.modal == e.target.closest('.modal-open').dataset.modalOpen) {
        openModal(modal)
      }
    })
  })
})

modals.forEach(modal => {
  modal.addEventListener('click', e => closeModal(e))
})

window.addEventListener('keydown', e=> {
  modals.forEach(modal => {
    if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
      modal.classList.remove('modal-active')
      body.classList.remove('_locked')
    }
  })
})


// select
let selectHeader = document.querySelectorAll('.select__header')
let selectItems = document.querySelectorAll('.select__item')

selectHeader.forEach(elem => {
  elem.addEventListener('click', e => {
    let currentSelect = e.target.closest('.select')
    let currentBody = currentSelect.querySelector('.select__body')
    currentSelect.classList.toggle('select-active')
    if(currentSelect.classList.contains('select-active')) {
      currentBody.style.maxHeight = currentBody.scrollHeight + 'px' 
    } else {
      currentBody.style.maxHeight = 0
    }
  })
})


selectItems.forEach(elem => {
  elem.addEventListener('click', e => {
    let select = e.target.closest('.select')
    let currentItem = e.target
    let currentSelect = select.querySelector('.select__current')
    let currentBody = select.querySelector('.select__body')
    currentSelect.innerHTML = currentItem.innerHTML
    select.classList.toggle('select-active')
    currentBody.style.maxHeight = 0
    if(currentSelect.classList.contains('select__text')) {
      currentSelect.classList.remove('select__text')
    }
  })
})


// extra 

priceBtns = document.querySelectorAll('.price__extra-item')
priceBtns.forEach(btn => {
let initialSum = btn.closest('.price__item').querySelector('.price__item-sum').innerHTML
    btn.addEventListener('click', e => {
      currentItem = e.target.closest('.price__item')
      currentSum = currentItem.querySelector('.price__item-sum').innerHTML
      if(currentItem.querySelector('.extra-visagiste')) {
        var sum = currentItem.querySelector('.extra-visagiste').innerHTML
      }
      
  if(btn.classList.contains('extra-retouch')) {
    if(currentItem.querySelector('.extra-retouch').classList.contains('active')) {
      currentSum = initialSum
      if(currentItem.querySelector('.extra-visagiste')&&currentItem.querySelector('.extra-visagiste').classList.contains('active')) {
        currentSum = +initialSum + +sum.match(/\d/g).join('') 
      }
    }
      if(currentSum == 'N') {
        currentSum = 0
        }
      let modal = document.querySelector('.modal-active');
      let input = modal.querySelector('.form__input')
      input.addEventListener('keyup', function() {
        if(input.value.length>3) {
          input.value = input.value.slice(0,3)
        }
      })
  }

  if(!e.target.classList.contains('extra-retouch')) {
    e.target.closest('.price__extra-item').classList.toggle('active')
    if(e.target.classList.contains('extra-visagiste')) {
        currentItem = e.target.closest('.price__item')
      if(e.target.classList.contains('active')) {
        currentItem.querySelector('.price__item-sum').innerHTML = +currentSum + +sum.match(/\d/g).join('') 
      } else {
        currentItem.querySelector('.price__item-sum').innerHTML =  currentSum - +sum.match(/\d/g).join('') 
      }
    }
  }
  })
})


let saveBtn = document.querySelector('.save');
saveBtn.addEventListener('click', e => {
  let modal = document.querySelector('.modal-active');
  let amount = +modal.querySelector('.form__input').value
  let current = +currentSum + amount*250
  if(amount>=0&&amount<=500) {
    currentItem.querySelector('.price__item-sum').innerHTML = current
    modal.classList.remove('modal-active')
  } else {
    alert('Введите число от 0 до 500')
  }

  if(amount!=0) {
    currentItem.querySelector('.extra-retouch').classList.add('active')
  } else {
    currentItem.querySelector('.extra-retouch').classList.remove('active')
  }
})


// add photo 

let btn = document.querySelector('.form__review-img')
btn.addEventListener('click', readFile)

function readFile() {
  let input = document.createElement('input');
  input.type = 'file';
  input.click();
}
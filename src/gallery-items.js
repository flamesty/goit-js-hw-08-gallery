import images from './massive.js'



const gallaryContainer = document.querySelector(".js-gallery");

const modal = document.querySelector(".js-lightbox");

const modalClose = document.querySelector('[data-action="close-lightbox"]');

const modalOriginalImage = document.querySelector(".lightbox__image")


// Added murkup gallery


const imgMarkup = createImageCardsMarkup(images);

gallaryContainer.innerHTML = imgMarkup;



function createImageCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {

      return `
         <li class="gallery__item">
            <a
                class="gallery__link"
             href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
         </li >
            `;

    })
    .join('');
}





// Opened modal

gallaryContainer.addEventListener('click', onGallaryContainerClick)


function onGallaryContainerClick(event) {

  event.preventDefault()

  const isImageSwatchEl = event.target.classList.contains("gallery__image")

  if (!isImageSwatchEl) {
    return
  }

  const urlOrigImg = event.target.dataset.source;

  modal.classList.add("is-open");

  modalOriginalImage.src = urlOrigImg

  console.log(urlOrigImg);
}



// Closed modal 

modalClose.addEventListener('click', onModalCloseClick);

function onModalCloseClick(_event) {

  modal.classList.remove("is-open");

  modalOriginalImage.src = ''

  // console.log("close", modalClose);
}


// Closed modal esc.

document.addEventListener('keydown', escModalClose);
function escModalClose(event) {
  if (event.keyCode === 27) {
    modal.classList.remove("is-open")
    modalOriginalImage.src = ''
  };
  return
};



// // Закрытие модалки кликом по полю модалки ---------------------

modal.addEventListener('click', onOutModalWindowClick);

function onOutModalWindowClick(event) {
  const isModalImageEl = event.target.classList.contains("lightbox__image");
  if (isModalImageEl) {
    return
  }
  modal.classList.remove("is-open");
  modalOriginalImage.src = ''
}
// //---------------------------------------------------------------
// // Слайдшоу стрелками  ArrowLeft || ArrowRight---------------------

const arrImgs = [];
images.forEach(({ original }) => {
  arrImgs.push(original);

})
console.log(arrImgs);

document.addEventListener('keydown', onBtnArrClick);
function onBtnArrClick(event) {
  let newImgIndx;
  const currentImgId = arrImgs.indexOf(modalOriginalImage.src);
  if (event.key === 'ArrowLeft') {
    if (currentImgId > -1) {
      newImgIndx = currentImgId - 1;
    }
    if (newImgIndx === -1) {
      newImgIndx = arrImgs.length - 1;
    }
  } else if (event.key === 'ArrowRight' || 'Space') {
    newImgIndx = currentImgId + 1;
    if (newImgIndx === arrImgs.length) {
      newImgIndx = 0;
    }
  }

  modalOriginalImage.src = arrImgs[newImgIndx];
};

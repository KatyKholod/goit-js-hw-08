import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

galleryContainer.addEventListener('click', onImgClick);

function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
  </a>
</div>`;}).join('');}

function onImgClick(evt) {
  evt.preventDefault();
  const isItemImage = evt.target.classList.contains('gallery__image');
  if (!isItemImage) return;

  const currentImgUrl = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${currentImgUrl}" width="1280px" height="1280px"/>`,
    { onShow: (instance) => {window.addEventListener('keydown', onEscKeyPress);},
      onClose: (instance) => {window.removeEventListener('keydown', onEscKeyPress);},
    }); instance.show();

  function onEscKeyPress(evt) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = evt.code === ESC_KEY_CODE;
    if (!isEscKey) return;
    instance.close();}}
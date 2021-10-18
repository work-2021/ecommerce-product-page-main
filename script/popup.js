let nextBtnLayer = document.getElementById('nextLayer');
let prevBtnLayer = document.getElementById('prevLayer');
let imagesSliderLayer = document.querySelectorAll('.layer .img-content img');
let myUlLayer = document.getElementById('myUlLayer');
let currentSlideLayer = 0;
let contentLayer = '';
for (let i = 0; i < imagesSliderLayer.length; i++) {
  if (i == 0) {
    contentLayer += `
        <li class='active' data-index='${i}'><img src='./images/image-product-${i+1}-thumbnail.jpg' alt='thumbnail image'/></li>
      `;
  } else {
    contentLayer += `
        <li data-index='${i}'><img src='./images/image-product-${i+1}-thumbnail.jpg' alt='thumbnail image'/></li>
      `;
  }
  myUlLayer.innerHTML = contentLayer;
}
nextBtnLayer.onclick = () => {
  if (!nextBtnLayer.classList.contains('disable')) {
    currentSlideLayer++;
    checkerLayer();
  }
};
prevBtnLayer.onclick = () => {
  if (!prevBtnLayer.classList.contains('disable')) {
    currentSlideLayer--;
    checkerLayer();
  }
};
for (let i = 0; i < myUlLayer.children.length; i++) {
  myUlLayer.children[i].addEventListener('click',() => {
    currentSlideLayer = myUlLayer.children[i].getAttribute('data-index') ;
    checkerLayer();
  });
}
function checkerLayer() {
  removeAllActiveLayer();
  myUlLayer.children[currentSlideLayer].classList.add('active');
  imagesSliderLayer[currentSlideLayer].classList.add('show');
  if (currentSlideLayer == 0) {
    prevBtnLayer.classList.add('disable');
  } else {
    prevBtnLayer.classList.remove('disable');
  }
  if (currentSlideLayer == imagesSliderLayer.length- 1) {
    nextBtnLayer.classList.add('disable');
  } else {
    nextBtnLayer.classList.remove('disable');
  }
}

function removeAllActiveLayer() {
  imagesSliderLayer.forEach((el) => {
    el.classList.remove('show');
  });
  for (let i = 0; i < myUlLayer.children.length; i++) {
    myUlLayer.children[i].classList.remove('active');
  }
}
let layerPopup = document.querySelector('.layer');
let closePopup = document.getElementById('closeLayer');
let ss = document.querySelectorAll('section .slider .img-content img');
closePopup.onclick = () => {
  layerPopup.classList.remove('open') ;
};
ss.forEach((el) => {
  el.addEventListener('click',(e) => {
    layerPopup.classList.add('open');
  });
});
let closeBtn = document.querySelector('header nav .bullets img');
let bullets = document.querySelector('header nav .bullets');
let layer = document.querySelector('.layerNav');
let showBtn = document.querySelector('header nav > img:first-of-type');
let showCart = document.querySelector('header nav .account img:first-of-type');
let cart = document.querySelector('header nav .show-cart');
let countInCart = document.querySelector('header nav .account span');
closeBtn.onclick = () => {
  bullets.classList.remove('open');
  layer.classList.remove('open');
};
showBtn.onclick = () => {
  bullets.classList.add('open');
  layer.classList.add('open');
};
layer.onclick = (e) => {
  closeBtn.click();
};
showCart.onclick = () => {
  cart.classList.toggle('open');
  if (cart.classList.contains('open')) {
    countInCart.classList.add('show');
  } else {
    countInCart.classList.remove('show');
  }
};
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let imagesSlider = document.querySelectorAll('section .img-content img');
let myUl = document.getElementById('myUl');
let currentSlide = 0;
let content = '';
for (let i = 0; i < imagesSlider.length; i++) {
  if (i == 0) {
    content += `
        <li class='active' data-index='${i}'><img src='./images/image-product-${i+1}-thumbnail.jpg' alt='thumbnail image'/></li>
      `;
  } else {
    content += `
        <li data-index='${i}'><img src='./images/image-product-${i+1}-thumbnail.jpg' alt='thumbnail image'/></li>
      `;
  }
  myUl.innerHTML = content;
}
nextBtn.onclick = () => {
  if (!nextBtn.classList.contains('disable')) {
    currentSlide++;
    checker();
  }
};
prevBtn.onclick = () => {
  if (!prevBtn.classList.contains('disable')) {
    currentSlide--;
    checker();
  }
};
for (let i = 0; i < myUl.children.length; i++) {
  myUl.children[i].addEventListener('click',() => {
    currentSlide = myUl.children[i].getAttribute('data-index') ;
    checker();
  });
}
function checker() {
  removeAllActive();
  myUl.children[currentSlide].classList.add('active');
  imagesSlider[currentSlide].classList.add('show');
  if (currentSlide == 0) {
    prevBtn.classList.add('disable');
  } else {
    prevBtn.classList.remove('disable');
  }
  if (currentSlide == imagesSlider.length- 1) {
    nextBtn.classList.add('disable');
  } else {
    nextBtn.classList.remove('disable');
  }
}

function removeAllActive() {
  imagesSlider.forEach((el) => {
    el.classList.remove('show');
  });
  for (let i = 0; i < myUl.children.length; i++) {
    myUl.children[i].classList.remove('active');
  }
}
let originalPrice = document.getElementById('orginial');
let disaccount = document.getElementById('disaccount');
let finalPrice = document.getElementById('final');

let op = parseFloat(originalPrice.textContent.slice(1));
let da = parseInt(disaccount.textContent.slice(0, -1));
function calcFinalPrice(original, disaccount) {
   return (original * disaccount) / 100 ;
}
finalPrice.textContent = '$' + calcFinalPrice(op,da).toFixed(2) ;
let minusBtn = document.getElementById('minus');
let plusBtn = document.getElementById('plus') ;
let count = document.getElementById('count') ;
let addToCart = document.getElementById('addToCart');
let smallPobup = document.querySelector('header nav .account span');
let special = document.querySelector('header nav .show-cart .sp') ;
let ammont = 0 ;
minusBtn.onclick = () => {
  if (count.textContent > 0) {
    ammont-- ;
    count.textContent = ammont ;
  }
};
plusBtn.onclick = () => {
  if (count.textContent >= 0) {
    ammont++;
    count.textContent = ammont;
  }
};
addToCart.addEventListener('click',() => {
  if (count.textContent < 1) {
    smallPobup.textContent = 0 ;
    let addInfoCart = `
      <div class="info-cart">
        Your Cart is Empty.
      </div>
    `;
    special.innerHTML = addInfoCart ;
  } else {
    smallPobup.textContent = count.textContent ;
    countInCart.classList.add('show');
    let fp = parseFloat(finalPrice.textContent.slice(1));
    let con = parseInt(count.textContent);
    let titleProduct = document.querySelector('section .product h1').textContent;
    let addInfoCart = `
      <div class="info-cart">
        <div class="product">
          <img src="./images/image-product-1-thumbnail.jpg" alt="thumbnail image" />
          <div class="details">
            <h5>${titleProduct}</h5>
            <p>${calcFinalCartPrice(fp,con)}</p>
          </div>
          <img src="./images/icon-delete.svg" alt="delete icon" />
        </div>
        <button>Checkout</button>
      </div>
    `;
    special.innerHTML = addInfoCart ;
    let delInfoCart = document.querySelector('header nav .info-cart .product img:last-of-type');
    let infoCart = document.querySelector('header nav .info-cart');
    delInfoCart.addEventListener('click',() => {
      infoCart.remove() ;
      smallPobup.textContent = 0;
      count.textContent = 0 ;
      ammont = 0 ;
      addInfoCart = `
            <div class="info-cart">
              Your Cart is Empty.
            </div>
          `;
      special.innerHTML = addInfoCart;
    });
  }
});
function calcFinalCartPrice(final, count) {
  return `$${final} × ${count} <span>$${(final*count).toFixed(2)}</span>`;
}
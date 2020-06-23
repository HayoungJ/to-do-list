const body = document.querySelector('body');

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/bg${imgNumber}.jpg`
  image.classList.add('bgImage');
  body.prepend(image);
}

function generateRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER + 1);
  return number;
}

function init() {
  const randomNumber = generateRandom();
  paintImage(randomNumber);
}

init();
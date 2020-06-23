const clockContainer = document.querySelector('.js-clock'),
 clockTitle = clockContainer.querySelector('h1');

function getTime() {
  const date = new Date();
  const minutes = fillZero(date.getMinutes());
  const hours = fillZero(date.getHours());
  const seconds = fillZero(date.getSeconds());

  clockTitle.innerText = `${hours} : ${minutes} : ${seconds}`;
}

function fillZero(number) {
  return number < 10 ? `0${number}` : `${number}`
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
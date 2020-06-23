const form = document.querySelector('.js-form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser',
  SHOWING_CN = 'showing';

// 이름을 local storage에 저장
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// 이름이 입력되었을 때 이름을 저장
function handleSubmit() {
  event.preventDefault();
  
  const currentValue = input.value;
  
  paintGreeting(currentValue);
  saveName(currentValue);

  input.value = null;
}

// 이름이 저장되어 있지 않을 때, 입력창을 띄워줌
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handleSubmit);
}

// 이름이 저장되어 있을 때, 화면에 이름을 그려줌
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);

  greeting.innerHTML = `Welcome, ${text}<br /> Have a good day!`;
}

// 기존에 저장된 이름이 있다면 화면에 출력하고, 그렇지 않다면 이름을 묻는다
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
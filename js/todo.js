const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

// delete 버튼을 누른 list를 삭제
function deleteToDo(event) {
  const button = event.target;
  const li = button.parentNode;

  toDoList.removeChild(li); // to-do-list의 html 요소를 삭제

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // click event가 발생한 li만 제외하고 새 array를 생성
  });

  toDos = cleanToDos;

  saveToDos();
}

// to-do-list를 local storage에 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// to-do-list가 입력되었을 때, html/obj에 해당 list 추가
function paintToDo(text) { // 받아온 text를 id와 delete button과 묶어 li 요소로 만들어준다.
  const li = document.createElement('li');

  const delButton = document.createElement('button');
  delButton.innerText = "❌";
  delButton.classList.add('delButton');
  delButton.addEventListener('click', deleteToDo);

  const span = document.createElement('span');
  span.innerText = text;

  const newId = toDos.length + 1; // 리스트에 들어가는 순서가 id가 된다.

  li.appendChild(span);
  li.appendChild(delButton);
  li.id = newId; // li 자체가 id를 가지도록 해준다. (삭제 시 li 식별자가 되어줌)

  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  }

  toDos.push(toDoObj);

  saveToDos();
}

// to-do-list가 입력되었을 때 화면에 노출
function handleSubmit() {
  event.preventDefault();

  const currentValue = toDoInput.value;

  paintToDo(currentValue);

  toDoInput.value="";
}

// local storage에 저장된 to-do-list를 불러온다
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);

    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    })
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
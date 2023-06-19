const inputText = document.querySelector('.input');
const add = document.querySelector('.add');
const list = document.querySelector('.list');
const deleteBtn = document.querySelector('ul');
const listNum = document.querySelector('.listNum');
const clean = document.querySelector('.cleanBTN');

let listData = JSON.parse(localStorage.getItem('todoList')) || [];

add.addEventListener('click', addList);
clean.addEventListener('click', clearAll);
deleteBtn.addEventListener('click', handleListEvent);
inputText.addEventListener('keypress', handleKeyPress);

function handleKeyPress(e) {
  if (e.keyCode === 13) {
    addList();
  }
}

function addList() {
  const value = inputText.value.trim();
  if (!value) {
    return;
  }
  listData.push({
    text: value,
    status: false,
    id: listData.length
  });
  render();
  inputText.value = '';
}

function render() {
  let str = '';
  listData.forEach((item, i) => {
    item.id = i;
    str += `
            <li>
                <label class='checkbox ${item.status ? 'done' : ''}'>
                    <input type='checkbox' class='status' ${
                      item.status ? 'checked' : ''
                    } data-num=${i}>
                    <span>${item.text}</span>
                </label>
                <a href="" class='delete' data-num='${i}'>刪除</a>
            </li>
        `;
  });
  list.innerHTML = str;
  listNum.innerHTML = `目前有 ${listData.length} 筆任務`;

  localStorage.setItem('todoList', JSON.stringify(listData));
}

function clearAll(e) {
  e.preventDefault();
  listData = [];
  render();
}

function handleListEvent(e) {
  e.preventDefault();
  if (e.target.nodeName === 'A') {
    listData = listData.filter((item, index) => index != e.target.dataset.num);
  } else if (e.target.nodeName === 'INPUT') {
    listData.forEach((item) => {
      if (e.target.dataset.num == item.id) {
        item.status = !item.status;
      }
    });
  }
  render();
}

render();

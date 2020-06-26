const inputText = document.querySelector(".input");
const add = document.querySelector(".add");
const list = document.querySelector(".list");
const deleteBtn = document.querySelector("ul");
const listNum = document.querySelector(".listNum");
const clean = document.querySelector(".cleanBTN");

const listData = [];
add.addEventListener("click", addList);
clean.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", removeList);
deleteBtn.addEventListener("click", status);

function addList() {
  const value = inputText.value.trim();
  // console.log(value);
  if (!value) {
    return;
  } else {
    listData.push({
      text: value,
      status: false,
      id: listData.length
    });
  }
  // console.log(listData);
  render();
  inputText.value = "";
}

function render() {
  let str = "";
  listData.forEach((item, i) => {
    str += `
            <li>
                <label class='checkbox ${item.status ? "done" : ""}'>
                    <input type='checkbox' class='status' ${
                    item.status ? "checked" : ""
                    } data-num=${i}>
                    ${item.text}
                </label>
                <a href="" class='delete' data-num='${i}'>刪除</a>
            </li>
        `;
  });
  list.innerHTML = str;
  listNum.innerHTML = `目前有 ${listData.length} 筆任務`
}

function clearAll() {
    e.preventDefault();
    listData = [];
    render()
}

function removeList(e) {
  e.preventDefault();
  // console.log(e.target.nodeName);
  if (e.target.nodeName === "A") {
    listData.splice(e.target.dataset.num, 1);
  }
  render();
}

function status(e) {
  // console.log(e.target.nodeName);
  if (e.target.nodeName === "INPUT") {
    listData.forEach((item) => {
      if (e.target.dataset.num == item.id) {
        if (item.status) {
          item.status = false;
        } else {
          item.status = true;
        }
      }
    });
    render();
  }
}
let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");

let elModalWrapper = document.querySelector(".modal__wrapper");
let elModal = document.querySelector(".modal");

let elCount = document.querySelector(".all__count");
let complateCount = document.querySelector(".complated__count");
let uncomplateCount = document.querySelector(".uncomplated__count");

let todos = JSON.parse(window.localStorage.getItem("todos")) || [];

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (evt.target[0].value.trim()) {
    let data = {
      id: todos.length + 1,
      value: elInput.value,
      isComplate: false,
    };
    todos.push(data);
    renderTodo(todos, elList);
    evt.target.reset();
  } else {
    alert("inputga yozing");
  }

  window.localStorage.setItem("todos", JSON.stringify(todos));
});

function renderTodo(arr, list) {
  list.innerHTML = "";
  arr.map((item, index) => {
    let elItem = document.createElement("li");
    elItem.classList.add("todo__item");
    elItem.innerHTML = `
    <div class="value__wrapper ${item.isComplate ? "complate" : ""}">
        <span>${index + 1} -</span>
        <strong>${item.value}</strong>
    </div>
    <div class="btn__wrapper">
        <label>
            <input class="checkBox__todo visually-hidden" type="checkbox" id="${
              item.id
            }"/>
            <div class="check__wrapper">
                <span class="${
                  item.isComplate ? "check__open" : "check__inner"
                }"></span>
            </div>
        </label>
        <button onclick="updateClick(${item.id})">Update</button>
        <button onclick="deleteBtnClick(${item.id})">Delete</button>
    </div>
    `;
    list.appendChild(elItem);
  });

  elCount.textContent = todos.length;
  complateCount.textContent = todos.filter(
    (item) => item.isComplate == true
  ).length;
  uncomplateCount.textContent = todos.filter(
    (item) => item.isComplate == false
  ).length;
}

renderTodo(todos, elList);

elCount.parentElement.addEventListener("click", function () {
  renderTodo(todos, elList);
});

complateCount.parentElement.addEventListener("click", function () {
  let data = todos.filter((item) => item.isComplate == true);
  renderTodo(data, elList);
});

uncomplateCount.parentElement.addEventListener("click", function () {
  let data = todos.filter((item) => item.isComplate == false);
  renderTodo(data, elList);
});

//  ================ update btn start =================

function updateClick(id) {
  elModalWrapper.classList.add("open__modal");

  const data = todos.find((item) => item.id == id);
  elModal.innerHTML = `
  <div class="update__wrapper">
       <strong>
          Update your todo
       </strong>
       <input value="${data.value}" class="update__todo" placeholder="Enter your todo"/>
       <button onclick="updateBtnClick(${id})">update</button>
  
  </div>
  `;
}

function updateBtnClick(id) {
  let updatedBtnValue = document.querySelector(".update__todo").value;
  const data = todos.find((item) => item.id == id);
  data.value = updatedBtnValue;
  elModalWrapper.classList.remove("open__modal");
  renderTodo(todos, elList);
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

//  ================ update btn end =================

// ===================== delete start ====================
function deleteBtnClick(id) {
  elModalWrapper.classList.add("open__modal");
  elModal.innerHTML = `
  <div class="delete__wrapper">
       <h2>Are you sure delete</h2>
       <div>
            <button onclick="deleteSureBtn(${id})">ok</button>
            <button onclick="cencelModal()">cencel</button>
       </div>
  </div>

  `;
}

function cencelModal() {
  elModalWrapper.classList.remove("open__modal");
}

function deleteSureBtn(id) {
  const data = todos.findIndex((item) => item.id == id);
  todos.splice(data, 1);
  elModalWrapper.classList.remove("open__modal");
  renderTodo(todos, elList);
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

// ===================== delete end ====================

// ============== Modal start ================

elModalWrapper.addEventListener("click", function (evt) {
  if (evt.target.id == "modal__wrapper") {
    elModalWrapper.classList.remove("open__modal");
  }
});

// ============== Modal end ================

//============== checkbox start =============
elList.addEventListener("click", function (evt) {
  //============== checkbox start =============
  if (evt.target.matches(".checkBox__todo")) {
    const data = todos.find((item) => item.id == evt.target.id);
    data.isComplate = !data.isComplate;
    renderTodo(todos, elList);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
});

//============== checkbox end =============

class todoElement {
  constructor(name, date) {
    this.checked = false;
    this.name = name;
    this.date = date;
  }
}

function addTask() {
  let n = document.getElementById("name").value;
  let d = document.getElementById("date").value;
  if (ValidationTaskName(n) && ValidationTaskDate(d)) {
    document.getElementById("info").innerHTML = "";
    let task = new todoElement(n, d);

    document.getElementById("name").value = "";
    document.getElementById("date").value = "";

    var taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    taskList.push(task);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTasks();
  } else {
    document.getElementById("info").innerHTML =
      "<p class='alert'>Niepoprawne dane, zadanie musi mieć co najmniej 3 znaki, nie więcej niż 255. Data musi być pusta, bądź w przyszłości! </p>";
  }
}

function displayTasks() {
  var taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  var taskListElement = document.getElementById("list-element");
  taskListElement.innerHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    let removeButton = document.createElement("input");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "x");
    removeButton.className = "removeButton";

    removeButton.onclick = function () {
      remove(i);
    };

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    taskListElement.appendChild(checkbox);

    if (taskList[i].checked) {
      checkbox.checked = true;
    }

    let pName = document.createElement("p");
    pName.className = "name";

    let divNameCheckbox = document.createElement("div");
    divNameCheckbox.className = "checkName";

    divNameCheckbox.appendChild(checkbox);
    divNameCheckbox.appendChild(pName);

    let pDate = document.createElement("p");
    pDate.className = "date";

    pName.textContent = taskList[i].name;
    pDate.textContent = taskList[i].date;

    pName.addEventListener("click", function () {
      // Zamień tekst na pole input
      let inputName = document.createElement("input");
      inputName.setAttribute("type", "text");
      inputName.value = taskList[i].name;
      console.log(inputName.value.length);

      // Obsługa zakończenia edycji
      inputName.addEventListener("blur", function () {
        if (ValidationTaskName(inputName.value)) {
          taskList[i].name = inputName.value;
          localStorage.setItem("taskList", JSON.stringify(taskList));
        }
        displayTasks();
      });

      pName.replaceWith(inputName);
      inputName.focus(); // Skup pole input po zamianie
    });

    pDate.addEventListener("click", function () {
      // Zamień tekst na pole input
      let inputDate = document.createElement("input");
      inputDate.setAttribute("type", "date");
      inputDate.value = taskList[i].date;

      // Obsługa zakończenia edycji
      inputDate.addEventListener("blur", function () {
        if (ValidationTaskDate(inputDate.value)) {
          taskList[i].date = inputDate.value;
          localStorage.setItem("taskList", JSON.stringify(taskList));
          // Odśwież listę
        }
        displayTasks();
      });

      pDate.replaceWith(inputDate);
      inputDate.focus(); // Skup pole input po zamianie
    });

    let div = document.createElement("li");
    div.className = "el";

    checkbox.addEventListener("change", function () {
      taskList[i].checked = checkbox.checked;
      localStorage.setItem("taskList", JSON.stringify(taskList));
    });

    div.appendChild(divNameCheckbox);
    div.appendChild(pDate);
    div.appendChild(removeButton);

    taskListElement.appendChild(div);
  }
}

function clearSearch() {
  document.getElementById("search").value = "";
  displayTasks();
}

function clear() {
  localStorage.removeItem("taskList");
  displayTasks();
}

function searchTasks() {
  var searchTerm = document.getElementById("search").value.toLowerCase();
  if (searchTerm.length >= 2) {
    var taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    var taskListElement = document.getElementById("list-element");
    taskListElement.innerHTML = "";

    for (let i = 0; i < taskList.length; i++) {
      var text = taskList[i].name.toLowerCase();
      if (text.includes(searchTerm)) {
        let removeButton = document.createElement("input");
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "x");
        removeButton.className = "removeButton";

        removeButton.onclick = function () {
          remove(i);
        };

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        taskListElement.appendChild(checkbox);

        if (taskList[i].checked) {
          checkbox.checked = true;
        }

        let pName = document.createElement("p");
        pName.className = "name";

        let nameText = taskList[i].name;
        if (nameText.toLowerCase().includes(searchTerm)) {
          console.log("czy dziala");
          let searchTermIndex = nameText.toLowerCase().indexOf(searchTerm);
          pName.innerHTML =
            nameText.substring(0, searchTermIndex) +
            "<mark>" +
            nameText.substring(
              searchTermIndex,
              searchTermIndex + searchTerm.length
            ) +
            "</mark>" +
            nameText.substring(searchTermIndex + searchTerm.length);
        } else {
          pName.textContent = nameText;
        }

        let divNameCheckbox = document.createElement("div");
        divNameCheckbox.className = "checkName";

        divNameCheckbox.appendChild(checkbox);
        divNameCheckbox.appendChild(pName);

        let pDate = document.createElement("p");
        pDate.className = "date";

        pDate.textContent = taskList[i].date;

        pName.addEventListener("click", function () {
          // Zamień tekst na pole input
          let inputName = document.createElement("input");
          inputName.setAttribute("type", "text");
          inputName.value = taskList[i].name;

          // Obsługa zakończenia edycji
          inputName.addEventListener("blur", function () {
            taskList[i].name = inputName.value;
            localStorage.setItem("taskList", JSON.stringify(taskList));
            searchTasks(); // Odśwież listę
          });

          pName.replaceWith(inputName);
          inputName.focus(); // Skup pole input po zamianie
        });

        pDate.addEventListener("click", function () {
          // Zamień tekst na pole input
          let inputDate = document.createElement("input");
          inputDate.setAttribute("type", "text");
          inputDate.value = taskList[i].date;

          // Obsługa zakończenia edycji
          inputDate.addEventListener("blur", function () {
            taskList[i].date = inputDate.value;
            localStorage.setItem("taskList", JSON.stringify(taskList));
            searchTasks(); // Odśwież listę
          });

          pDate.replaceWith(inputDate);
          inputDate.focus(); // Skup pole input po zamianie
        });

        let div = document.createElement("div");
        div.className = "el";

        checkbox.addEventListener("change", function () {
          taskList[i].checked = checkbox.checked;
          localStorage.setItem("taskList", JSON.stringify(taskList));
        });

        div.appendChild(divNameCheckbox);
        div.appendChild(pDate);
        div.appendChild(removeButton);

        taskListElement.appendChild(div);
      }
    }
  } else {
    displayTasks();
  }
}

function remove(x) {
  var taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.splice(x, 1); // Usuń element z tablicy
  localStorage.setItem("taskList", JSON.stringify(taskList));
  document.getElementById("search").value = "";
  displayTasks();
}

function ChangeStateCheckbox(x) {
  taskList[x].checked = checkbox.checked;
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function ValidationTaskName(n) {
  if (n.length >= 3 && n.length <= 255) {
    return true;
  } else {
    return false;
  }
}

function ValidationTaskDate(d) {
  if (new Date(d) >= new Date() || d == "") {
    return true;
  } else {
    return false;
  }
}

console.log("test");
window.onload = displayTasks();

let searchInput = document.getElementById("search");
searchInput.addEventListener("input", searchTasks);

let addButton = document.getElementById("add");
addButton.addEventListener("click", addTask);

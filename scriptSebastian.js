let generatedHTMLCode;

let html;

let i;

let list1;

let list2;

let list3;

let list4;

let list;

function insertTasktoMatrix() {
  list1 = document.getElementById("list-important-urgent");
  list2 = document.getElementById("list-important-noturgent");
  list3 = document.getElementById("list-notimportant-urgent");
  list4 = document.getElementById("list-notimportant-noturgent");

  for (i = 0; i < allTasks.length; i++) {
    if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      createFieldinList1(1);
    } else if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      createFieldinList2();
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      createFieldinList3();
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      createFieldinList4();
    }
  }
}

function createFieldinList1() {
  m = 1;
  generateHTMLCode();
  list1.insertAdjacentHTML("beforeend", generatedHTMLCode);
}

function createFieldinList2() {
  m = 2;
  generateHTMLCode();
  list2.insertAdjacentHTML("beforeend", generatedHTMLCode);
}

function createFieldinList3() {
  m = 3;
  generateHTMLCode();
  list3.insertAdjacentHTML("beforeend", generatedHTMLCode);
}

function createFieldinList4() {
  m = 4;
  generateHTMLCode();
  list4.insertAdjacentHTML("beforeend", generatedHTMLCode);
}

function generateListItem(m, date, title, description) {
  html = `<li class="li-${m}">
      <img onclick="deleteTask()" class="garbage_can" src="img/garbage_can.png">
      <span class="date">${date}</span> <br> 
      <span class="title">${title}</span> <br> 
      <span class="description">${description}
    </li>`;

  return html;
}

function generateHTMLCode() {
  generatedHTMLCode = generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description
  );
}

function deleteTask() {
  localStorage.clear();
  location.reload();
}

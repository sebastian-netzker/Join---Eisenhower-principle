
let generatedHTMLCode;

let html;

let i;

let list1;

let list2;

let list3;

let list4;

let list;

let k = 1;

/**
 * This function decided wehere the field is added
 */

function insertTasktoMatrix() {
  list1 = document.getElementById("list-important-urgent");
  list2 = document.getElementById("list-important-noturgent");
  list3 = document.getElementById("list-notimportant-urgent");
  list4 = document.getElementById("list-notimportant-noturgent");
  list1.innerHTML = '';
  list2.innerHTML = '';
  list3.innerHTML = '';
  list4.innerHTML = '';

  console.log('allTasks', allTasks);
  for (let i = 0; i < allTasks.length; i++) {
    if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      createFieldinList1(i);
    } else if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      createFieldinList2(i);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      createFieldinList3(i);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      createFieldinList4(i);
    }
  }
}

/**
 * This function create fields for the matrix 
 */

function createFieldinList1(id) {
  m = 1;
  let html =  generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description,
    id
  );
  list1.insertAdjacentHTML("beforeend", html);
}

function createFieldinList2(id) {
  m = 2;
  generateHTMLCode(id);
  list2.insertAdjacentHTML("beforeend", generatedHTMLCode);
}

function createFieldinList3(id) {
  m = 3;
  generateHTMLCode(id);
  list3.insertAdjacentHTML("beforeend", generatedHTMLCode);
}

function createFieldinList4(id) {
  m = 4;
  generateHTMLCode(id);
  list4.insertAdjacentHTML("beforeend", generatedHTMLCode);
}


/**
 * This function creates automatically  a list item 
 * {date} - Date of the task
 * {title} - Title of the task
 * {description} - Description of the task
 * {return} - Generated HTML Code as string
 * {k,m}  - Parameter to automatic creation of different classes and id´s  
 */

function generateListItem(m, date, title, description, id) {
  html = `<li id="li-${k}" class="li-${m}">
      <img onclick="deleteTask(${id})" class="garbage_can" src="img/garbage_can.png">
      <span class="date">${date}</span> <br> 
      <span class="title">${title}</span> <br> 
      <span class="description">${description}
    </li>`;

  k++;
  return html;
}

/**
 *   In this function the parameter from generateListItem are defined 
 */

function generateHTMLCode(id) {
  generatedHTMLCode = generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description,
    id
  );
}

/**
 * This function delete a list item 
 */

function deleteTask(n) {

  allTasks.splice(n, 1);
  let allTasksAsString = JSON.stringify(allTasks);
  localStorage.setItem('data', allTasksAsString);

  // location.reload();
  insertTasktoMatrix();
}

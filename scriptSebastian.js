
let i;

/**
 * This function open the responsive Menu 
 */


function showMenu(){

  document.getElementById("overlay-menu").classList.add("show-overlay-menu");
}

/**
 * This function close the responsive menu 
 */

function closeMenu() {

  document.getElementById("overlay-menu").classList.remove("show-overlay-menu");
}

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
  for (i = 0; i < allTasks.length; i++) {
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
  
  let html =  generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description,
    id
  );
  list2.insertAdjacentHTML("beforeend", html);
}

function createFieldinList3(id) {
  m = 3;
  
  let html =  generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description,
    id
  );
  list3.insertAdjacentHTML("beforeend", html);
}

function createFieldinList4(id) {
  m = 4;
  
  let html =  generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description,
    id
  );
  list4.insertAdjacentHTML("beforeend", html);
}


/**
 * This function create automatically a list item 
 * @param {number} m  - Parameter to create different classes
 * @param {number} k  - Parameter to create different id´s
 * @param {date} date - Date of the task
 * @param {string} title - Title of the task
 * @param {string} description - Description of the task
 * @param {number} id - Parameter to change number in delete Task Function
 */
function generateListItem(m, date, title, description, id) {
 let k = 1;
 let html = `<li id="li-${k}" class="li-${m}">
      <img onclick="deleteTask(${id})" class="garbage_can" src="img/garbage_can.png">
      <span class="date">${date}</span> <br> 
      <span class="title">${title}</span> <br> 
      <span class="description">${description}</span>
    </li>`;

  k++;
  return html;
}


/**
 * This function delete a list item 
 */

function deleteTask(n) {

  allTasks.splice(n, 1);
  let allTasksAsString = JSON.stringify(allTasks);
  localStorage.setItem('data', allTasksAsString);

  insertTasktoMatrix();
}

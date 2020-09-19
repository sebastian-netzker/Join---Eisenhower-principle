
let generatedHTMLCode;

let html;

let i;

let list1;

let list2;

let list3;

let list4;

let list;

let k = 1;

let n = 0;

/**
 * This function decided wehere the field is added
 */

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

/**
 * This function create fields for the matrix 
 */

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


/**
 * This function creates automatically  a list item 
 * {date} - Date of the task
 * {title} - Title of the task
 * {description} - Description of the task
 * {return} - Generated HTML Code as string
 * {k,m}  - Parameter to automatic creation of different classes and id´s  
 */

function generateListItem(m, date, title, description) {
  html = `<li id="li-${k}" class="li-${m}">
      <img onclick="deleteTask(${n})" class="garbage_can" src="img/garbage_can.png">
      <span class="date">${date}</span> <br> 
      <span class="title">${title}</span> <br> 
      <span class="description">${description}
    </li>`;

    k++;
    n++;

  return html;
}

/**
 *   In this function the parameter from generateListItem are defined 
 */

function generateHTMLCode() {
  generatedHTMLCode = generateListItem(
    m,
    allTasks[i].date,
    allTasks[i].title,
    allTasks[i].description
  );
}

/**
 * This function delete a list item 
 */

function deleteTask(n) {

  allTasks.splice(n,1);

  allTasks = JSON.stringify(allTasks);

  localStorage.setItem('data',allTasks);

  location.reload();


}

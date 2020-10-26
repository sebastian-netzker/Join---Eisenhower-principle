let n;
let html;
let allTasks = [];
const BASE_SERVER_URL =
  "http://sebastian-netzker.developerakademie.com/Gruppenarbeit/php/";

/**
 * This function open the Popupmenu from the matrix
 * @param {integer} i - id of the task that should be updated
 */
function openpopupMatrix(i) {
  document.getElementById("option-1").removeAttribute("selected", "selected");

  document.getElementById("option-2").removeAttribute("selected", "selected");

  document.getElementById("option-3").removeAttribute("selected", "selected");

  document.getElementById("option-4").removeAttribute("selected", "selected");

  let task = allTasks[i];

  document.getElementById("popup-matrix").classList.remove("d-none");
  document.getElementById("updateTaskButton").setAttribute('onclick', 'selector(' + i + ')');

  document.getElementById("popup-title").innerHTML = task.title;

  if (
    allTasks[i].importance == "High Importance" &&
    allTasks[i].urgency == "High Urgency"
  ) {
    document.getElementById("option-1").setAttribute("selected", "selected");
  } else if (
    allTasks[i].importance == "High Importance" &&
    allTasks[i].urgency == "Low Urgency"
  ) {
    document.getElementById("option-2").setAttribute("selected", "selected");
  } else if (
    allTasks[i].importance == "Low Importance" &&
    allTasks[i].urgency == "High Urgency"
  ) {
    document.getElementById("option-3").setAttribute("selected", "selected");
  } else if (
    allTasks[i].importance == "Low Importance" &&
    allTasks[i].urgency == "Low Urgency"
  ) {
    document.getElementById("option-4").setAttribute("selected", "selected");
  }
}

/**
 * This function close the Popupmenu from the Matrix
 */

function closepopupMatrix() {
  document.getElementById("popup-matrix").classList.add("d-none");
}


/**
 *  This function choose where the task will be moved 
 * @param {integer} i - ID of the task that should be updated 
 */
function selector(i) {
  let task = allTasks[i];

  let select_Menu = document.getElementById("select-menu");
  let selectedValue = select_Menu.options[select_Menu.selectedIndex].value;

  if (selectedValue == "important - not urgent") {
    task.importance = "High Importance";
    task.urgency = "Low Urgency";
  } else if (selectedValue == "not important - urgent") {

    task.importance = "Low Importance";
    task.urgency = "High Urgency";

  } else if (selectedValue == "not important - not urgent") {

    task.importance = "Low Importance";
    task.urgency = "Low Urgency";

  } else if (selectedValue == "important - urgent") {

    task.importance = "High Importance";
    task.urgency = "High Urgency";
  }

  // 2)  save JSON to Server
  saveJSONToServer(allTasks)
    .then(function (result) {
      // TODO: Show loading screen

      console.log("Laden erfolgreich!", result);
      load();

    })
    .catch(function (error) {
      // Fehler
      // TODO: Show error screen
      console.error("Fehler beim laden!", error);
    });

  // 3) Update HTML View
  insertTasktoMatrix();

  closepopupMatrix();
}

/**
 * This function open the responsive Menu
 */

function showMenu() {
  document.getElementById("overlay-menu").classList.add("show-overlay-menu");
  document.getElementById("burger-menu").classList.add("d-none");
}

/**
 * This function close the responsive menu
 */

function closeMenu() {
  document.getElementById("overlay-menu").classList.remove("show-overlay-menu");
  document.getElementById("burger-menu").classList.remove("d-none");
}

/**
 * This function decided wehere the field is added
 */

function insertTasktoMatrix() {
  list1 = document.getElementById("list-important-urgent");
  list2 = document.getElementById("list-important-noturgent");
  list3 = document.getElementById("list-notimportant-urgent");
  list4 = document.getElementById("list-notimportant-noturgent");
  list1.innerHTML = "";
  list2.innerHTML = "";
  list3.innerHTML = "";
  list4.innerHTML = "";

  console.log("allTasks", allTasks);
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

  html = generateListItem(
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

  html = generateListItem(
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

  html = generateListItem(
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

  html = generateListItem(
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
      <img onclick="openpopupMatrix(${i})" class="edit_icon" src="img/edit.png">
      <img onclick="deleteTask(${id})" class="garbage_can" src="img/garbage_can.png">
      <span class="date">${date}</span> <br> 
      <span id="title-${id}" class="title">${title}</span> <br> 
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
  //localStorage.setItem('data', allTasksAsString);
  document.getElementById('loading').classList.remove('d-none');
  saveJSONToServer(allTasks)
    .then(function (result) {
      //then(function (variable vom server))
      console.log("Laden erfolgreich!", result);
      document.getElementById('loading').classList.add('d-none');
      load();
    })
    .catch(function (error) {
      // Fehler
      console.error("Fehler beim laden!", error);
      document.getElementById('error').classList.remove('d-none');
      document.getElementById('loading').classList.add('d-none');
    });

  insertTasktoMatrix();
}

/**
 * loads the JSON allTasks from local storage, if ther is no 'data' it will be created
 */
function loadTasks() {
  load();
  showMyJSON();




}

/**
 * Loads myJSON from Server
 */
function load() {
  //let loadingScreen = document.getElementById('spinner').classList;
  //loadingScreen.remove('d-none');

  document.getElementById('loading').classList.remove('d-none');
  loadJSONFromServer()
    .then(function (result) {
      //then(function (variable vom server))
      console.log("Laden erfolgreich!", result);
      document.getElementById('loading').classList.add('d-none');
      allTasks = JSON.parse(result);
      insertTasktoMatrix();
      //loadingScreen.add('d-none');
    })
    .catch(function (error) {
      // Fehler
      console.error("Fehler beim laden!", error);
      //loadingScreen.add('d-none');
      document.getElementById('error').classList.remove('d-none');
      document.getElementById('loading').classList.add('d-none');
    });
}

/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */
function loadJSONFromServer() {

  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    let proxy = determineProxySettings();
    let serverURL = proxy + BASE_SERVER_URL + "my_json.json";
    xhttp.open("GET", serverURL);

    xhttp.onreadystatechange = function (oEvent) {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status <= 399) {
          resolve(xhttp.responseText);
        } else {
          reject(xhttp.statusText);
        }
      }
    };

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
  });

}

function determineProxySettings() {
  if (window.location.href.indexOf(".developerakademie.com") > -1) {
    return "";
  } else {
    return "https://cors-anywhere.herokuapp.com/";
  }
}

function showMyJSON() {
  console.log("This is allTasks", allTasks);
}

/**
 * Saves a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */
function saveJSONToServer(payload) {
  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    let serverURL = BASE_SERVER_URL + "save_json.php";
    xhttp.open("POST", serverURL); // POST = Erstellen; GET = Abrufen; DELETE = Löschen, PUT = Updaten

    xhttp.onreadystatechange = function (oEvent) {
      if (xhttp.readyState === 4) {
        // Nr. 4 bedeutet, dass der Server eine Antwort gesendet hat
        // Eine Antwort hat 2 Teile: a) Statuscode; b) payload
        // 404 = Nicht gefunden
        // 200 = Alles OK
        // 202 = Datei erstellt

        if (xhttp.status >= 200 && xhttp.status <= 399) {
          // Alles super, es hat funktioniert!
          resolve(xhttp.responseText);
        } else {
          // Ein Fehler ist aufgetreten
          reject(xhttp.statusText);
        }
      }
    };

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(payload));
  });
}

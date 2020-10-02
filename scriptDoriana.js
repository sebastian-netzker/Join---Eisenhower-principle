
/**
*@param {string} priorityStatus- 
*/
let priorityStatus = "high";
let status = 0;

let allTasks = [];
const BASE_SERVER_URL = 'http://simon-besendorfer.developerakademie.com/php/';

/**
 * Creates items to the List
 * @param {*} title 
 * @param {*} priorityStatus 
 * @param {*} discription 
 * @param {*} i 
 * @param {*} date 
 * @param {*} item
 */
function createItemsToTheList(title, priorityStatus, discription, i, date) {
    let item = `
        <li class="item" id="item${i}">

        <p class="dateClass">${date}</p>
        <p class="title"> ${title}</p>
        <p class="status"> ${priorityStatus}</p>
        <p class="description"> ${discription}</p>
        <button onclick="deleteItemList(${i})"class="delete">Delete Task</button>
        </li>
         `;

    return item;
}
/**
 * Insert items on the List
 * @param {*} priorityStatus  
 * @param {*} insertItem
 */
function insertItemsOnTheList() {
    let colorCode = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].importance == "High Importance" && allTasks[i].urgency == "High Urgency") {
            priorityStatus = "High";
            colorCode = 'red';
        }
        else if (allTasks[i].importance == "Low Importance" && allTasks[i].urgency == "Low Urgency") {
            priorityStatus = "Low";
            colorCode = 'yellow';
        }
        else {
            priorityStatus = "Medium";
            colorCode = 'orange';
        }
        let insertItem = createItemsToTheList(allTasks[i].title, priorityStatus, allTasks[i].description, i, allTasks[i].date);
        document.getElementById('listItem1').insertAdjacentHTML('beforeend', insertItem);
        document.getElementById('item' + i).style.borderLeft = "5px solid " + colorCode;
    }
}
/**
 * Delete a specified task
 * @param {*} item  
 */
function deleteItemList(id) {
    let item = document.getElementById('item' + id);
    item.parentNode.removeChild(item);
    allTasks.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(allTasks));
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
    loadJSONFromServer()
        .then(function (result) { //then(function (variable vom server))
            console.log('Laden erfolgreich!', result);
            allTasks = JSON.parse(result);
            insertItemsOnTheList();
        })
        .catch(function (error) { // Fehler
            console.error('Fehler beim laden!', error);
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
        let serverURL = proxy + BASE_SERVER_URL + 'my_json.json';
        xhttp.open('GET', serverURL);

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
    if (window.location.href.indexOf('.developerakademie.com') > -1) {
        return '';
    } else {
        return 'https://cors-anywhere.herokuapp.com/';
    }
}

  function showMyJSON() {
    console.log("This is allTasks", allTasks);
  }
  

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


let priorityStatus = "high";
let status = 0;

let allTasks = [];
const BASE_SERVER_URL = 'http://simon-besendorfer.developerakademie.com/php/';

/**
 * Creates item to the List, by every call of the function addTask()
 * @param {string} title -displays the name of a task
 * @param {string} priorityStatus-created to set an attribute, according to importance and urgency
 * @param {string} discription-displays the content of an specified task
 * @param {number} i-id used for the count of each list item 
 * @param {number} date-will show the date when a task was created
 * @param {string} item- creates an list element every time when the user add a new task,that will be be displayed on the page 
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
 * The items which were in the createItemsToTheList() created are displayed on the Page with help of insertAdjacentHTML
 * @param {*} colorCode-saves a color according to importance and urgency
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
 * Delete a specified task:it will be the id saved ,then the item will be removed from HTML and from the array allTasks a task is deleted
 */
function deleteItemList(id) {


    let item = document.getElementById('item' + id);
    item.parentNode.removeChild(item);
    allTasks.splice(id, 1);
    //localStorage.setItem('data', JSON.stringify(allTasks));
    saveJSONToServer(allTasks)
        .then(function (result) { //then(function (variable vom server))
            console.log('Laden erfolgreich!', result);
            //load(); 
        })
        .catch(function (error) { // Fehler
            console.error('Fehler beim laden!', error);
        });

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


function showMenu() {

    document.getElementById("overlay-menu").classList.add("show-overlay-menu");
}

/**
 * This function close the responsive menu 
 */

function closeMenu() {

    document.getElementById("overlay-menu").classList.remove("show-overlay-menu");
}

/**
* Saves a JSON or JSON Array to the Server
* payload {JSON | Array} - The payload you want to store
*/
function saveJSONToServer(payload) {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let serverURL = BASE_SERVER_URL + 'save_json.php';
        xhttp.open('POST', serverURL); // POST = Erstellen; GET = Abrufen; DELETE = Löschen, PUT = Updaten

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) { // Nr. 4 bedeutet, dass der Server eine Antwort gesendet hat
                // Eine Antwort hat 2 Teile: a) Statuscode; b) payload
                // 404 = Nicht gefunden
                // 200 = Alles OK
                // 202 = Datei erstellt

                if (xhttp.status >= 200 && xhttp.status <= 399) { // Alles super, es hat funktioniert!
                    resolve(xhttp.responseText);
                } else { // Ein Fehler ist aufgetreten
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(payload));

    });
}
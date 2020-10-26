let allTasks = [];
const BASE_SERVER_URL =
  "http://sebastian-netzker.developerakademie.com/Gruppenarbeit/php/";
/**
 * This function will empty all entries in the add Task form. The previous added Information will not be changed
 */
function emptyFields() {
    document.getElementById("title").value = null;
    document.getElementById("urgency").value = "High Urgency";
    document.getElementById("importance").value = "High Importance";
    document.getElementById("date").value = null;
    document.getElementById("description").value = null;
}

/**
 * creates the JSON 'task' which is used in the function addTask() for saving the data in the local storage
 */
function gererateTaskObject() {
    let title = document.getElementById("title").value;
    let urgency = document.getElementById("urgency").value;
    let importance = document.getElementById("importance").value;
    let date = document.getElementById("date").value;
    let discription = document.getElementById("description").value;

    let task = {
        'title': title,
        'urgency': urgency,
        'importance': importance,
        'date': date,
        'description': discription,
        'created': new Date().getTime() //unix timestamp at the time of creating the task 
    };
    return task;
}

/**
 * This function will add the entries in the add Task form to the JSON allTasks
 */
function addTask() {
    let t = gererateTaskObject();
    allTasks.push(t);
    document.getElementById('loading').classList.remove('d-none');
    tasksString = JSON.stringify(allTasks);
    saveJSONToServer(allTasks)
        .then(function (result) { //then(function (variable vom server))
            console.log('Laden erfolgreich!', result);
            document.getElementById('loading').classList.add('d-none');
            load(); 
        })
        .catch(function (error) { // Fehler
            console.error('Fehler beim laden!', error);
            document.getElementById('loading').classList.add('d-none');
            document.getElementById('error').classList.remove('d-none');
        });
    
    //localStorage.setItem('data', tasksString); disabled - the JSON is saved on the Server

    emptyFields();
    
    /**
     * The following 5 lines would be a popup which shows the name and the category of the added Tast.
     * It has been replaced by the loading screen
     */
    //let html = "<div id='popup' class='transparentgray'><div class='popup'><h5>A new Task with the Title " + t.title + " has been added!</h5>You have set " + t.importance + " and " + t.urgency + "!</div></div>";
    //document.getElementById("mainWindow").insertAdjacentHTML('beforeEnd', html);
    //setTimeout(function () {
    //    document.getElementById('popup').remove();
    //}, 5000);
}

/**
 * Saves a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */
function saveJSONToServer(payload) {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let serverURL = BASE_SERVER_URL + 'save_json.php?';
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
        xhttp.setRequestHeader("Cache-Control", "no-cache");
        xhttp.send(JSON.stringify(payload));

    });
}

/**
 * loads the JSON allTasks from local storage, if ther is no 'data' it will be created
 */
function loadTasks() {
    load();
    showMyJSON();


    //if (localStorage.getItem('data') == null) { //if ther is no existing 'data' file in localStorage it will be created
    //    localStorage.setItem('data', JSON.stringify([]));
    //} else {
    //    let tasksString = localStorage.getItem('data');
    //    allTasks = JSON.parse(tasksString);
    //}
}

/**
 * lets date be minimum the date of today
*/
function getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("date").setAttribute("min", today);
}

/**
 * Loads myJSON from Server
 */
function load() {
    document.getElementById('loading').classList.remove('d-none');
    loadJSONFromServer()
        .then(function (result) { //then(function (variable vom server))
            console.log('Laden erfolgreich!', result);
            allTasks = JSON.parse(result);
            document.getElementById('loading').classList.add('d-none');
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
        xhttp.setRequestHeader("Cache-Control", "no-cache");
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
     document.getElementById("burger-menu").classList.add("d-none");

  }

/**
 * This function close the responsive menu 
 */

function closeMenu() {

    document.getElementById("overlay-menu").classList.remove("show-overlay-menu");
    document.getElementById("burger-menu").classList.remove("d-none");
  }

  
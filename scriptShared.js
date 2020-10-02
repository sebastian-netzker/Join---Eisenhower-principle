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
            insertTasktoMatrix();
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
        let proxy = 'https://cors-anywhere.herokuapp.com/';
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

function showMyJSON() {
    console.log("This is allTasks", allTasks);
}

let allTasks = [];
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

    tasksString = JSON.stringify(allTasks);
    localStorage.setItem('data', tasksString);
    emptyFields();
    let html = "<div id='popup' class='transparentgray'><div class='popup'><h5>A new Task with the Title " + t.title + " has been added!</h5>You have set " + t.importance + " and " + t.urgency + "!</div></div>";
    document.getElementById("mainWindow").insertAdjacentHTML('beforeEnd', html);
    setTimeout(function () {
        document.getElementById('popup').remove();
    }, 4000);
}

/**
 * loads the JSON allTasks from local storage, if ther is no 'data' it will be created
 */
function loadTasks() {
    if (localStorage.getItem('data') == null) { //if ther is no existing 'data' file in localStorage it will be created
        localStorage.setItem('data', JSON.stringify([]));
    } else {
        let tasksString = localStorage.getItem('data');
        allTasks = JSON.parse(tasksString);
    }
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

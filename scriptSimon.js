let allTasks =[];

function emptyFields(){
    document.getElementById("title").value = null;
    document.getElementById("urgency").value = "High Urgency";
    document.getElementById("importance").value = "High Importance";
    document.getElementById("date").value = null;
    document.getElementById("description"). value = null;
}



function addTask(){
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
        'discription': discription,
        'created': new Date().getTime() //unix timestamp at the time of creating the task 
    }
   
    allTasks.push(task);

    tasksString = JSON.stringify(allTasks);
    localStorage.setItem('data', tasksString);
    emptyFields();
    // alert('A new Task with the Title '+ title + ' has been added!');
    let html = "<div class='popup' id='popup'><h5>A new Task with the Title " + title +" has been added!</h5>You have set " + importance + " and " + urgency + "!</div>";
    document.getElementById("mainWindow").insertAdjacentHTML('beforeEnd', html);
    setTimeout(function (){
        document.getElementById('popup').remove();
    } ,2000);
    
}

function removePopup(){
        let popup = document.getElementById('popup');
        popup.remove();
}

function loadTasks(){
    if (localStorage.getItem('data') == null){ //if ther is no existing 'data' file in localStorage it will be created
        let empty;
        localStorage.setItem('data', empty);
    } else {
    let tasksString = localStorage.getItem('data');
    allTasks = JSON.parse(tasksString);
    }
}

//lets date be minimum the date of today
function getToday(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("date").setAttribute("min", today);
}

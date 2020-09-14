let allTasks =[];

function emptyFields(){
    document.getElementById("title").value = null;
    document.getElementById("urgency").value = null;
    document.getElementById("importance").value = null;
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
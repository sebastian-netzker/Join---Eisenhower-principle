function emptyFields(){
    document.getElementById("title").value = null;
    document.getElementById("urgency").value = null;
    document.getElementById("importance").value = null;
    document.getElementById("date").value = null;
    document.getElementById("description"). value = null;
}



function addTask(){
    let tasks = JSON.parse(tasks);
    console.log(tasks);
}
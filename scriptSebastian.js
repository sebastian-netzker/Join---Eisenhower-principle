
function insertTasktoMatrix() {

    let list1 = document.getElementById("list-important-urgent");
    let list2 = document.getElementById("list-important-noturgent");
    let list3 = document.getElementById("list-notimportant-urgent");
    let list4 = document.getElementById("list-notimportant-noturgent");

    let li = document.createElement('li');


    for(let i= 0; i<allTasks.length; i++){

    li.innerHTML = allTasks[i].title + allTasks[i].description + allTasks[i].date;

    if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      list1.appendChild(li);
    } else if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      list2.appendChild(li);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      list3.appendChild(li);
    } else if  (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      list4.appendChild(li);
    }
}
    





}


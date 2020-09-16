function insertTasktoMatrix() {
  let list1 = document.getElementById("list-important-urgent");
  let list2 = document.getElementById("list-important-noturgent");
  let list3 = document.getElementById("list-notimportant-urgent");
  let list4 = document.getElementById("list-notimportant-noturgent");

  for (let i = 0; i < allTasks.length; i++) {
    if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      let li1 = document.createElement("li");
      li1.innerHTML =
        "Title: " +
        allTasks[i].title  +
        " , " +
        " Description: " +
        allTasks[i].description +
        " , " +
        " Date: " +
        allTasks[i].date;
      list1.appendChild(li1);
    } else if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      let li2 = document.createElement("li");
      li2.innerHTML =
        "Title: " +
        allTasks[i].title +
        " , " +
        " Description: " +
        allTasks[i].description +
        " , " +
        " Date: " +
        allTasks[i].date;
      list2.appendChild(li2);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      let li3 = document.createElement("li");

      li3.innerHTML =
        "Title: " +
        allTasks[i].title +
        " , " +
        " Description: " +
        allTasks[i].description +
        " , " +
        " Date: " +
        allTasks[i].date;
      list3.appendChild(li3);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {
      let li4 = document.createElement("li");

      li4.innerHTML =
        "Title: " +
        allTasks[i].title +
        " , " +
        " Description: " +
        allTasks[i].description +
        " , " +
        " Date: " +
        allTasks[i].date;

      list4.appendChild(li4);
    }
  }
}

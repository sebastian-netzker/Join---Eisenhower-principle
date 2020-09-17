let generatedHTMLCode ; 




function insertTasktoMatrix() {
  let list1 = document.getElementById("list-important-urgent");
  let list2 = document.getElementById("list-important-noturgent");
  let list3 = document.getElementById("list-notimportant-urgent");
  let list4 = document.getElementById("list-notimportant-noturgent");

  


  for (let i = 0; i < allTasks.length; i++) {


      generatedHTMLCode = generateListItem(
        allTasks[i].date,
        allTasks[i].title,
        allTasks[i].description
      );

    if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {

       
      list1.insertAdjacentHTML('beforeend', generatedHTMLCode);
      

      
    } else if (
      allTasks[i].importance == "High Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {

       


  
      list2.insertAdjacentHTML('beforeend', generatedHTMLCode);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "High Urgency"
    ) {
      
      list3.insertAdjacentHTML('beforeend', generatedHTMLCode);
    } else if (
      allTasks[i].importance == "Low Importance" &&
      allTasks[i].urgency == "Low Urgency"
    ) {


      list4.insertAdjacentHTML('beforeend', generatedHTMLCode);
    }
  }
}

function generateListItem(date,title,description) {

  

  let html = 
    `<li  >
      <img onclick="deleteTask()" class="garbage_can" src="img/garbage_can.png">
      <span class="date">${date}</span> <br> 
      <span class="title">${title}</span> <br> 
      <span class="description">${description}
    </li>`;
    

    return html;
     

}

function deleteTask(){


  
  localStorage.clear();
  location.reload();

 

}



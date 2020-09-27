let priorityStatus = "high";
let status = 0;
let listArray = [];
function createItemsToTheList(title, priorityStatus, discription, i) {
    let item = `
        <li class="item" id="item${i}">
       
        <p class="title"> ${title}</p>
        <p class="status"> ${priorityStatus}</p>
        <p class="description"> ${discription}</p>
        <button onclick="deleteItemList(${i})"class="delete">Delete Task</button>
        </li>
         `;

    return item;
}

function insertItemsOnTheList() {

    for (let i = 0; i < allTasks.length; i++) {
        let varx = document.getElementById('item');

        if (allTasks[i].importance == "High Importance" && allTasks[i].urgency == "High Urgency") {
            priorityStatus = "High";

        }
        else if (allTasks[i].importance == "Low Importance" && allTasks[i].urgency == "Low Urgency") {
            priorityStatus = "Low";
        }
        else {
            priorityStatus = "Medium";
        }
        let insertItem = createItemsToTheList(allTasks[i].title, priorityStatus, allTasks[i].description, i,);
        document.getElementById('listItem1').insertAdjacentHTML('beforeend', insertItem);
    }
}

function deleteItemList(id) {
    let item = document.getElementById('item' + id);
    item.parentNode.removeChild(item);
    allTasks.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(allTasks));
}
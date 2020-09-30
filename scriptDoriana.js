
/**
*@param {string} priorityStatus- 
*/
let priorityStatus = "high";
let status = 0;
/**
 * Creates items to the List
 * @param {*} title 
 * @param {*} priorityStatus 
 * @param {*} discription 
 * @param {*} i 
 * @param {*} date 
 * @param {*} item
 */
function createItemsToTheList(title, priorityStatus, discription, i, date) {
    let item = `
        <li class="item" id="item${i}">

        <p class="dateClass">${date}</p>
        <p class="title"> ${title}</p>
        <p class="status"> ${priorityStatus}</p>
        <p class="description"> ${discription}</p>
        <button onclick="deleteItemList(${i})"class="delete">Delete Task</button>
        </li>
         `;

    return item;
}
/**
 * Insert items on the List
 * @param {*} priorityStatus  
 * @param {*} insertItem
 */
function insertItemsOnTheList() {
    let colorCode = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].importance == "High Importance" && allTasks[i].urgency == "High Urgency") {
            priorityStatus = "High";
            colorCode = 'red';
        }
        else if (allTasks[i].importance == "Low Importance" && allTasks[i].urgency == "Low Urgency") {
            priorityStatus = "Low";
            colorCode = 'yellow';
        }
        else {
            priorityStatus = "Medium";
            colorCode = 'orange';
        }
        let insertItem = createItemsToTheList(allTasks[i].title, priorityStatus, allTasks[i].description, i, allTasks[i].date);
        document.getElementById('listItem1').insertAdjacentHTML('beforeend', insertItem);
        document.getElementById('item' + i).style.borderLeft = "5px solid " + colorCode;
    }
}
/**
 * Delete a specified task
 * @param {*} item  
 */
function deleteItemList(id) {
    let item = document.getElementById('item' + id);
    item.parentNode.removeChild(item);
    allTasks.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(allTasks));
}
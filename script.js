const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

var TOTAL_ITEMS = 0;
var UNCHECKED = TOTAL_ITEMS;

function newTodo() {
  // alert('New TODO button clicked!');
 document.getElementById("createItem").style.display = 'block';
 document.getElementById('newItem').focus();
 console.log("Create new todo");

}

function saveItem(){
	var newItem = document.getElementById('newItem').value
	var addItem = newItem.toUpperCase();
	console.log("New todo value is ",newItem);
	// check if no data or null data is entered!!
	if(newItem.trim().length == 0){
		alert("Please Enter some data!");
		document.getElementById('newItem').value = "";
		document.getElementById('newItem').focus();
		console.log("No data was entered.");
	}
	// Proceed if data is entered 
	else{

		
		var ul = document.getElementById('todo-list');
		var listItem = document.createElement('li');

		//setting  list-items id and class
		var itemId = newItem + '-id';
		listItem.setAttribute('id', itemId);
		listItem.setAttribute('class',classNames.TODO_ITEM);
		console.log("Item id is ", itemId);


		// adding checkbox
		var checkboxId = newItem + '-cx';
		var checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('id',checkboxId);
		checkbox.setAttribute('class', classNames.TODO_CHECKBOX);
		checkbox.setAttribute('onchange', 'itemCount()');

		// adding text to the item
		var span = document.createElement('span');
		span.setAttribute('class',classNames.TODO_TEXT);
		span.innerText = addItem;

		// adding delete button to each item
		var del = document.createElement('i');
		del.setAttribute('class', 'fa fa-times todo-delete');
		del.setAttribute('onClick', 'deleteItem("'+itemId+'")');      //*** imp how to passs paramter **//
		del.setAttribute('style','visibility:hidden');


		// append checkbox at the start of the item
		listItem.appendChild(checkbox);
		console.log("Checkbox appened to the  new todo");

		// append the new entered task to the item
		listItem.appendChild(span);
		console.log("Task appened to the new todo");

		// append del button to item at the end of the list
		listItem.appendChild(del);
		console.log("Delete button appened to the new todo");

		// append the item to the list
		ul.appendChild(listItem);
		document.getElementById('newItem').value = "";
		console.log("New todo appened to the todo-list");
		
		document.getElementById("createItem").style.display = 'none';

		//items and checked items count
		itemCount();



	}


}

function deleteItem(item){
	var ul = document.getElementById('todo-list');
	var item = document.getElementById(item);
	console.log(`Todo item with id ${item} is deleted.`);
	ul.removeChild(item);
	itemCount();
}


function itemCount(){
	var ul = document.getElementById('todo-list');
	var countLi = ul.children.length;
	if (countLi>0){
		document.getElementById('todolist-head').style.visibility ="visible";
	}else {
		document.getElementById('todolist-head').style.visibility ="hidden";
	}
	TOTAL_ITEMS = countLi;
	console.log("item number is ", TOTAL_ITEMS);
	document.getElementById('item-count').innerHTML = countLi;
	isChecked();

}

function isChecked(){
	UNCHECKED = TOTAL_ITEMS;
	var list = document.getElementById('todo-list').getElementsByTagName('li');
	
	for(var i = 0; i<list.length; i++){
		ie = list[i].getElementsByClassName(classNames.TODO_CHECKBOX);

		if(ie[0].checked == true){
			UNCHECKED--;
			console.log(list[i].getElementsByClassName(classNames.TODO_DELETE));
			del = list[i].getElementsByClassName(classNames.TODO_DELETE)[0];
			del.style.visibility = "visible";
			console.log("Now the unchecked count is ",UNCHECKED);
		}
		else{
			del = list[i].getElementsByClassName(classNames.TODO_DELETE)[0];
			del.style.visibility = "hidden";
		}
	}
	document.getElementById('unchecked-count').innerHTML = UNCHECKED;
}

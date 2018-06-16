'use strict';
const STORE = [//store all data here instead of the DOM
];
function generateItemElement(item, itemIndex){//use the index from the STORE and assign it in the li element
  const boxChecked = item.selected ? 'checked' : ''; //use the checked data in an if statement to assign the li element a class
  const completed = item.checked ? 'shopping-item__checked' : ''; //use the selected data in an if statement to assign the li element a class
  return `
  <li class="js-item-index-element ${itemShown}" data-item-index="${itemIndex}"> 
    <span class="shopping-item js-shopping-item ${completed}">
    ${item.name}</span>
    <div class="shopping-item-controls">
      <input id="checkBox" type="checkbox" ${boxChecked}>
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;//print out the li element as a string
}
function generateShoppingItemsString(shoppingList){//loop through the STORE and for every item in the store, generate an li element using generateItemElemens
  const items = shoppingList.map((item, index) => //since the product will be an array, need to join to one big string to put in the DOM
    generateItemElement(item, index));
  return items.join('');
}
function renderShoppingList() {
  const shoppingListItemsString = generateShoppingItemsString(items);//assign the string created with generateShoppingItemsString to a variable
  $('.shopping-list').html(shoppingListItemsString);//add the string to the ul element with the shopping-list class
}
function addItem(itemName){//add the new item as an object in the store array
  STORE.push({name: itemName, checked: false, selected: false});
}
function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function(event){//when the user clicks "add item" button...
    event.preventDefault();//prevent default behavior
    const newItemName = $('.js-shopping-list-entry').val();//make a new variable using the value of the text the user entered
    addItem(newItemName); //add it using the addItem function
    renderShoppingList();//render the updated list
  });
}
function toggleCheckedForListItem(itemIndex){
  STORE[itemIndex].checked = !STORE[itemIndex].checked;  //change the checked property to the opposite (true to false etc)
}
function getItemIndexFromElement(item){//figure out what the index of an item is
  const itemIndexString = $(item)//find the nearest li with this class
    .closest('.js-item-index-element')
    .attr('data-item-index');//get the item index from the data in the li element
  return parseInt(itemIndexString, 10);  //convert the number string into a number
}
function checkOff(){
  $('.shopping-list').on('click','.shopping-item-toggle',(function(event){//when check is clicked...
    event.preventDefault();
    const itemIndex = getItemIndexFromElement(event.currentTarget);//assign the index of the current list item to a variable
    toggleCheckedForListItem(itemIndex);//go into the STORE and toggle the checked property for the item at this index
    renderShoppingList(); //render updated list
  }));
}
function removeItem(){
  $('.shopping-list').on('click', '.js-item-delete', event => {//when delete is clicked
    const itemIndex = getItemIndexFromElement(event.currentTarget); //assign the index of the current list item to a variable
    delete STORE[itemIndex]; //delete the current item from the store
    renderShoppingList();//render updated list
  });
}
function toggleSelectedForListItem(itemIndex){
  STORE[itemIndex].selected = !STORE[itemIndex].selected; //change the selected property to the opposite (true to false etc)
}
function selectItem(){
  $('.shopping-list').on('click','#checkBox',(function(event){//when check box is clicked...
    const itemIndex = getItemIndexFromElement(event.currentTarget); //assign the index of the current list item to a variable
    toggleSelectedForListItem(itemIndex); //go into the STORE and toggle the selected property for the item at this index
    renderShoppingList(); //render updated list
  }));
}
function getItemIndexFromOutsideElement(item){
  const itemIndexString = $(item)
    .next().find('.js-item-index-element')//find the nearest li with this class
    .attr('data-item-index'); //get the item index from the data in the li element
  return parseInt(itemIndexString, 10);//convert the number string into a number 
}
function filterList(){
$('#js-shopping-list-filter').submit(function(event){//when "new list" button is clicked
  event.preventDefault();//prevent default behavior
  const checkedItems = STORE.filter(item =>{//filter the store so that only items that are checked are in "checked items"
  return item.selected===true;});
  renderShoppingList(checkedItems); //render the shopping list with checked items
  })
}
function handleSearches(){
  $('#js-shopping-list-search').submit(function(event){//when search is clicked...
    event.preventDefault();//prevent default behavior
    const searchTerm = $('#mySearch').val().toLowerCase(); //get value of what the user inputs
    const searchMatches = STORE.filter(item =>{ //filter only items that include the search term
      if (item.name.toLowerCase().includes(searchTerm)){
        return item;}
    renderShoppingList(searchMatches);//render only search matches
  });
}
// User can edit the title of an item
//add an edit button to the li template
//when user clicks on the edit button, an input should appear
//take the value of what the user input and change the name attribute of that item in the STORE
//render the list
$(() => {
  renderShoppingList();
  handleNewItemSubmit();
  handleSearches();
  checkOff();
  selectItem();
  removeItem();
  filterList();
});
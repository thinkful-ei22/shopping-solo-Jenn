'use strict';
const STORE = [

];

function generateItemElement(item, itemIndex, template)//do we need the 'template' since its not used?
//use the index from the STORE and assign it in the li element
//use the checked data in an if statement to assign the li element a class
//print out the li element as a string
{
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

function generateShoppingItemsString(shoppingList)
//loop through the STORE and for every item in the store, generate an
//li element using generateItemElement
{
  const items = shoppingList.map((item, index) => 
  //since the product will be an array, need to join to one big string to
  //put in the DOM
    generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList() {
  //assign the string created with generateShoppingItemsString to a variable
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  //add the string to the ul element with the .js-shopping-list class
  $('.js-shopping-list').html(shoppingListItemsString);
}
function addItem(itemName){
//add the new item as an object in the store array
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit(){
//when the user clicks "add item" button...
  $('#js-shopping-list-form').submit(function(event){
    //prevent default behavior
    event.preventDefault();
    //make a new variable using the value of the text the user entered
    const newItemName = $('.js-shopping-list-entry').val();
    //add it using the addItem function
    addItem(newItemName);
    //render the updated list
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex){
  //change the checked property to the opposite (true to false etc)
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

//figure out what the index of an item is
function getItemIndexFromElement(item){
  const itemIndexString = $(item)
  //find the nearest li with this class
    .closest('.js-item-index-element')
  //get the item index from the data in the li element
    .attr('data-item-index');
  //convert the number string into a number
  return parseInt(itemIndexString, 10);
}
//mark item as complete
function checkOff(){
//when check is clicked...
  $('.js-shopping-list').on('click','.shopping-item-toggle',(function(event){
    event.preventDefault();
    //assign the index of the current list item to a variable
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //go into the STORE and toggle the checked property for the item at this index
    toggleCheckedForListItem(itemIndex);
    //render updated list
    renderShoppingList();
  }));
}
//delete item
function removeItem(){
  //when delete is clicked
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
  //assign the index of the current list item to a variable
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //delete the current item from the store
    delete STORE[itemIndex];
    //render updated list
    renderShoppingList();
  });
}

$(() => {
  renderShoppingList();
  addItem();
  checkOff();
  removeItem();
});
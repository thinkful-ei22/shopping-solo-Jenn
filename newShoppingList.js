'use strict';
const STORE = [
];

function generateItemElement(item, itemIndex){//do we need the 'template' since its not used?
//use the index from the STORE and assign it in the li element
//use the checked data in an if statement to assign the li element a class
//print out the li element as a strin
  const boxChecked = item.selected ? 'checked' : '';
  const itemShown = item.displayed ? '' : 'hidden-item';
  const completed = item.checked ? 'shopping-item__checked' : '';
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
  </li>`;
}

function generateShoppingItemsString(shoppingList){
//loop through the STORE and for every item in the store, generate an
//li element using generateItemElemens
  const items = shoppingList.map((item, index) => 
  //since the product will be an array, need to join to one big string to
  //put in the DOM
    generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList(filter) {
  let items = STORE;
  //if a filter is present in render shopping list, it will run with the filter, if not, it will render normally
  if (filter){
    items=items.filter(item =>{
      //if the item in STORE includes the filter (our search term), render that item
      if (item.name.toLowerCase().includes(filter)){
        return item;
      }
    });
  }
  //assign the string created with generateShoppingItemsString to a variable
  const shoppingListItemsString = generateShoppingItemsString(items);
  //add the string to the ul element with the shopping-list class
  $('.shopping-list').html(shoppingListItemsString);
}
function addItem(itemName){
//add the new item as an object in the store array
  STORE.push({name: itemName, checked: false, selected: false, displayed: true});
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
  $('.shopping-list').on('click','.shopping-item-toggle',(function(event){
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
  $('.shopping-list').on('click', '.js-item-delete', event => {
  //assign the index of the current list item to a variable
    const itemIndex = getItemIndexFromElement(event.currentTarget);

    //delete the current item from the store
    delete STORE[itemIndex];
    //render updated list
    renderShoppingList();
  });
}

//toggle that class in a similar way to the checked/unchecked class
function toggleSelectedForListItem(itemIndex){
  //change the selected property to the opposite (true to false etc)
  STORE[itemIndex].selected = !STORE[itemIndex].selected;
}
//change the list to reflect the check
function selectItem(){
  //when check is clicked...
  $('.shopping-list').on('click','#checkBox',(function(event){
    //assign the index of the current list item to a variable
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //go into the STORE and toggle the checked property for the item at this index
    toggleSelectedForListItem(itemIndex);
    //render updated list
    renderShoppingList();
  }));
}
function toggleDisplayItem(itemIndex){
  //change the checked property to the opposite (true to false etc)
  STORE[itemIndex].displayed = !STORE[itemIndex].displayed;
}

function getItemIndexFromOutsideElement(item){
  const itemIndexString = $(item)
  //find the nearest li with this class
    .next()
    .find('.js-item-index-element')
  // //get the item index from the data in the li element
    .attr('data-item-index');
   //convert the number string into a number
  return parseInt(itemIndexString, 10);
  
}
function filterList(){
  $('#js-shopping-list-filter').submit(function(event){
    event.preventDefault();
    const itemIndex = getItemIndexFromOutsideElement(event.currentTarget);
    console.log(itemIndex);
    if (STORE[itemIndex].selected===false){
      toggleDisplayItem(itemIndex);
    }
  });
}

///when the "new list" button is clicked...
//iterate through STORE and filter all items with selected===true
//display those items

function handleSearches(){
  $('#js-shopping-list-search').submit(function(event){
    //prevent default behavior
    event.preventDefault();
    //get value of what the user inputs
    const searchTerm = $('#mySearch').val();
    //this will make the render function run our filter
    renderShoppingList(searchTerm.toLowerCase());
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
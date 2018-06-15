'use strict';

function addItem(){
//get value of item added in form
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    let newItem = $('.js-shopping-list-entry').val();
    //create a new list element with data from the form
    let newList = 
            `<li>
            <span class="shopping-item">${newItem}</span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle">
                <span class="button-label">check</span>
                </button>
                <button class="shopping-item-delete">
                <span class="button-label">delete</span>
                </button>
            </div>
            </li>`;
    //add new list item to list
    $('.shopping-list').append(newList);
  });
}
//mark item as complete
function checkOff(){
    //when check is clicked...
  $('ul').on('click','.shopping-item-toggle',(function(event){
    event.preventDefault();
    //navigate to the span holding the item name
    let done = $(event.currentTarget).parent().prev('span');
    //toggle the class on the span
    $(done).toggleClass('shopping-item__checked');
  }));
}
//delete item
function removeItem(){
    //when delete is clicked...
  $('ul').on('click','.shopping-item-delete',(function(event){
    event.preventDefault();
    //find the specific list item that this button is in and remove it
    $(event.currentTarget).parent().parent().remove();
  })); 
}

$(() => {
  addItem();
  checkOff();
  removeItem();
});
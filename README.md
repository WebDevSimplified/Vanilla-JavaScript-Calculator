# Vanilla-JavaScript-Calculator
Pure vanilla JavaScript calculator using modern ES6 syntax and classes

Arrow functions inside event listeners   equalsButton, allClearButton, deleteButton don't need button argument. they can be  like this ()=> {code}, in case like this button=>{}, button doesn't have any purpose.

Event delegation will be much better option instead of forEach() on numberButtons and operationButtons. With forEach() you are creating events for all buttons. That is a bad practice.
With event delegation you don't create click event for each button, just for buttons that are clicked. 
This is my solution: 
1. And in HTML file  for each number button and operation button data-set value of number for number buttons and operation sign for operation. data-number="1" & data-operation="*"  For example:
 <button data-number="1">1</button>
<button data-number="2">2</button>
<button data-operation="÷" >÷</button>
 <button data-operation="*">*</button>

2. Select common parent element for all buttons:
const parentElement = document.querySelector('.calculator-grid');

3. Replace forEach on numberButtons and operationButtons with this code:

parentElement.addEventListener('click', function (e) {

  if (e.target.closest('[data-number]')) {

    const btnNum = e.target.closest('[data-number]');
    const selectedNumber = btnNum.getAttribute('data-number');
    calculator.appendNumber(selectedNumber);
    calculator.updateDisplay();
  }
  if (e.target.closest('[data-operation]')) {
    const btnOperation = e.target.closest('[data-operation]');
    console.log(btnOperation);
    const selectedOperation = btnOperation.getAttribute('data-operation');
    console.log(selectedOperation);
    calculator.chooseOperation(selectedOperation);
    calculator.updateDisplay();
  }
});

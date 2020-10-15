let numbers = document.querySelectorAll('[data-number]'),
    operations = document.querySelectorAll('[data-operation]'),
    decemalBtn = document.querySelector('[decimal]'),
    clearBtns = document.querySelectorAll('.clear_btn'),
    resultBtn = document.querySelector('[data-equals]'),
    plusMinusBtn = document.querySelector('[plus-minus]'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';
    

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        NumberPress(e.target.textContent);
    })
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
};

for (let i = 0; i < clearBtns.length; i++) {
    
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
};

decemalBtn.addEventListener('click', decimal);

plusMinusBtn.addEventListener('click', negativeNumber);


function NumberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
                display.value = number;
            } else {
                display.value += number;
            }
    }; 
};

function operation(op) {
    let localOperationMemory = display.value;


    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber = +parseFloat((MemoryCurrentNumber*10+localOperationMemory*10)/10);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber = +parseFloat((MemoryCurrentNumber*10-localOperationMemory*10)/10);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber = +parseFloat(((MemoryCurrentNumber*10)*(localOperationMemory*10))/100);
        } else if (MemoryPendingOperation === '÷') {
            MemoryCurrentNumber = +parseFloat((MemoryCurrentNumber*10)/(localOperationMemory*10));
        } else if (MemoryPendingOperation === '√') {
            MemoryCurrentNumber **= parseFloat(1/localOperationMemory);
            if (MemoryCurrentNumber.toString() == NaN.toString()) {
                MemoryCurrentNumber = "Error";
            };
        } else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber **= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber= parseFloat(localOperationMemory);
        };
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }

    console.log('click on button with operation ' + op +'!');
};

function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory ='0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1 ) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'DEL') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'AC') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
    console.log('click on button with '+ id +'!');
};



function negativeNumber(argument) {
    let localNegatuveNumberMemory = display.value;
    MemoryCurrentNumber = localNegatuveNumberMemory * (-1);
    display.value = MemoryCurrentNumber;
};

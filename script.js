class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}
	clear(){
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}
	delete(){
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return; 
		if (number === '-' && this.currentOperand === '') {
			this.currentOperand = '-';
			return;
		}
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	
		chooseOperation(operation) {
			
			if (operation === '-' && this.currentOperand === '') {
				this.appendNumber('-');
				return;
			}

			if (this.currentOperand === '' && this.previousOperand !== '') {
				this.operation = operation;
				return;
			}
		
			if (this.currentOperand === '') return;
		
			if (this.previousOperand !== '') {
				this.compute();
			}
			this.operation = operation;
			this.previousOperand = this.currentOperand;
			this.currentOperand = '';
		}
		
	compute(){
		let computation
		const prev =  parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if(isNaN(prev) || isNaN(current)) return
		switch(this.operation){
			case '+':
				computation = prev +current
				break
			case '-':
				computation = prev - current
				break
			case 'x':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	getDisplayNumber(number){
		
			if (number === Infinity || number === -Infinity) {
				return number.toString(); 
			}
		
			if (!number && number !== 0) return '';
		
			const parts = number.toString().split('.');
			let integerPart = parts[0];
			const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
			
			let lastThree = integerPart.slice(-3);
			let rest = integerPart.slice(0, -3);
			if (rest) {
				rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
			}
			return rest ? rest + ',' + lastThree + decimalPart : lastThree + decimalPart;

			
	}

	updateDisplay(){
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
		if(this.operation != null){
		this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
		}
		else{
			this.previousOperandTextElement.innerText = ''
		}
	}
}

const numberButtons  = document.querySelectorAll('[data-number]')
const operationButtons  = document.querySelectorAll('[data-operation]')
const equalsButton  = document.querySelector('[data-equals]')
const deleteButton  = document.querySelector('[data-delete]')
const allClearButton  = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', ()=>{
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})


operationButtons.forEach(button => {
	button.addEventListener('click', ()=>{
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute()
	calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
	calculator.clear()
	calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})

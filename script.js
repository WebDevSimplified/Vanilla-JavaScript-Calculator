class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	percent() {
		this.currentOperand = this.previousOperand / (100 / this.currentOperand);
	}

	carre() {
		this.currentOperand *= this.currentOperand;
	}

	cube() {
		this.currentOperand = this.currentOperand ** 3;
	}

	puissance() {
		this.currentOperand = this.currentOperand ** 3;
	}

	ex() {
		this.currentOperand = this.currentOperand ** 3;
	}

	dixx() {
		this.currentOperand = this.currentOperand ** 3;
	}

	unsurx() {
		this.currentOperand = 1 / this.currentOperand;
	}

	sqrt() {
		this.currentOperand = Math.sqrt(this.currentOperand);
	}

	troissqrt() {
		this.currentOperand = Math.sqrt(this.currentOperand);
	}
	ysqrt() {
		this.currentOperand = Math.sqrt(this.currentOperand);
	}

	ln() {
		this.currentOperand = Math.ln(this.currentOperand);
	}

	log10() {
		this.currentOperand = Math.ln(this.currentOperand);
	}

	factorielle() {
		console.log("factorielle");
		console.log(this.currentOperand);
		let fact = 1;
		for (let i = 1; i <= this.currentOperand; i++) {
			fact = i * fact;
		}
		this.currentOperand = fact;
	}

	sin() {
		this.currentOperand = Math.sin(this.currentOperand);
	}

	cos() {
		this.currentOperand = Math.cos(this.currentOperand);
	}

	tan() {
		this.currentOperand = Math.tan(this.currentOperand);
	}

	e() {
		this.currentOperand = Math.exp(1);
	}

	pi() {
		this.currentOperand = Math.PI;
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const percentButton = document.querySelector("[data-percent]");
const carreButton = document.querySelector("[data-carre]");
const cubeButton = document.querySelector("[data-cube]");
const puissanceButton = document.querySelector("[data-puissance]");
const exButton = document.querySelector("[data-ex]");
const dixxButton = document.querySelector("[data-dixx]");
const unsurxButton = document.querySelector("[data-unsurx]");
const sqrtButton = document.querySelector("[data-sqrt]");
const troissqrtButton = document.querySelector("[data-troissqrt]");
const ysqrtButton = document.querySelector("[data-ysqrt]");
const lnButton = document.querySelector("[data-ln]");
const log10Button = document.querySelector("[data-log10]");
const factorielleButton = document.querySelector("[data-factorielle]");
const sinButton = document.querySelector("[data-sin]");
const cosButton = document.querySelector("[data-cos]");
const tanButton = document.querySelector("[data-tan]");
const eButton = document.querySelector("[data-e]");
const EEButton = document.querySelector("[data-EE]");
const piButton = document.querySelector("[data-pi]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach(button => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", button => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
	calculator.clear();
	calculator.updateDisplay();
});
percentButton.addEventListener("click", button => {
	calculator.percent();
	calculator.updateDisplay();
});

carreButton.addEventListener("click", button => {
	calculator.carre();
	calculator.updateDisplay();
});

cubeButton.addEventListener("click", button => {
	calculator.cube();
	calculator.updateDisplay();
});
// a faire
puissanceButton.addEventListener("click", button => {
	calculator.cube();
	calculator.updateDisplay();
});

// a faire
exButton.addEventListener("click", button => {
	calculator.ex();
	calculator.updateDisplay();
});
// a faire
dixxButton.addEventListener("click", button => {
	calculator.dixx();
	calculator.updateDisplay();
});

unsurxButton.addEventListener("click", button => {
	calculator.unsurx();
	calculator.updateDisplay();
});

sqrtButton.addEventListener("click", button => {
	calculator.sqrt();
	calculator.updateDisplay();
});

troissqrtButton.addEventListener("click", button => {
	calculator.sqrt();
	calculator.updateDisplay();
});

ysqrtButton.addEventListener("click", button => {
	calculator.sqrt();
	calculator.updateDisplay();
});

lnButton.addEventListener("click", button => {
	calculator.log();
	calculator.updateDisplay();
});

log10Button.addEventListener("click", button => {
	calculator.log10();
	calculator.updateDisplay();
});

factorielleButton.addEventListener("click", button => {
	calculator.factorielle();
	calculator.updateDisplay();
});

sinButton.addEventListener("click", button => {
	calculator.sin();
	calculator.updateDisplay();
});

cosButton.addEventListener("click", button => {
	calculator.cos();
	calculator.updateDisplay();
});

tanButton.addEventListener("click", button => {
	calculator.tan();
	calculator.updateDisplay();
});

eButton.addEventListener("click", button => {
	calculator.e();
	calculator.updateDisplay();
});

piButton.addEventListener("click", button => {
	calculator.pi();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
	calculator.delete();
	calculator.updateDisplay();
});

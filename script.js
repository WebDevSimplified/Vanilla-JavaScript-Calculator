class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {//数値の振り分け、追加
    if (number === '.' && this.currentOperand.includes('.')) return;
    //入力が '.' かつ currentOperand に '.' が含まれている場合に何もしない
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    //currentOperandが空であるとき、何もしない
    if (this.previousOperand !== '') {
      this.compute();
      //previousOperandが入力されているとき計算を実行する
    }

    this.operation = operation;
    // 入力されたオペレータをthis.operationに代入
    // ->`compute()`で使用可能にする
    this.previousOperand = this.currentOperand;
    // オペレータを選択すると、今のオペランドをpreviousオペランドに代入する
    this.currentOperand = '';
    // currentOperandはprevに渡したので、新規の数値を受け付けるために空にする
  }

  compute() {
    let computation;
    //計算結果を代入する変数
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //値を数値化して定数に代入

    if (isNaN(prev) || isNaN(current)) return;
    //両方のオペランドが数値ではないとき、何もしない
    switch (this.operation) {//入力の`operation`に応じた計算を実行する
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    // 計算結果をcurrentOperandに代入する
    this.operation = undefined;
    // `this.operation`で計算した後、リセットする
    this.previousOperand = '';
    // previousOperandを空にする
  }

  getDisplayNumber(number) {//numberを整形してディスプレイに表示する文字列を生成する関数
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    //stringNumberを'.'で分割し、整数部分を定数に代入する
    const decimalDigits = stringNumber.split('.')[1];
    //'.'で分割し、インデックスの1番目の部分以降(小数点以下の桁)を定数に代入する
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
      //integerDigitsが数値でないとき(存在しないとき)に空文字列を代入する
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      //整数部分が数値のとき、整数としてフォーマットし、
      //大きな数値を読みやすい形式で表示できるようにする
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
      //小数部分があるとき、整数部分と小数部分を連結して返す。
    } else {
      return integerDisplay;
      //小数部分がないとき、整数部分のみを返す
    }
  }

  updateDisplay() {//イベントリスナーから送られた数値を表示する
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    //`this.getDisplayNumber(this.currentOperand)`を使って整形した文字列を
    //`this.currentOperandTextElement.innerText`に設定する
    //現在の数値の表示を更新する

    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        // operationが入力されているとき
        // サブディスプレイに`this.getDisplayNumber(this.previousOperand)の値と
        //operationの文字列を表示する

    } else {
      this.previousOperandTextElement.innerText = '';
      // operationが未設定のとき、サブディスプレイに空文字が代入される
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
//サブディスプレイ
const currentOperandTextElement = document.querySelector('[data-current-operand]');
//メインディスプレイ

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});
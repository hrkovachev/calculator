let firstNumber = null;
let secondNumber = null;
let currOperator = null;
let ans = 0;
let currInput = "";
let clearInput = false;
let cleared = false;

let operatorsArray = ["+", "-", "×", "÷"];

const currCalcDisplay = document.getElementsByClassName("display-top-row")[0];
const answerDisplay = document.getElementsByClassName("display-bottom-row")[0];
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const pointButton = document.getElementById("btn-point");
const delButton = document.getElementById("btn-del");
const acButton = document.getElementById("btn-ac");
const ansButton = document.getElementById("btn-ans");
const equalButton = document.getElementById("btn-equal");

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "×":
      result = multiply(a, b);
      break;
    case "÷":
      result = divide(a, b);
      break;
  }
  return +result.toFixed(8);
  // Note the plus sign that drops any "extra" zeroes at the end.
  // It changes the result (which is a string) into a number again (think "0 + foo"),
  // which means that it uses only as many digits as necessary.
}

function doMath() {
  secondNumber = currInput;
  if (currOperator == "÷" && secondNumber === "0") {
    answerDisplay.textContent = "not allowed";
  } else {
    answerDisplay.textContent = operate(
      currOperator,
      Number(firstNumber),
      Number(secondNumber)
    );
    ans = Number(answerDisplay.textContent);
  }
  currOperator = null;
  currInput = "";
  clearInput = true;
  firstNumber = null;
  secondNumber = null;
  cleared = false;
}

function allClear() {
  currCalcDisplay.textContent = "";
  answerDisplay.textContent = 0;
  firstNumber = null;
  secondNumber = null;
  currOperator = null;
  currInput = "";
  cleared = true;
}

function deleteLastEntry() {
  currCalcDisplay.textContent = currCalcDisplay.textContent.slice(0, -1);
  currInput = currInput.slice(0, -1);
}

function handleOperator(operator) {
  let lastChar = currCalcDisplay.textContent.at(-1);
  if (operatorsArray.includes(lastChar)) {
    currCalcDisplay.textContent = currCalcDisplay.textContent.slice(0, -1);
    currCalcDisplay.textContent += operator;
  } else {
    if (clearInput && currInput === "") {
      currCalcDisplay.textContent = "";
      clearInput = false;
    }
    if (currOperator != null && currInput !== "") {
      secondNumber = currInput;
      doMath();
    }
    if (firstNumber === null) {
      if (currInput === "" && !cleared) {
        firstNumber = ans;
        currCalcDisplay.textContent = ans;
        currInput = ans;
      } else {
        firstNumber = Number(currInput);
      }
    } else if (currInput !== "") {
      secondNumber = Number(currInput);
    }
    currInput = "";
    currCalcDisplay.textContent += operator;
  }
  currOperator = operator;
}

function handleNumbers(number) {
  if (clearInput && secondNumber !== null) {
    currCalcDisplay.textContent = "";
    clearInput = false;
  }
  currCalcDisplay.textContent += number;
  currInput += number;
}

function handleAns() {
  if (ans !== 0) {
    currInput += ans;
    currCalcDisplay.textContent += ans;
    clearInput = false;
  }
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) handleNumbers(e.key);
  if (e.key === ".") handleNumbers(e.key);
  if (e.key === "=" || e.key === "Enter") doMath();
  if (e.key === "Backspace") deleteLastEntry();
  if (e.key === "Escape") allClear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    handleOperator(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

acButton.addEventListener("click", () => allClear());
delButton.addEventListener("click", () => deleteLastEntry());
operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => handleOperator(e.target.textContent));
});
numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => handleNumbers(e.target.textContent));
});
equalButton.addEventListener("click", () => doMath());
ansButton.addEventListener("click", (e) => handleAns());
window.addEventListener("keydown", handleKeyboardInput);

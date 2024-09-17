let outputResult = document.querySelector(".result .value");
let outputOperation = document.querySelector(".operation .value");
let input__element = document.querySelector(".input");

//some variables
const operator = ["+", "-", "*", "/"];
const FACTORIAL = "FACTORIAL";
let POWER = "Math.pow(";
let formula_str;

let data = {
  operation: [],
  formula: [],
};

let calculatorBtns = [
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt(",
    type: "math_function",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "math_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp(",
    type: "math_function",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log(",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10(",
    type: "math_function",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
];

/// create calculator  buttons

function createCalcBtns() {
  let addBtns = 0;
  let btnsPerRow = 8;
  calculatorBtns.forEach((button) => {
    if (addBtns % btnsPerRow == 0) {
      input__element.innerHTML += `<div class="row"></div>`;
    }
    let row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id = "${button.name}">${button.symbol}</button>`;
    addBtns++;
  });
}
createCalcBtns();

//add event into every btns
input__element.addEventListener("click", (e) => {
  let targetBtn = e.target;
  calculatorBtns.forEach((button) => {
    if (button.name == targetBtn.id) {
      calculate(button);
    }
  });
});

// rad deg convert

let RADIAN = true;

let radbtn = document.getElementById("rad");
let degbtn = document.querySelector("#deg");
radbtn.classList.add("active-angle");

function angleToggler() {
  radbtn.classList.toggle("active-angle");
  degbtn.classList.toggle("active-angle");
}

function calculate(button) {
  // console.log(button);

  if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.formula = [];
      data.operation = [];
      updateoutputresult(0);
    } else if (button.name == "delete") {
      data.formula.pop();
      data.operation.pop();
    } else if (button.name == "rad") {
      RADIAN = true;
      angleToggler();
    } else if (button.name == "deg") {
      RADIAN = false;
      angleToggler();
    }
  } else if (button.type == "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
    console.log(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;
    if (button.name == "power") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "square") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
      data.operation.push(2);
      data.formula.push(2);
    } else if (button.name == "factorial") {
      symbol = "!";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else {
      symbol = button.symbol + "(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "calculate") {
    formula_str = data.formula.join("");

    // get index of power and factorial in formula array
    let PowerIndexsearch = searchIndex(data.formula, POWER);
    let factorialIndexsearch = searchIndex(data.formula, FACTORIAL);

    // console.log(factorialIndexsearch);

    // get base of before Power

    let base = poweBaseGetter(data.formula, PowerIndexsearch);
    // console.log(base);

    base.forEach((powerbase) => {
      let toReplace = powerbase + POWER;
      let replacement = POWER + powerbase + ",";

      formula_str = formula_str.replace(toReplace, replacement);
    });

    // get factorial th n (n)
    let factorials = factorialBaseGetter(data.formula, factorialIndexsearch);

    console.log(factorials);

    factorials.forEach((factorial) => {
      formula_str = formula_str.replace(
        factorial.toReplace,
        factorial.replacement
      );
    });

    // console.log(PowerIndexsearch, factorialIndexsearch);
    // console.log(data.formula);

    let result;
    try {
      result = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateoutputresult(result);
        return;
      }
    }

    // save result in ans btn
    ans = result;
    data.formula = [result];
    data.operation = [result];

    //

    updateoutputresult(result);
    return;
  }
  updateoutputoperation(data.operation.join(""));
}

// GAMMA FUNCTION

function gamma(n) {
  let g = 7;
  let C = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];

  if (n < 0.5) return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n));
  else {
    n -= 1;

    var x = C[0];
    for (var i = 1; i < g + 2; i++) x += C[i] / (n + i);

    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}

//define factorial function

function factorial(n) {
  if (n % 1 != 0) return gamma(n + 1);
  let result = 1;
  if (n === 0) {
    return 1;
  }
  if (n >= 1) {
    for (var i = 1; i <= n; i++) {
      result *= i;
      if (result === Infinity) {
        return Infinity;
      }
    }
  }
  return result;
}
/// define searchIndex
function searchIndex(array, keyword) {
  let searchArray = [];
  array.forEach((element, index) => {
    if (element == keyword) {
      searchArray.push(index);
    }
  });
  return searchArray;
}

// DEFINE poweBaseGetter FUNCTion
function poweBaseGetter(dataformula, PowerIndexsearch) {
  let bases = [];
  let previousIndex;
  PowerIndexsearch.forEach((powerIndex) => {
    let base = [];
    previousIndex = powerIndex - 1;
    let parenthesisCount = 0;

    while (previousIndex >= 0) {
      if (dataformula[previousIndex] === "(") {
        parenthesisCount--;
      }
      if (dataformula[previousIndex] === ")") {
        parenthesisCount++;
      }
      let isOperator = false;
      operator.forEach((operator) => {
        if (dataformula[previousIndex] == operator) {
          isOperator = true;
        }
      });

      isPower = dataformula[previousIndex] == POWER;

      if ((isOperator && parenthesisCount == 0) || isPower == true) {
        break;
      }
      base.unshift(dataformula[previousIndex]);
      previousIndex--;
    }
    bases.push(base.join(""));
  });
  return bases;
}

//define factorialBaseGetter fucntion
function factorialBaseGetter(dataformula, factorialIndexsearch) {
  let factorials = [];
  let factorialSequense = 0;

  factorialIndexsearch.forEach((factorialIndex) => {
    let number = [];
    let nextIndex = factorialIndex + 1;
    let nextInput = dataformula[nextIndex];

    if (nextInput == FACTORIAL) {
      factorialSequense += 1;
      return;
    }

    let first_factorial_Index = factorialIndex - factorialSequense;
    let previousIndex = first_factorial_Index - 1;
    let parenthesisCount = 0;

    while (previousIndex >= 0) {
      if (dataformula[previousIndex] === "(") {
        parenthesisCount--;
      }
      if (dataformula[previousIndex] === ")") {
        parenthesisCount++;
      }
      let isOperator = false;
      operator.forEach((operator) => {
        if (dataformula[previousIndex] == operator) {
          isOperator = true;
        }
      });

      // get very first factorial Index in case there's more than one factorial

      if (isOperator && parenthesisCount == 0) {
        break;
      }
      number.unshift(dataformula[previousIndex]);
      previousIndex--;
    }
    let number_str = number.join("");
    console.log(number_str);
    const factorial = "factorial(";
    let close_parenthesis = ")";

    let times = factorialSequense + 1;

    let toReplace = number_str + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + number_str + close_parenthesis.repeat(times);
    factorials.push({
      toReplace: toReplace,
      replacement: replacement,
    });

    // factorial sequence 0
    factorialSequense = 0;
  });
  return factorials;
}

// define  update function
function updateoutputresult(result) {
  outputResult.innerHTML = result;
}
function updateoutputoperation(operation) {
  outputOperation.innerHTML = operation;
}

// define trigo & inv trigo function function
function trigo(callback, angle) {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }
  return callback(angle);
}
function inv_trigo(callback, value) {
  angle = callback(value);
  if (!RADIAN) {
    angle = (angle * 180) / Math.PI;
  }
  return angle;
}

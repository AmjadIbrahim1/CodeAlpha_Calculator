const output = document.getElementById("output");
let flag = 0;
let flag1 = 0;

for (let i = 0; i <= 9; i++) {
    document.getElementById(`b${i}`).onclick = () => appendToOutput(i.toString());
}

const bC = document.getElementById("bC");
const bPlus = document.getElementById("b_plus");
const bBack = document.getElementById("b-back");
const bMult = document.getElementById("b-mult");
const bEqual = document.getElementById("b_equal");
const bMinus = document.getElementById("b_sub");
const bDivide = document.getElementById("b_divide");
const bPoint = document.getElementById("b-point");

function clearFlags() {
    if (flag || flag1) {
        output.value = "";
        flag = 0;
        flag1 = 0;
    }
}

function appendToOutput(value) {
    clearFlags();
    if (output.value === "0" && value === "0") return;
    output.value += value;
}

function appendOperator(op) {
    clearFlags();
    if(!output.value && op == '-')output.value += op;
    else if (!output.value || isNaN(output.value[output.value.length - 1])) return;
    else output.value += op;
}

bPlus.onclick = () => appendOperator("+");
bMinus.onclick = () => appendOperator("-");
bMult.onclick = () => {
    if (output.value === "") return;
    if (output.value[0] === "*") return (output.value = "");
    appendOperator("*");
};
bDivide.onclick = () => {
    if (output.value === "") return;
    if (output.value[0] === "/") return (output.value = "");
    appendOperator("/");
};
bPoint.onclick = () => {
    clearFlags();
    output.value += ".";
};

bBack.onclick = () => {
    clearFlags();
    if (output.value === "Syntax Error" || output.value === "Runtime error") {
        output.value = "";
    } else {
        output.value = output.value.slice(0, -1);
    }
};

bC.onclick = () => {
    flag = 0;
    output.value = "";
};

bEqual.onclick = () => {
    clearFlags();
    let str = output.value;

    if (!isValidExpression(str)) {
        output.value = "Syntax Error";
        flag = 1;
        return;
    }

    if (isDivideByZero(str)) {
        output.value = "Runtime error";
        flag = 1;
        return;
    }

    try {
        let result = eval(str); 
        output.value = result;
        flag1 = 1;
    } catch {
        output.value = "Syntax Error";
        flag = 1;
    }
};

function isValidExpression(expr) {
    const invalidPatterns = [
        /[\+\-\*\/]{2,}/,             
        /^[\*\/]/,                    
        /[\+\-\*\/\.]$/,              
        /\.\D|\D\./,                  
        /[^\d\+\-\*\/\.]/             
    ];
    return !invalidPatterns.some(pattern => pattern.test(expr));
}

function isDivideByZero(expr) {
    return /\/0(?!\d)/.test(expr);
}

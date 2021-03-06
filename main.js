// author Borisevich M.R. 621702
// author Shokal I.D. 621701


let LEFT_BRACKET = "(";
let RIGHT_BRACKET = ")";
let lBracketPattern = new RegExp('\\' + LEFT_BRACKET, 'g');
let rBracketPattern = new RegExp('\\' + RIGHT_BRACKET, 'g');

let KONJUNCTION = "&";
let DISJUNCTION = "|";
let NEGATION = "!";

let conjNum = 0;

// author Borisevich M.R. 621702
function main(){
    let formula = document.getElementById("formula").value.toString();
    if (formula.includes(KONJUNCTION) && formula.includes(LEFT_BRACKET) && formula.includes(RIGHT_BRACKET) && checkBracketsNum(formula)) {
        if (checkRightBinaryFormula(formula)) {
            document.writeln("<u>Формула является КНФ</u><br>\n");
        } else if (checkSymbols(formula)) {
            document.writeln("<u>Формула является КНФ</u><br>\n");
        } else {
            document.writeln("<u>Формула не является КНФ</u><br>\n");
        }
    } else if (formula.includes(NEGATION) && formula.includes(LEFT_BRACKET) && formula.includes(RIGHT_BRACKET)) {
        if (checkRightUnaryFormula(formula))  {
            document.writeln("<u>Формула является КНФ</u><br>\n");
        } else {
            document.writeln("<u>Формула не является КНФ</u><br>\n");
        }
    }
    else {
        if (checkSymbols(formula)) {
            document.writeln("<u>Формула является КНФ</u><br>\n");
        } else {
            document.writeln("<u>Формула не является КНФ</u><br>\n");
        }
    }
}

// author Shokal I.D. 621701
function removeOuterBrackets(formula) {
    formula = formula.replace(LEFT_BRACKET, "");
    formula = formula.replace(new RegExp('\\' + RIGHT_BRACKET + '$'), '');
    return formula
}

// author Shokal I.D. 621701
function checkSymbols(formula) {
    let symbols = /^[A-Z0]+$/;
    return symbols.test(formula);
}

// author Borisevich M.R. 621702
function checkBracketsNum(formula) {
    if (formula.includes(LEFT_BRACKET) && formula.includes(RIGHT_BRACKET)) {
        let leftBracketsArr = formula.match(lBracketPattern);
        let rightBracketsArr = formula.match(rBracketPattern);
        if (leftBracketsArr.length !== rightBracketsArr.length) {
            return false;
        }
    } else if (formula.includes(LEFT_BRACKET) && !formula.includes(RIGHT_BRACKET)) {
        return false;
    } else if (formula.includes(RIGHT_BRACKET) && !formula.includes(LEFT_BRACKET)) {
        return false;
    }
    return true;
}

// author Shokal I.D. 621701
function checkRightUnaryFormula(formula) {
    if (formula.indexOf(LEFT_BRACKET) === 0) {
        formula = removeOuterBrackets(formula);
    }
    let rightSymbols = formula.match(/[A-Z01]/g);
    if (rightSymbols === null || rightSymbols.length !== 1) {
        return false;
    }
    let symbols = formula.match(/./g);
    if (symbols !== null) {
        if (rightSymbols.length !== (symbols.length-1)) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

// author Borisevich M.R. 621702
function checkRightBinaryFormula(formula) {
    let result = false;

    if (formula.indexOf(LEFT_BRACKET) === 0) {
        formula = removeOuterBrackets(formula);

        let symbol = KONJUNCTION;
        if (conjNum > 0) {
            let disjIndex = getCentralOperationIndex(formula, DISJUNCTION);
            if (disjIndex < formula.length) {
                symbol = DISJUNCTION;
            }
        }
        let operatorIndex = getCentralOperationIndex(formula, symbol);
        if (operatorIndex >= formula.length) {
            return false;
        }

        if (symbol === KONJUNCTION) {
            conjNum++;
        }
        
        let formulaElements = [];
        formulaElements[0] = formula.slice(0, operatorIndex);
        formulaElements[1] = formula.slice(operatorIndex + 1, formula.length);

        for (let i = 0; i < formulaElements.length; i++) {
            if (checkSymbols(formulaElements[i])) {
                result = true;
            } else if (checkRightUnaryFormula(formulaElements[i])) {
                result = true;
            } else if (checkRightBinaryFormula(formulaElements[i])) {
                result = true;
            } else {
                result = false;
                break;
            }
        }
    }
    return result;
}

// author Borisevich M.R. 621702
function getCentralOperationIndex(formula, operator) {
    let openBracketsNum = 0;
    let i = 0;
    if (formula.includes(LEFT_BRACKET) && formula.includes(RIGHT_BRACKET)) {
        while (i < formula.length) {
            if (formula[i] === LEFT_BRACKET) {
                openBracketsNum++;
            } else if (formula[i] === RIGHT_BRACKET) {
                openBracketsNum--;
            } else if (formula[i] === operator && openBracketsNum === 0) {
                break;
            }
            i++;
        }
    } else if (formula.includes(operator)) {
        return formula.indexOf(operator);
    }
    return i;
}

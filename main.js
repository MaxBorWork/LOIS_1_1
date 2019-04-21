// author Borisevich M.R. 621702

let LEFT_BRACKET = "(";
let RIGHT_BRACKET = ")";
let lBracketPattern = new RegExp('\\' + LEFT_BRACKET, 'g');
let rBracketPattern = new RegExp('\\' + RIGHT_BRACKET, 'g');

let KONJUNCTION = "&";
let DISJUNCTION = "|";
let NEGATION = "!";


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
    } else {
        if (checkRightUnaryFormula(formula)) {
            document.writeln("<u>Формула является КНФ</u><br>\n");
        } else {
            document.writeln("<u>Формула не является КНФ</u><br>\n");
        }
    }
}

function removeOuterBrackets(formula) {
    formula = formula.replace(LEFT_BRACKET, "");
    formula = formula.replace(new RegExp('\\' + RIGHT_BRACKET + '$'), '');
    return formula
}

function checkSymbols(formula) {
    let symbols = /^[A-Z01]+$/;
    return symbols.test(formula)
}

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

function checkRightUnaryFormula(string) {
    let rightSymbols = string.match(/[A-z01]/g);
    if (rightSymbols === null || rightSymbols.length !== 1) {
        return false;
    }
    let symbols = string.match(/[A-z01]|[!|~\->&]/g);
    if (symbols !== null) {
        if (!symbols.includes(NEGATION) && rightSymbols.length !== symbols.length) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

function checkRightBinaryFormula(formula) {
    let result = false;

    if (formula.indexOf(LEFT_BRACKET) === 0) {
        formula = removeOuterBrackets(formula);

        let symbol = KONJUNCTION;

        let disjIndex = getCentralOperationIndex(formula, DISJUNCTION);
        if (disjIndex < formula.length) {
            symbol = DISJUNCTION;
        }

        let operatorIndex = getCentralOperationIndex(formula, symbol);

        let formulaElements = [];
        formulaElements[0] = formula.slice(0, operatorIndex);
        formulaElements[1] = formula.slice(operatorIndex + 1, formula.length);

        for (let i = 0; i < formulaElements.length; i++) {
            if (result !== checkSymbols(formulaElements[i]) ||
                            checkRightUnaryFormula(formulaElements[i]) ||
                            checkRightBinaryFormula(formulaElements[i])) {
                result = true;
            } else {
                break;
            }
        }
    }
    return result;
}

function getCentralOperationIndex(formula, operator) {
    let openBracketsNum = 0;
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === LEFT_BRACKET) {
            openBracketsNum++;
        } else if (formula[i] === RIGHT_BRACKET) {
            openBracketsNum--;
        } else if (formula[i] === operator && openBracketsNum === 0) {
            return i;
        }
        i++;
    }
}

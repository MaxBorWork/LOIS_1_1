// author Borisevich M.R. 621702

let LEFT_BRACKET = "(";
let RIGHT_BRACKET = ")";
let lBrakcetPattern = new RegExp('\\' + LEFT_BRACKET, 'g');
let rBrakcetPattern = new RegExp('\\' + RIGHT_BRACKET, 'g');

let KONJUNCTION = "&";
let DISJUNCTION = "|";
let NEGATION = "!";
let IMPLICATION = "->";
let EQUIVALENCE = "~";

let disJunctions = [];


function main(){
    let formula = document.getElementById("formula").value.toString();
    if (formula.includes(KONJUNCTION) && formula.includes(LEFT_BRACKET) && formula.includes(RIGHT_BRACKET) && checkBracketsNum(formula)) {
        formula = formula.replace(LEFT_BRACKET, "");
        formula = formula.replace(new RegExp('\\' + RIGHT_BRACKET + '$'), '');
        let disjIndex = 0;
        let formulaSplit = formula.split(KONJUNCTION);
        if (formulaSplit.length > 0) {
            for (let i = 0; i < formulaSplit.length; i++) {
                disJunctions[disjIndex] = formulaSplit[i];
                disjIndex++;
            }
            if (procSubformulas()) {
                document.writeln("<u>Формула является КНФ</u><br>\n");
            } else {
                document.writeln("<u>Формула не является КНФ</u><br>\n");
            }
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

function procSubformulas() {
    for (let i = 0; i < disJunctions.length; i++) {
        let disJunction = disJunctions[i];
        let disjLeftBracketsArr = disJunction.match(lBrakcetPattern);

        if (disjLeftBracketsArr !== null) {
            if (!disJunction.includes(DISJUNCTION) && !disJunction.includes(NEGATION)) {
                return false;
            } else {
                if (disjLeftBracketsArr.length > 1) {

                } else if (disjLeftBracketsArr.length === 1) {
                    let symbols = disJunction.match(/[A-z]/g);
                    if (symbols.length !== 2 && disJunction.includes(DISJUNCTION)) {
                        return false;
                    } else if (symbols.length === 1 && !disJunction.includes(NEGATION)) {
                        return false;
                    }
                }
            }
        } else {
            checkRightUnaryFormula(disJunction);
        }
    }
    return true;
}

function checkBracketsNum(formula) {
    if (formula.includes(LEFT_BRACKET) && formula.includes(RIGHT_BRACKET)) {
        let leftBracketsArr = formula.match(lBrakcetPattern);
        let rightBracketsArr = formula.match(rBrakcetPattern);
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
    let rightSymbols = string.match(/[A-z]|[01]/g);
    if (rightSymbols === null || rightSymbols.length !== 1) {
        return false;
    }
    let symbols = string.match(/[A-z]|[01][!|~\->&]/g);
    if (symbols !== null) {
        if (!symbols.includes(NEGATION) && rightSymbols.length !== symbols.length) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}
import SyntaxKind from "./syntax/SyntaxKind";
import SyntaxNode from "./syntax/SyntaxNode";
import SyntaxToken from "./syntax/SyntaxToken";
import Diagnostic from "../../utils/Diagnostic";
import NumericExpressionEvaluator from "./evaluate/NumericExpressionEvaluator";
import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import SyntaxTree from "./syntax/SyntaxTree";
import Binder from "./binding/Binder";


let showTree = false;

function program(val: string) {
    if (val === "showTree") {
        showTree = !showTree;
        console.log(showTree ? "Showing Parse Tree" : "Not showing parse tree");
        return;
    } else if(val === "cls") {
        console.clear();
        return;
    }
    const syntaxTree = SyntaxTree.parse(val);
    const boundExpression = new Binder().bindExpression(syntaxTree.getRoot());
    if (showTree) {
        prettyPrint(syntaxTree.getRoot());
    }
    if (!Diagnostic.hasError()) {
        const numericExpressionEvaluator = new NumericExpressionEvaluator(boundExpression);
        console.log(numericExpressionEvaluator.evaluate());
    }
    Diagnostic.logError();
}

function prettyPrint(root: SyntaxNode, intend: string = "") {
    console.log(intend + SyntaxKind[root.getKind()]);
    intend += "|----";
    if (root instanceof SyntaxToken && root.value != null) {
        console.log(intend + " " + root.value);
    }
    root.getChildren().forEach(i => 
        prettyPrint(i, intend));
}


function main() {
    // const val = "2 + 3 + 5";
    const repl = readline.createInterface({
        input: stdin,
        output: stdout
    });
    repl.on("line", (input) => {
        program(input);
    });
}
main();
import SyntaxKind from "./syntax/SyntaxKind";
import SyntaxNode from "./syntax/SyntaxNode";
import SyntaxToken from "./syntax/SyntaxToken";
import Parser from "./syntax/Parser";
import Diagnostic from "../../utils/Diagnostic";
import NumericExpressionEvaluator from "./evaluator/NumericExpressionEvaluator";
import { token } from "morgan";


function program(val: string) {
    const parser = new Parser(val);
    parser.parse();
    const syntaxTree = parser.buildSyntaxTree();
    prettyPrint(syntaxTree.getRoot());
    if (!Diagnostic.hasError()) {
        const numericExpressionEvaluator = new NumericExpressionEvaluator(syntaxTree.getRoot());
        console.log(numericExpressionEvaluator.evaluate());
    }
    Diagnostic.logError();
}

function prettyPrint(root: SyntaxNode, intend: string = "") {
    console.log(intend + SyntaxKind[root.getKind()]);
    if (root instanceof SyntaxToken && root.value != null) {
        console.log(intend + " " + root.value);
    }
    intend += "|----";
    root.getChildren().forEach(i => 
        prettyPrint(i, intend));
}


function main() {
    const val = "2 + 3 + 5";
    program(val);
}
main();
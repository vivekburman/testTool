import SyntaxKind from "../binding/SyntaxKind";
import SyntaxToken from "../binding/SyntaxToken";
import ExpressionSyntax from "./ExpressionSyntax";

class BinaryExpressionSyntax extends ExpressionSyntax {

    kind = SyntaxKind.BinaryExpressionToken;
    left: ExpressionSyntax;
    right: ExpressionSyntax;
    operator: SyntaxToken;

    constructor(left: ExpressionSyntax, operator: SyntaxToken, right:ExpressionSyntax) {
        super();
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getOperator() {
        return this.operator;
    }
}
export default BinaryExpressionSyntax;
import SyntaxKind from "./SyntaxKind";
import SyntaxToken from "./SyntaxToken";
import ExpressionSyntax from "./ExpressionSyntax";
import SyntaxNode from "./SyntaxNode";

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

    getChildren(): SyntaxNode[] {
        return [
            this.left,
            this.operator,
            this.right
        ];
    }

    parseExpression() {
    }
}
export default BinaryExpressionSyntax;
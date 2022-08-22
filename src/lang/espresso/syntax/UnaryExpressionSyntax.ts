import SyntaxKind from "./SyntaxKind";
import SyntaxToken from "./SyntaxToken";
import ExpressionSyntax from "./ExpressionSyntax";
import SyntaxNode from "./SyntaxNode";

class UnaryExpressionSyntax extends ExpressionSyntax {

    kind = SyntaxKind.UnaryExpressionToken;
    operatorToken: SyntaxToken;
    operand: ExpressionSyntax;

    constructor(operatorToken: SyntaxToken, operand:ExpressionSyntax) {
        super();
        this.operatorToken = operatorToken;
        this.operand = operand;
    }

    getOperand() {
        return this.operand;
    }
    getOperatorToken() {
        return this.operatorToken;
    }

    getChildren(): SyntaxNode[] {
        return [
            this.operatorToken,
            this.operand,
        ];
    }

    parseExpression() {
    }
}
export default UnaryExpressionSyntax;
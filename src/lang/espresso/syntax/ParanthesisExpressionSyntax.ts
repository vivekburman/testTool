import SyntaxKind from "./SyntaxKind";
import SyntaxToken from "./SyntaxToken";
import ExpressionSyntax from "./ExpressionSyntax";
import SyntaxNode from "./SyntaxNode";

class ParanthesisExpressionSyntax extends ExpressionSyntax {

    kind = SyntaxKind.ParanthesisExpressionToken;
    openParanthesisToken: SyntaxToken;
    expression: ExpressionSyntax;
    closeParanthesisToken: SyntaxToken;

    constructor(openParanthesisToken: SyntaxToken, expression: ExpressionSyntax, closeParanthesisToken:SyntaxToken) {
        super();
        this.openParanthesisToken = openParanthesisToken;
        this.expression = expression;
        this.closeParanthesisToken = closeParanthesisToken;
    }

    getOpenParanthesisToken() {
        return this.openParanthesisToken;
    }
    getExpression() {
        return this.expression;
    }
    getCloseParanthesisToken() {
        return this.closeParanthesisToken;
    }

    getChildren(): SyntaxNode[] {
        return [
            this.openParanthesisToken,
            this.expression,
            this.closeParanthesisToken
        ];
    }

    parseExpression() {
    }
}
export default ParanthesisExpressionSyntax;
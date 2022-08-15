import SyntaxKind from "./SyntaxKind";
import ExpressionSyntax from "./ExpressionSyntax";
import SyntaxNode from "./SyntaxNode";
import SyntaxToken from "./SyntaxToken";


class LiteralExpressionSyntax extends ExpressionSyntax {
    value: SyntaxToken;
    kind = SyntaxKind.LiteralExpressionToken;

    constructor(value: SyntaxToken) {
        super();
        this.value = value;
    }

    getToken() {
        return this.value;
    }
    getChildren(): SyntaxNode[] {
        return [
            this.value,
        ]
    }
}
export default LiteralExpressionSyntax;
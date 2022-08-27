import SyntaxKind from "./SyntaxKind";
import ExpressionSyntax from "./ExpressionSyntax";
import SyntaxNode from "./SyntaxNode";
import SyntaxToken from "./SyntaxToken";


class LiteralExpressionSyntax extends ExpressionSyntax {
    value: any;
    literalToken: SyntaxToken;
    kind = SyntaxKind.LiteralExpressionToken;
    constructor(literalToken: SyntaxToken, value: any) {
        super();
        this.literalToken = literalToken;
        this.value = value;
    }
    getToken() {
        return this.literalToken;
    }
    getValue() {
        return this.value;
    }
    getChildren(): SyntaxNode[] {
        return [
            this.literalToken,
        ]
    }
}
export default LiteralExpressionSyntax;
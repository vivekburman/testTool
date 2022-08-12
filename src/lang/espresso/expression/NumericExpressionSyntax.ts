import SyntaxKind from "../binding/SyntaxKind";
import SyntaxToken from "../binding/SyntaxToken";
import ExpressionSyntax from "./ExpressionSyntax";

class NumericExpressionSyntax extends ExpressionSyntax {
    numberToken: SyntaxToken;
    kind = SyntaxKind.NumericExpressionToken;

    constructor(token: SyntaxToken) {
        super();
        this.numberToken = token;
    }

    getToken() {
        return this.numberToken;
    }
}
export default NumericExpressionSyntax;
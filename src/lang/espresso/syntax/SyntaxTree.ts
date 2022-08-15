import ExpressionSyntax from "./ExpressionSyntax";
import SyntaxToken from "./SyntaxToken";

export default class SyntaxTree {
    root: ExpressionSyntax;
    endOfFileToken: SyntaxToken;
    constructor(root: ExpressionSyntax, endOfFileToken: SyntaxToken) {
        this.root = root;
        this.endOfFileToken = endOfFileToken;
    }
    getRoot() {
        return this.root;
    }
    getEOFToken() {
        return this.endOfFileToken;
    }
}
import ExpressionSyntax from "./ExpressionSyntax";
import Parser from "./Parser";
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
    static parse(source: string) {
        const parser = new Parser(source);
        parser.parse();
        return parser.buildSyntaxTree();
    }
}
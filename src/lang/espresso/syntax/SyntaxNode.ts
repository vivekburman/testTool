import SyntaxKind from "./SyntaxKind";

abstract class SyntaxNode {
    kind!: SyntaxKind;
    children: SyntaxNode[] = [];

    getKind() {
        return this.kind;
    }
    getChildren() {
        return this.children;
    }
}
export default SyntaxNode;

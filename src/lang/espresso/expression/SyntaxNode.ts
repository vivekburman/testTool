import SyntaxKind from "../binding/SyntaxKind";

abstract class SyntaxNode {
    kind!: SyntaxKind;

    getKind() {
        return this.kind;
    }
}
export default SyntaxNode;

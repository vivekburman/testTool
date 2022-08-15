import SyntaxKind from "./SyntaxKind";
import SyntaxNode from "./SyntaxNode";

export default class SyntaxToken extends SyntaxNode {
    kind: SyntaxKind;
    value: any;
    position: number;
    textValue: string | null;
    
    constructor({ kind, value, position, textValue }: ({ kind: SyntaxKind, value: any, position: number, textValue: string | null })) {
        super();
        this.kind = kind;
        this.value = value;
        this.position = position;
        this.textValue = textValue;
    }

    getKind(): SyntaxKind {
        return this.kind;
    }

    getValue() {
        return this.value;
    }

    getPosition() {
        return this.position;
    }
    getTextValue() {
        return this.textValue;
    }
}
import SyntaxKind from "./kind";

export default class SyntaxToken {
    kind: SyntaxKind;
    value: any;
    position: number;
    textValue: string;
    
    constructor({ kind, value, position, textValue }: ({ kind: SyntaxKind, value: any, position: number, textValue: string })) {
        this.kind = kind;
        this.value = value;
        this.position = position;
        this.textValue = textValue;
    }
}
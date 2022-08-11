import SyntaxKind from "./kind";

export default class SyntaxToken {
    type: SyntaxKind;
    value: any;
    position: number;
    textValue: string;
    
    constructor({ type, value, position, textValue }: ({ type: SyntaxKind, value: any, position: number, textValue: string })) {
        this.type = type;
        this.value = value;
        this.position = position;
        this.textValue = textValue;
    }
}
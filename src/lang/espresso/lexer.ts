import { logError } from "../../utils/error";
import SyntaxKind from "./kind";
import SyntaxToken from "./token";

class Lexer {
    source: string;
    position: number = 0;

    constructor(source: string) {
        this.source = source;
    }

    getCurrentChar() {
        if (this.position >= this.source.length) {
            return '\0';
        }
        return this.source[this.position];
    }

    next() {
        this.position++;
    }

    isWhiteSpace(char: string) {
        return char === ' ';
    }
    isNumber(char: string) {
        return /^[0-9]*$/.test(char);
    }

    getValue(start: number, end: number | undefined) {
        return this.source.substring(start, end);
    }
    
    getPosition() {
        return this.position;
    }
    
    isSourceNullOrEmpty() {
        return this.source === "";
    }

    /**
     * @input String
     * @output Tokens
     */
    getNextToken(): SyntaxToken{
        if (this.isSourceNullOrEmpty()) {
            return new SyntaxToken({
                kind: SyntaxKind.EOF,
                value: "\0",
                position: 0,
                textValue: "",
            });
        }
        const currentChar = this.getCurrentChar();
        const position = this.getPosition();
        try {
            if (this.isWhiteSpace(currentChar)) {
                while(this.isWhiteSpace(this.getCurrentChar())) {
                    this.next();
                }
                const value = this.getValue(position, this.getPosition());
                return new SyntaxToken({
                    kind: SyntaxKind.WhiteSpaceToken,
                    value: value,
                    position: position,
                    textValue: value,
                });
            }
            if (this.isNumber(currentChar)) {
                while(this.isNumber(this.getCurrentChar())) {
                    this.next();
                }
                const value = this.getValue(position, this.getPosition());
                if (!this.isNumber(value)) {
                    throw Error("Not a numeric value: " + value + "starting at position: " + position);
                }
                return new SyntaxToken({
                    kind: SyntaxKind.NumericLiteralToken,
                    value: Number.parseFloat(value),
                    position: position,
                    textValue: value,
                });
            }
            if (currentChar === "+") {
                return new SyntaxToken({
                    kind: SyntaxKind.PlusToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            if (currentChar === "-") {
                return new SyntaxToken({
                    kind: SyntaxKind.MinusToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            if (currentChar === "*") {
                return new SyntaxToken({
                    kind: SyntaxKind.StarToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            if (currentChar === "/") {
                return new SyntaxToken({
                    kind: SyntaxKind.SlashToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            if (currentChar === "%") {
                return new SyntaxToken({
                    kind: SyntaxKind.ModulusToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            if (currentChar === "(") {
                return new SyntaxToken({
                    kind: SyntaxKind.OpenFirstBracketToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            if (currentChar === ")") {
                return new SyntaxToken({
                    kind: SyntaxKind.CloseFirstBracketToken,
                    value: currentChar,
                    position: position,
                    textValue: currentChar,
                });
            }
            
        } catch(e) {
            logError(e);
        }
        return new SyntaxToken({
            kind: SyntaxKind.UnknownToken,
            value: null,
            position: position,
            textValue: currentChar,
        });
    }
}
export default Lexer;
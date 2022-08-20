/**
 * Lexer produces tokens or words
 */


import Diagnostic from "../../../utils/Diagnostic";
import SyntaxKind, { getSyntaxKind } from "./SyntaxKind";
import SyntaxToken from "./SyntaxToken";

class Lexer {
    source: string;
    position: number = 0;

    constructor(source: string) {
        this.source = source;
    }

    getCurrentChar() {
        return this.peek(0);
    }

    lookAhead(offset: number) {
        return this.peek(offset);
    } 

    peek(offset: number) {
        const index = this.position + offset;
        if (index >= this.source.length) {
            return "\0";
        }
        return this.source[index];
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
    isLetter(char: string) {
        return /^[a-zA-Z]*$/.test(char);
    }

    getValue(start: number, end: number | undefined) {
        return this.source.substring(start, end);
    }
    
    getPosition() {
        return this.position;
    }
    setPosition(position: number) {
        this.position = position;
    }
    isEOF() {
        return this.getPosition() >= this.source.length;
    }

    /**
     * @input String
     * @output Tokens
     */
    lex(): SyntaxToken{
        const currentChar = this.getCurrentChar();
        const position = this.getPosition();
        if (this.isEOF()) {
            return new SyntaxToken({
                kind: SyntaxKind.EOF,
                value: "\0",
                position: position,
                textValue: null,
            });
        }
        try {
            if (this.isWhiteSpace(currentChar)) {
                while(this.isWhiteSpace(this.getCurrentChar())) {
                    this.next();
                }
                const value = this.getValue(position, this.getPosition());
                return new SyntaxToken({
                    kind: SyntaxKind.WhiteSpaceToken,
                    value: null,
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
                    value: value,
                    position: position,
                    textValue: value,
                });
            }
            if (this.isLetter(currentChar)) {
                while(this.isLetter(this.getCurrentChar())) {
                    this.next();
                }
                const value = this.getValue(position, this.getPosition());
                if (!this.isLetter(value)) {
                    throw Error("Not a Letter value: " + value + "starting at position: " + position);
                }
                return new SyntaxToken({
                    kind: getSyntaxKind(value),
                    value: null,
                    position: position,
                    textValue: value,
                });
            }
            switch(currentChar) {
                case "+":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.PlusToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "-":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.MinusToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "*":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.StarToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "/":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.SlashToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "%":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.PercentageToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "(":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.OpenFirstBracketToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case ")":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.CloseFirstBracketToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "&":
                    this.next();
                    if (this.lookAhead(1) == "&") {
                        this.next();
                        return new SyntaxToken({
                            kind: SyntaxKind.AmpersandAmpersandToken,
                            value: "==",
                            position: position,
                            textValue: currentChar,
                        });
                    } else {
                        return new SyntaxToken({
                            kind: SyntaxKind.AmpersandToken,
                            value: currentChar,
                            position: position,
                            textValue: currentChar,
                        });
                    }
                case "|":
                    this.next();
                    if (this.lookAhead(1) == "|") {
                        this.next();
                        return new SyntaxToken({
                            kind: SyntaxKind.PipePipeToken,
                            value: "||",
                            position: position,
                            textValue: currentChar,
                        });
                    } else {
                        return new SyntaxToken({
                            kind: SyntaxKind.PipeToken,
                            value: currentChar,
                            position: position,
                            textValue: currentChar,
                        });
                    }
                case "!":
                    this.next();
                    if (this.lookAhead(1) == "=") {
                        this.next();
                        return new SyntaxToken({
                            kind: SyntaxKind.NotEqualToken,
                            value: "==",
                            position: position,
                            textValue: currentChar,
                        });
                    } else {
                        return new SyntaxToken({
                            kind: SyntaxKind.BangToken,
                            value: currentChar,
                            position: position,
                            textValue: currentChar,
                        });
                    }
                case "^":
                    this.next();
                    return new SyntaxToken({
                        kind: SyntaxKind.CapToken,
                        value: currentChar,
                        position: position,
                        textValue: currentChar,
                    });
                case "=":
                    this.next();
                    if (this.lookAhead(1) == "=") {
                        this.next();
                        return new SyntaxToken({
                            kind: SyntaxKind.EqualEqualToken,
                            value: "==",
                            position: position,
                            textValue: currentChar,
                        });
                    } else {
                        return new SyntaxToken({
                            kind: SyntaxKind.EqualToken,
                            value: currentChar,
                            position: position,
                            textValue: currentChar,
                        });
                    }
                case "<":
                    this.next();
                    if (this.lookAhead(1) == "=") {
                        this.next();
                        return new SyntaxToken({
                            kind: SyntaxKind.LeftEqualToken,
                            value: "<=",
                            position: position,
                            textValue: currentChar,
                        });
                    } else {
                        return new SyntaxToken({
                            kind: SyntaxKind.LeftToken,
                            value: currentChar,
                            position: position,
                            textValue: currentChar,
                        });
                    }
                case ">":
                    this.next();
                    if (this.lookAhead(1) == "=") {
                        this.next();
                        return new SyntaxToken({
                            kind: SyntaxKind.RightEqualToken,
                            value: ">=",
                            position: position,
                            textValue: currentChar,
                        });
                    } else {
                        return new SyntaxToken({
                            kind: SyntaxKind.RightToken,
                            value: currentChar,
                            position: position,
                            textValue: currentChar,
                        });
                    }
            }
            
        } catch(e) {
            Diagnostic.addDiagnostic(e);
        }
        Diagnostic.addDiagnostic("Bad character input at " + position);
        return new SyntaxToken({
            kind: SyntaxKind.UnknownToken,
            value: null,
            position: position,
            textValue: currentChar,
        });
    }
}
export default Lexer;
/**
 * Parser produces expressions or sentences
 */

import SyntaxKind from "./SyntaxKind";
import Lexer from "./Lexer";
import SyntaxToken from "./SyntaxToken";

class Parser {
    source: string;
    tokens: SyntaxToken[] = [];
    position: number = 0;

    constructor(source: string) {
        this.source = source;
    }

    parse(): SyntaxToken[] {
        const tokens:SyntaxToken[] = [];
        const lexer = new Lexer(this.source);
        let token:SyntaxToken;
        do {
            token = lexer.getNextToken();
            if (token.kind !== SyntaxKind.WhiteSpaceToken && token.kind !== SyntaxKind.UnknownToken) {
                tokens.push(token);
            }
        } while(token.kind != SyntaxKind.EOF);
        this.tokens = tokens;
        this.position = tokens.length;
        return tokens;
    }

    next() {
        const current = this.getCurrent();
        this.position++;
        return current;
    }

    peek(offset: number): SyntaxToken {
        const index = this.position + offset;
        if (offset >= this.tokens.length) {
            return this.tokens[this.tokens.length - 1];
        }
        return this.tokens[index];
    }
    getCurrent(): SyntaxToken {
        return this.peek(0);
    }
}

export default Parser;
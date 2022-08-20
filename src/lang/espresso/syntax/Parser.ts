/**
 * Parser produces expressions or sentences
 */

import SyntaxKind from "./SyntaxKind";
import Lexer from "./Lexer";
import SyntaxToken from "./SyntaxToken";
import ExpressionSyntax from "./ExpressionSyntax";
import BinaryExpressionSyntax from "./BinaryExpressionSyntax";
import LiteralExpressionSyntax from "./LiteralExpressionSyntax";
import SyntaxTree from "./SyntaxTree";
import Diagnostic from "../../../utils/Diagnostic";
import ParanthesisExpressionSyntax from "./ParanthesisExpressionSyntax";
import { getBinaryOperatorPrecedence } from "./Precedence";

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
            token = lexer.lex();
            if (token.kind !== SyntaxKind.WhiteSpaceToken && token.kind !== SyntaxKind.UnknownToken) {
                tokens.push(token);
            }
        } while(token.kind != SyntaxKind.EOF);
        this.tokens = tokens;
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

    matchToken(kind: SyntaxKind) {
        /**
         * if current pointer is of expected kind return it,
         * or manufacture a fake one.
         * This will help in debugging in what was expected but what was found
         */
        if (this.getCurrent().kind == kind) {
            return this.next();
        }
        Diagnostic.addDiagnostic(`Unexpected token ${SyntaxKind[this.getCurrent().kind]}, Expected token ${SyntaxKind[kind]}`);
        return new SyntaxToken({
            kind, 
            value: null, 
            position: this.position, 
            textValue: null
        });
    }
    
    buildSyntaxTree(): SyntaxTree {
        const root = this.buildTree();
        const eof = this.matchToken(SyntaxKind.EOF);
        return new SyntaxTree(root, eof);
    }

    buildTree(parentPrecedence = 0): ExpressionSyntax {
        let left: ExpressionSyntax = this.parseExpression();
        while(true) {
            const precedence = getBinaryOperatorPrecedence(this.getCurrent().getKind());
            if (precedence == 0 || precedence <= parentPrecedence) {
                break;
            }
            const operatorToken = this.next();
            const right = this.buildTree(precedence);
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }
        return left;
    }
    parseExpression() 
    {
        if (this.getCurrent().getKind() === SyntaxKind.OpenFirstBracketToken) {
            const left = this.next();
            const expression = this.buildTree();
            const right = this.matchToken(SyntaxKind.CloseFirstBracketToken);
            return new ParanthesisExpressionSyntax(left, expression, right);
        }
        const token = this.matchToken(SyntaxKind.NumericLiteralToken);
        return new LiteralExpressionSyntax(token);
    }
}

export default Parser;
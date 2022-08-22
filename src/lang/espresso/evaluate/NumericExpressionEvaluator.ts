import Diagnostic from "../../../utils/Diagnostic";
import BinaryExpressionSyntax from "../syntax/BinaryExpressionSyntax";
import ExpressionSyntax from "../syntax/ExpressionSyntax";
import LiteralExpressionSyntax from "../syntax/LiteralExpressionSyntax";
import ParanthesisExpressionSyntax from "../syntax/ParanthesisExpressionSyntax";
import { getBinaryOperatorPrecedence } from "../syntax/Precedence";
import SyntaxKind from "../syntax/SyntaxKind";
import SyntaxToken from "../syntax/SyntaxToken";
import UnaryExpressionSyntax from "../syntax/UnaryExpressionSyntax";

export default class NumericExpressionEvaluator {
    root: ExpressionSyntax;

    constructor(root: ExpressionSyntax) {
        this.root = root;
    }
    evaluate() {
        return this.evalutateExpression(this.root);
    }
    evalutateExpression(root: ExpressionSyntax): number | null{
        try {
            if (root instanceof LiteralExpressionSyntax) {
                return Number.parseFloat(root.getToken().getValue());
            } else if(root instanceof UnaryExpressionSyntax) {
                const operandExpression = this.evalutateExpression(root.getOperand());
                const kind = root.getOperand().getKind();
                switch(kind){
                    case SyntaxKind.PlusToken:
                        return operandExpression;
                    case SyntaxKind.MinusToken:
                        return -(operandExpression || 0);
                    default:
                        throw new Error(`Unknown Unary operator Kind: ${kind}`);
                }
            } else if(root instanceof BinaryExpressionSyntax) {
                const left = this.evalutateExpression(root.getLeft());
                const right = this.evalutateExpression(root.getRight());
                if (left !== null && right !== null) {
                    switch(root.getOperator().getKind()) {
                        case SyntaxKind.PlusToken:
                            return left + right;
                        case SyntaxKind.MinusToken:
                            return left - right;
                        case SyntaxKind.StarToken:
                            return left * right;
                        case SyntaxKind.SlashToken:
                            return left / right;
                        case SyntaxKind.PercentageToken:
                            return left % right;
                        default:
                            throw new Error("Unexpected binary opertaor: " + SyntaxKind[root.getOperator().getKind()]);
                    }
                }
                throw new Error(`Left Expression or Right Expression is possibly null: ${left}, ${right}`);
            } else if(root instanceof ParanthesisExpressionSyntax) {
                return this.evalutateExpression(root.getExpression());
            }
            throw new Error("Unexpected Node: " + root);
        }catch(e) {
            Diagnostic.addDiagnostic(e);
        }
        return null;
    }

    // evaluate() {
    //     /**
    //      * 1. convert to reverse polish notation
    //      * 2. evaluate the expression
    //      */
    //     const tokens = this.convertToRRN();
    //     return this.compute(tokens);
    // }
    // compute(tokens: SyntaxToken[]): number | null {
    //     const stack: number[] = [];
    //     try {
    //         tokens.forEach((token) => {
    //             if(!Number.isNaN(token.getValue())) {
    //                 stack.push(token.getValue());
    //             } else {
    //                 if (stack.length < 2) {
    //                     throw new Error(`Insufficient operands to operate on operator ${token.getValue()} at position ${token.getPosition()}`);
    //                 }
    //                 const op1 = stack.pop();
    //                 const op2 = stack.pop();
    //                 if (typeof op1 === "number" && typeof op2 === "number") {
    //                     switch(token.getKind()) {
    //                         case SyntaxKind.PlusToken:
    //                             stack.push(op1 + op2);
    //                         case SyntaxKind.MinusToken:
    //                             stack.push(op1 - op2);
    //                         case SyntaxKind.StarToken:
    //                             stack.push(op1 * op2);
    //                         case SyntaxKind.SlashToken:
    //                             stack.push(op1 / op2);
    //                         case SyntaxKind.PercentageToken:
    //                             stack.push(op1 % op2);
    //                     }
    //                 }
    //             }
    //         });
    //     }catch(e) {
    //         Diagnostic.addDiagnostic(e);
    //     }
    //     return null;
    // }

    // convertToRRN() {
    //     const inputStack: SyntaxToken[] = [];
    //     const outputStack: SyntaxToken[] = [];
    //     const tokens = this.tokens;
    //     const operatorKinds = NumericExpressionEvaluator.operatorKinds;

    //     tokens.forEach((token) => {
    //         const kind = token.getKind();
    //         if (operatorKinds.math.includes(kind)) {
    //             while(inputStack.length > 0 && operatorKinds.math.includes(inputStack[inputStack.length - 1].getKind())) {
    //                 const peek = inputStack[inputStack.length - 1];
    //                 if (getBinaryOperatorPrecedence(peek.getKind()) >= getBinaryOperatorPrecedence(token.getKind())) {
    //                     const top = inputStack.pop();
    //                     if (top) {
    //                         outputStack.push(top);
    //                     }
    //                     continue;
    //                 }
    //                 break;
    //             }
    //         } else if(SyntaxKind.OpenFirstBracketToken == kind) {
    //             inputStack.push(token);
    //         } else if(SyntaxKind.CloseFirstBracketToken == kind) {
    //             while(inputStack.length && 
    //                 inputStack[inputStack.length - 1].getKind() != SyntaxKind.OpenFirstBracketToken) {
    //                 const _token = inputStack.pop();
    //                 if (_token){
    //                     outputStack.push(_token);
    //                 }
    //             }
    //             inputStack.pop();
    //         } else {
    //             outputStack.push(token);
    //         }
    //     });
    //     return outputStack;
    // }
}
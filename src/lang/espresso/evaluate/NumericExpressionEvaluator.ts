import Diagnostic from "../../../utils/Diagnostic";
import BoundBinaryExpression from "../binding/BoundBinaryExpression";
import BoundBinaryOperatorKind from "../binding/BoundBinaryOperatorKind";
import BoundExpression from "../binding/BoundExpression";
import BoundLiteralExpression from "../binding/BoundLiteralExpression";
import BoundNodeKind from "../binding/BoundNodeKind";
import BoundUnaryExpression from "../binding/BoundUnaryExpression";
import { BoundUnaryOperatorKind } from "../binding/BoundUnaryOperatorKind";
import BinaryExpressionSyntax from "../syntax/BinaryExpressionSyntax";
import ExpressionSyntax from "../syntax/ExpressionSyntax";
import LiteralExpressionSyntax from "../syntax/LiteralExpressionSyntax";
import ParanthesisExpressionSyntax from "../syntax/ParanthesisExpressionSyntax";
import { getBinaryOperatorPrecedence } from "../syntax/SyntaxFacts";
import SyntaxKind from "../syntax/SyntaxKind";
import SyntaxToken from "../syntax/SyntaxToken";
import UnaryExpressionSyntax from "../syntax/UnaryExpressionSyntax";

export default class NumericExpressionEvaluator {
    root: BoundExpression;

    constructor(root: BoundExpression) {
        this.root = root;
    }
    evaluate() {
        return this.evalutateExpression(this.root);
    }
    evalutateExpression(root: BoundExpression): any {
        try {
            if (root instanceof BoundLiteralExpression) {
                return root.getValue();
            } else if(root instanceof BoundUnaryExpression) {
                const operandExpression = this.evalutateExpression(root.getOperand());
                const kind = root.getOperator().getKind();
                switch(kind){
                    case BoundUnaryOperatorKind.Identity:
                        return operandExpression;
                    case BoundUnaryOperatorKind.Negation:
                        return -(operandExpression || 0);
                    case BoundUnaryOperatorKind.LogicalNegation:
                        return !operandExpression;
                    default:
                        throw new Error(`Unknown Unary operator Kind: ${kind}`);
                }
            } else if(root instanceof BoundBinaryExpression) {
                const left = this.evalutateExpression(root.getLeft());
                const right = this.evalutateExpression(root.getRight());
                if (left !== null && right !== null) {
                    switch(root.getOperator().getKind()) {
                        case BoundBinaryOperatorKind.Addition:
                            return left + right;
                        case BoundBinaryOperatorKind.Subtraction:
                            return left - right;
                        case BoundBinaryOperatorKind.Multiplication:
                            return left * right;
                        case BoundBinaryOperatorKind.Division:
                            return left / right;
                        case BoundBinaryOperatorKind.Modulation:
                            return left % right;
                        case BoundBinaryOperatorKind.LogicalAND:
                            return left && right;
                        case BoundBinaryOperatorKind.LogicalOR:
                            return left || right;
                        case BoundBinaryOperatorKind.LogicalGreaterThan:
                            return left > right;
                        case BoundBinaryOperatorKind.LogicalGreaterThanEquals:
                            return left >= right;
                        case BoundBinaryOperatorKind.LogicalLessThan:
                            return left < right;
                        case BoundBinaryOperatorKind.LogicalLessThanEquals:
                            return left <= right;
                        default:
                            throw new Error("Unexpected binary opertaor: " + SyntaxKind[root.getOperator().getKind()]);
                    }
                }
                throw new Error(`Left Expression or Right Expression is possibly null: ${left}, ${right}`);
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
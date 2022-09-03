import Diagnostic from "../../../utils/Diagnostic";
import BinaryExpressionSyntax from "../syntax/BinaryExpressionSyntax";
import ExpressionSyntax from "../syntax/ExpressionSyntax";
import LiteralExpressionSyntax from "../syntax/LiteralExpressionSyntax";
import SyntaxKind from "../syntax/SyntaxKind";
import UnaryExpressionSyntax from "../syntax/UnaryExpressionSyntax";
import BoundBinaryExpression from "./BoundBinaryExpression";
import BoundBinaryOperatorKind from "./BoundBinaryOperatorKind";
import BoundExpression from "./BoundExpression";
import BoundLiteralExpression from "./BoundLiteralExpression";
import BoundUnaryExpression from "./BoundUnaryExpression";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";

export default class Binder {
    bindExpression(syntax: ExpressionSyntax): BoundExpression {
        switch(syntax.getKind()) {
            case SyntaxKind.LiteralExpressionToken:
                return this.bindLiteralExpression(syntax as LiteralExpressionSyntax);
            case SyntaxKind.BinaryExpressionToken:
                return this.bindBinaryExpression(syntax as BinaryExpressionSyntax);
            case SyntaxKind.UnaryExpressionToken:
                return this.bindUnaryExpression(syntax as UnaryExpressionSyntax);
            default:
                throw new Error(`Unexpected Syntax Kind ${syntax.getKind()}`);
        }
    }
    bindLiteralExpression(syntax: LiteralExpressionSyntax): BoundExpression {
        try {
            const value = typeof syntax.getValue() == 'boolean' ? syntax.getValue() : (+syntax.getValue() || 0);
            return new BoundLiteralExpression(value);
        }catch(e) {
            return new BoundLiteralExpression(syntax.getValue());
        }
    }
    bindBinaryExpression(syntax: BinaryExpressionSyntax) {
        const boundLeft = this.bindExpression(syntax.getLeft());
        const boundRight = this.bindExpression(syntax.getRight());
        const boundOperatorKind = this.bindBinaryOperatorKind(syntax.getOperator().getKind(), boundLeft.getType(), boundRight.getType());
        if (boundOperatorKind === null) {
            Diagnostic.addDiagnostic(`Binary operator '${syntax.getOperator().getTextValue()}', is not defined for types ${boundLeft.getType()} and ${boundRight.getType()}`);
            return boundLeft;
        }
        return new BoundBinaryExpression(boundLeft, boundOperatorKind, boundRight);
    }
    bindUnaryExpression(syntax: UnaryExpressionSyntax) {
        const boundOperand = this.bindExpression(syntax.getOperand());
        const boundOperatorKind = this.bindUnaryOperatorKind(syntax.getOperatorToken().getKind(), boundOperand.getType());
        if (boundOperatorKind === null) {
            Diagnostic.addDiagnostic(`Unary operator '${syntax.getOperatorToken().getTextValue()}', is not defined for bound type ${boundOperand.getType()}`);
            return boundOperand;
        }
        return new BoundUnaryExpression(boundOperatorKind, boundOperand);
    }
    bindUnaryOperatorKind(kind: SyntaxKind, type: string): BoundUnaryOperatorKind | null {
        if (type !== 'number') return null;
        switch(kind) {
            case SyntaxKind.PlusToken:
                return BoundUnaryOperatorKind.Identity;
            case SyntaxKind.MinusToken:
                return BoundUnaryOperatorKind.Negation;
            default:
                throw new Error(`Unexpected Unary operator ${kind}`);
        }
    }
    bindBinaryOperatorKind(kind: SyntaxKind, leftType: string, rightType: string):BoundBinaryOperatorKind | null{
        if (leftType !== 'number' || rightType !== 'number') return null;

        switch(kind) {
            case SyntaxKind.PlusToken:
                return BoundBinaryOperatorKind.Addition;
            case SyntaxKind.MinusToken:
                return BoundBinaryOperatorKind.Subtraction;
            case SyntaxKind.StarToken:
                return BoundBinaryOperatorKind.Multiplication;
            case SyntaxKind.SlashToken:
                return BoundBinaryOperatorKind.Division;
            case SyntaxKind.PercentageToken:
                return BoundBinaryOperatorKind.Modulation;
            default:
                throw new Error(`Unexpected Binary operator ${kind}`);
        }
    }
}

import Diagnostic from "../../../utils/Diagnostic";
import BinaryExpressionSyntax from "../syntax/BinaryExpressionSyntax";
import ExpressionSyntax from "../syntax/ExpressionSyntax";
import LiteralExpressionSyntax from "../syntax/LiteralExpressionSyntax";
import ParanthesisExpressionSyntax from "../syntax/ParanthesisExpressionSyntax";
import SyntaxKind from "../syntax/SyntaxKind";
import UnaryExpressionSyntax from "../syntax/UnaryExpressionSyntax";
import BoundBinaryExpression from "./BoundBinaryExpression";
import BoundBinaryOperator from "./BoundBinaryOperator";
import BoundExpression from "./BoundExpression";
import BoundLiteralExpression from "./BoundLiteralExpression";
import BoundUnaryExpression from "./BoundUnaryExpression";
import BoundUnaryOperator from "./BoundUnaryOperator";

export default class Binder {
    bindExpression(syntax: ExpressionSyntax): BoundExpression {
        switch(syntax.getKind()) {
            case SyntaxKind.LiteralExpressionToken:
                return this.bindLiteralExpression(syntax as LiteralExpressionSyntax);
            case SyntaxKind.BinaryExpressionToken:
                return this.bindBinaryExpression(syntax as BinaryExpressionSyntax);
            case SyntaxKind.UnaryExpressionToken:
                return this.bindUnaryExpression(syntax as UnaryExpressionSyntax);
            case SyntaxKind.ParanthesisExpressionToken:
                return this.bindExpression((syntax as ParanthesisExpressionSyntax).getExpression());
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
        const boundOperator = BoundBinaryOperator.bind(syntax.getOperator().getKind(), boundLeft.getType(), boundRight.getType());
        if (boundOperator === null) {
            Diagnostic.addDiagnostic(`Binary operator '${syntax.getOperator().getTextValue()}', is not defined for types ${boundLeft.getType()} and ${boundRight.getType()}`);
            return boundLeft;
        }
        return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
    }
    bindUnaryExpression(syntax: UnaryExpressionSyntax) {
        const boundOperand = this.bindExpression(syntax.getOperand());
        const boundOperator = BoundUnaryOperator.bind(syntax.getOperatorToken().getKind(), boundOperand.getType());
        if (boundOperator === null) {
            Diagnostic.addDiagnostic(`Unary operator '${syntax.getOperatorToken().getTextValue()}', is not defined for bound type ${boundOperand.getType()}`);
            return boundOperand;
        }
        return new BoundUnaryExpression(boundOperator, boundOperand);
    }
}

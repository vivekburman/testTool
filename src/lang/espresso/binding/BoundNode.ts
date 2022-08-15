import ExpressionSyntax from "../syntax/ExpressionSyntax";
import LiteralExpressionSyntax from "../syntax/LiteralExpressionSyntax";
import SyntaxKind from "../syntax/SyntaxKind";

enum BoundNodeKind {
    UnaryExpression,
    BinaryExpression,
    LiteralExpression
}
enum BoundUnaryOperatorKind {
    Identity,
    Negation
}

enum BoundBinaryOperatorKind {
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Modulation
}

abstract class BoundNode {
    kind!: BoundNodeKind;

    getKind() {
        return this.kind;
    }
}
abstract class BoundExpression extends BoundNode {
    type!: any;
    getType() {
        return this.type;
    }
}

class BoundLiteralExpression extends BoundExpression {
    value: any;

    constructor(value: any) {
        super();
        this.value = value;
    }
    getKind(): BoundNodeKind {
        return BoundNodeKind.LiteralExpression;
    }
    getType() {
        // return this.value;
    }
    getValue() {
        return this.value;
    }
}

class BoundBinaryExpression extends BoundExpression {
    left: BoundExpression;
    operatorKind: BoundBinaryOperatorKind;
    right: BoundExpression;

    constructor(left: BoundExpression, operatorKind: BoundBinaryOperatorKind, right: BoundExpression) {
        super();
        this.left = left;
        this.right = right;
        this.operatorKind = operatorKind;
    }
    getKind(): BoundNodeKind {
        return BoundNodeKind.BinaryExpression;
    }
    getType() {
        // return this.value;
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getOperatorKind() {
        return this.operatorKind;
    }
    
}

class BoundUnaryExpression extends BoundExpression {

    operatorKind: BoundUnaryOperatorKind;
    operand: BoundExpression;
    
    constructor(operatorKind: BoundUnaryOperatorKind, operand: BoundExpression) {
        super();
        this.operatorKind = operatorKind;
        this.operand = operand;
    }
    getKind(): BoundNodeKind {
        return BoundNodeKind.UnaryExpression;
    }
    getType() {
        return this.operand.getType();
    }
    getOperatorKind() {
        return this.operatorKind;
    }
    getOperand() {
        return this.operand;
    }
}

class Binder {
    bind(syntax: ExpressionSyntax) {
        // switch(syntax.getKind()) {
        //     case SyntaxKind.LiteralExpressionToken:
        //         return BindLiteralExpression(syntax);
        //     case SyntaxKind.BinaryExpressionToken:
        //         return;
        //     case SyntaxKind.UnaryExpressionToken;
        //     returnl
        // }
    }
}
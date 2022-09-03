import BoundNodeKind from "./BoundNodeKind";
import BoundExpression from "./BoundExpression";
import BoundBinaryOperator from "./BoundBinaryOperator";


export default class BoundBinaryExpression extends BoundExpression {
    left: BoundExpression;
    operator: BoundBinaryOperator;
    right: BoundExpression;

    constructor(left: BoundExpression, operator: BoundBinaryOperator, right: BoundExpression) {
        super();
        this.left = left;
        this.right = right;
        this.operator = operator;
    }
    getKind(): BoundNodeKind {
        return BoundNodeKind.BinaryExpression;
    }
    getType() {
        return this.operator.getResultType();
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getOperator() {
        return this.operator;
    }
}

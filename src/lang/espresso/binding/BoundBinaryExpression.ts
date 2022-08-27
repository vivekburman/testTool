import BoundNodeKind from "./BoundNodeKind";
import { BoundBinaryOperatorKind } from "./BoundBinaryOperatorKind";
import BoundExpression from "./BoundExpression";

export default class BoundBinaryExpression extends BoundExpression {
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
        return "";
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

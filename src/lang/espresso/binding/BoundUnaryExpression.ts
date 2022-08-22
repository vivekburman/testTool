import BoundNodeKind from "./BoundNodeKind";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";
import BoundExpression from "./BoundExpression";

export default class BoundUnaryExpression extends BoundExpression {

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

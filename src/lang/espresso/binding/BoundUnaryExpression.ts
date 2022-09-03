import BoundNodeKind from "./BoundNodeKind";
import BoundExpression from "./BoundExpression";
import BoundUnaryOperator from "./BoundUnaryOperator";

export default class BoundUnaryExpression extends BoundExpression {
    operator: BoundUnaryOperator;
    operand: BoundExpression;

    constructor(operator: BoundUnaryOperator, operand: BoundExpression) {
        super();
        this.operator = operator;
        this.operand = operand;
    }
    getKind(): BoundNodeKind {
        return BoundNodeKind.UnaryExpression;
    }
    getType() {
        return this.operator.getResultType();
    }
    getOperator() {
        return this.operator;
    }
    getOperand() {
        return this.operand;
    }
}

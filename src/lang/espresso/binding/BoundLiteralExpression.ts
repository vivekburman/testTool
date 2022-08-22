import BoundNodeKind from "./BoundNodeKind";
import BoundExpression from "./BoundExpression";

export default class BoundLiteralExpression extends BoundExpression {
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

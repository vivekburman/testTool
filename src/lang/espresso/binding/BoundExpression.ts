import BoundNode from "./BoundNode";

export default abstract class BoundExpression extends BoundNode {
    type!: any;
    getType() {
        return this.type;
    }
}

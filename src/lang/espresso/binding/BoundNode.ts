import BoundNodeKind from "./BoundNodeKind";

export default abstract class BoundNode {
    kind!: BoundNodeKind;

    getKind() {
        return this.kind;
    }
}

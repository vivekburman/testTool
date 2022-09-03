import SyntaxKind from "../syntax/SyntaxKind";
import { BoundBinaryOperatorKind } from "./BoundBinaryOperatorKind";

export default class BoundBinaryOperator {
    syntaxKind: SyntaxKind;
    kind: BoundBinaryOperatorKind;
    leftType: string;
    rightType: string;
    resultType: string | undefined;
    static operators = [
        new BoundBinaryOperator(SyntaxKind.PlusToken, BoundBinaryOperatorKind.Addition, "number"),
        new BoundBinaryOperator(SyntaxKind.MinusToken, BoundBinaryOperatorKind.Subtraction, "number"),
        new BoundBinaryOperator(SyntaxKind.StarToken, BoundBinaryOperatorKind.Multiplication, "number"),
        new BoundBinaryOperator(SyntaxKind.SlashToken, BoundBinaryOperatorKind.Division, "number"),
        new BoundBinaryOperator(SyntaxKind.PercentageToken, BoundBinaryOperatorKind.Modulation, "number"),
        new BoundBinaryOperator(SyntaxKind.AmpersandAmpersandToken, BoundBinaryOperatorKind.LogicalAND, "boolean"),
        new BoundBinaryOperator(SyntaxKind.PipePipeToken, BoundBinaryOperatorKind.LogicalOR, "boolean"),
        new BoundBinaryOperator(SyntaxKind.RightToken, BoundBinaryOperatorKind.LogicalGreaterThan, "number"),
        new BoundBinaryOperator(SyntaxKind.RightEqualToken, BoundBinaryOperatorKind.LogicalGreaterThanEquals, "number"),
        new BoundBinaryOperator(SyntaxKind.LeftToken, BoundBinaryOperatorKind.LogicalLessThan, "number"),
        new BoundBinaryOperator(SyntaxKind.LeftEqualToken, BoundBinaryOperatorKind.LogicalLessThanEquals, "number"),
        new BoundBinaryOperator(SyntaxKind.EqualEqualToken, BoundBinaryOperatorKind.Equals, "number", "number", "boolean"),
        new BoundBinaryOperator(SyntaxKind.BangEqualToken, BoundBinaryOperatorKind.NotEquals, "number", "number", "boolean"),
        new BoundBinaryOperator(SyntaxKind.EqualEqualToken, BoundBinaryOperatorKind.Equals, "boolean"),
        new BoundBinaryOperator(SyntaxKind.BangEqualToken, BoundBinaryOperatorKind.NotEquals, "boolean"),
    ];

    constructor(syntaxKind: SyntaxKind, kind: BoundBinaryOperatorKind, leftType: string, rightType?: string, resultType?: string) {
        this.syntaxKind = syntaxKind;
        this.kind = kind;
        this.leftType = leftType;
        this.rightType = rightType || leftType;
        this.resultType = resultType || leftType;
    }
    public getSyntaxKind(): SyntaxKind {
        return this.syntaxKind;
    }
    public getKind(): BoundBinaryOperatorKind {
        return this.kind;
    }
    public getLeftType(): string {
        return this.leftType;
    }
    public getRightType(): string {
        return this.rightType;
    }
    public getResultType(): string | undefined {
        return this.resultType;
    }
    static bind(syntaxKind: SyntaxKind, leftType: string, rightType: string) {
        return this.operators.find(operator => operator.getLeftType() === leftType && operator.getRightType() === rightType && operator.getSyntaxKind() === syntaxKind) || null;
    }
}

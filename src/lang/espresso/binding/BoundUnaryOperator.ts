import SyntaxKind from "../syntax/SyntaxKind";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";

export default class BoundUnaryOperator {
    syntaxKind: SyntaxKind;
    kind: BoundUnaryOperatorKind;
    operandType: string;
    resultType: string | undefined;
    static operators = [
        new BoundUnaryOperator(SyntaxKind.BangToken, BoundUnaryOperatorKind.LogicalNegation, "boolean"),
        new BoundUnaryOperator(SyntaxKind.PlusToken, BoundUnaryOperatorKind.Identity, "number"),
        new BoundUnaryOperator(SyntaxKind.MinusToken, BoundUnaryOperatorKind.Negation, "number"),
    ];

    constructor(syntaxKind: SyntaxKind, kind: BoundUnaryOperatorKind, operandType: string, resultType?: string) {
        this.syntaxKind = syntaxKind;
        this.kind = kind;
        this.operandType = operandType;
        this.resultType = resultType || operandType;
    }
    public getSyntaxKind(): SyntaxKind {
        return this.syntaxKind;
    }
    public getKind(): BoundUnaryOperatorKind {
        return this.kind;
    }
    public getOperandType(): string {
        return this.operandType;
    }
    public getResultType(): string | undefined {
        return this.resultType;
    }
    static bind(syntaxKind: SyntaxKind, operandType: string) {
        return this.operators.find(operator => operator.getOperandType() === operandType && operator.getSyntaxKind() === syntaxKind) || null;
    }
}

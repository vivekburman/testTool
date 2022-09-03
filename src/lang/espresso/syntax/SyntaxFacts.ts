import SyntaxKind from "./SyntaxKind";

const getBinaryOperatorPrecedence = (kind: SyntaxKind) => {
    switch(kind) {
        case SyntaxKind.OpenFirstBracketToken:
        case SyntaxKind.CloseFirstBracketToken:
            return 15;
        
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentageToken:
        case SyntaxKind.StarToken:
            return 13;

        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
            return 12;
        case SyntaxKind.AmpersandToken:
            return 7;
        case SyntaxKind.PipeToken:
            return 6;
        case SyntaxKind.AmpersandAmpersandToken:
            return 4;
        case SyntaxKind.PipePipeToken:
            return 3;
        default:
            return 0;
    }
}

const getUnaryOperatorPrecedence = (kind: SyntaxKind) => {
    switch(kind) {
        case SyntaxKind.BangToken:
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
            return 14;
        default:
            return 0;
    }
}

const getKeywordKind = (text: string) => {
    switch(text) {
        case "true":
            return SyntaxKind.TrueKeyword;
        case "false":
            return SyntaxKind.FalseKeyword;
        default:
            return SyntaxKind.IdentifierToken;
    }
}

export {
    getBinaryOperatorPrecedence,
    getUnaryOperatorPrecedence,
    getKeywordKind,
}
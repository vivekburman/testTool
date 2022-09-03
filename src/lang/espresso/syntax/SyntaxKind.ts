enum SyntaxKind {
    /**
     * braces
     */
    OpenFirstBracketToken = 1,
    CloseFirstBracketToken,
    OpenSecondBracketToken,
    CloseSecondBracketToken,
    OpenThirdBracketToken,
    CloseThirdBracketToken,

    /**
     * variable types
     */
    NumericLiteralToken,
    LiteralToken,
    IdentifierToken,

    /**
     * math
     */
    PlusToken,
    MinusToken,
    StarToken,
    SlashToken,
    PercentageToken,
    EqualEqualToken,
    AmpersandAmpersandToken,
    PipePipeToken,
    LeftEqualToken,
    RightEqualToken,

    /**
     * logical
     */
    AmpersandToken,
    PipeToken,
    BangToken,
    CapToken,
    EqualToken,
    BangEqualToken,
    LeftToken,
    RightToken,

    /**
     * null
     */
    NullToken,

    /**
     * const var
     */
    VaraiableConstToken,
    VaraiableVarToken,

    /**
     * conditional
     */
    ConditionalIFToken,
    ConditionalElseIfToken,
    ConditionalElseToken,

    /**
     * Loops
     */
    LoopForToken,
    LoopWhileToken,
    LoopDoWhileToken,

    /**
     * break, continue, return, exit
     */
    LoopBreakToken,
    LoopContinueToken,
    ReturnToken,

    /**
     * Print as warn, info, error,
     */
    PrintInfoToken,
    PrintWarnToken,
    PrintErrorToken,

    /**
     * Keyword
     */
    FalseKeyword,
    TrueKeyword,


    /**
     * import
     */
    ImportToken,

    /**
     * Expression
     */
    LiteralExpressionToken,
    UnaryExpressionToken,
    BinaryExpressionToken,
    ParanthesisExpressionToken,

    /**
     * misc
     */
    WhiteSpaceToken,
    Exit,
    EOF,
    UnknownToken,
    
}

const getSyntaxKind = (source: string) => {
    switch(source) {
        case "true":
            return SyntaxKind.TrueKeyword;
        case "false":
            return SyntaxKind.FalseKeyword;
        default:
            return SyntaxKind.IdentifierToken;
    }
};

enum SyntaxKindValue {
    /**
     * braces
     */
    OpenFirstBracketToken = '(',
    CloseFirstBracketToken = ')',
    OpenSecondBracketToken = '[',
    CloseSecondBracketToken = ']',
    OpenThirdBracketToken = '{',
    CloseThirdBracketToken = '}',

    /**
     * math
     */
    PlusToken = '+',
    MinusToken = '-',
    StarToken = '*',
    SlashToken = '/',
    PercentageToken = '%',
    EqualEqualToken = '==',
    AmpersandAmpersandToken = '&&',
    PipePipeToken = '||',
    LeftEqualToken = '<=',
    RightEqualToken = '>=',

    /**
     * logical
     */
    AmpersandToken = '&',
    PipeToken = '|',
    BangToken = '!',
    CapToken = '^',
    EqualToken = '=',
    BangEqualToken = '!=',
    LeftToken = '<',
    RightToken = '>',
}

export {
    SyntaxKind as default,
    getSyntaxKind, 
};
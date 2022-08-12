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
    CharacterLiteralToken,
    StringLiteralToken,

    /**
     * math
     */
    PlusToken,
    MinusToken,
    StarToken,
    SlashToken,
    ModulusToken,
    EqualToken,
    TildaToken,

    /**
     * logical operators
     */
    LogicalAndToken,
    LogicalOrToken,
    LogialNotToken,

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
     * import
     */
    ImportToken,

    /**
     * Expression
     */
    NumericExpressionToken,
    BinaryExpressionToken,

    /**
     * misc
     */
    WhiteSpaceToken,
    Exit,
    EOF,
    UnknownToken,
}
export default SyntaxKind;
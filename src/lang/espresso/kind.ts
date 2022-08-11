enum SyntaxKind {
    /**
     * braces
     */
    OpenBracketToken = 1,
    CloseBracketToken,
    OpenArrayToken,
    CloseArrayToken,
    OpenFunctionToken,
    CloseFunctionToken,

    /**
     * variable types
     */
    NumericLiteralToken,
    CharacterLiteralToken,
    StringLiteralToken,

    /**
     * math
     */
    OperatorPlusToken,
    OperatorMinusToken,
    OperatorMultiplyToken,
    OperatorDivideToken,
    OperatorModulusToken,
    OperatorEqualToken,
    OperatorTildaToken,
    
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
     * misc
     */
    Exit,
    EOL,
    EOF,
    UnknownToken, 
}
export default SyntaxKind;
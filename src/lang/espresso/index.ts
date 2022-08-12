import SyntaxKind from "./binding/SyntaxKind";
import Lexer from "./binding/Lexer";

function main() {
    const val = "223344 * 23 + 34 - (334 + (34 *233))"
    const lexer = new Lexer(val);
    while(true) {
        const token = lexer.getNextToken();
        if (token.kind === SyntaxKind.EOF) {
            break;
        }
        console.log(`Kind - ${SyntaxKind[token.kind]}, Value - ${token.value}`);
    }
}
main();
import SyntaxKind from "./kind";
import Lexer from "./lexer";

function main() {
    const val = "2 + 2 + 3"
    const lexer = new Lexer(val);
    while(true) {
        const token = lexer.getNextToken();
        if (token.kind === SyntaxKind.EOF) {
            break;
        }
        console.log(`Kind - ${token.kind}, Value - ${token.value}`);
    }
}
main();
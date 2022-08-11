import { logError } from "../../utils/error";
import SyntaxToken from "./token";

class Lexer {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    /**
     * @input String
     * @output Tokens
     */
    generateToken(): SyntaxToken[] {
        const textValue = this.text;
        const textValueLength = textValue.length;
        const cursorPointer = 0;

        try {
            if (!textValue) {
                throw Error("Text is empty or null or undefined!");
            }
            while(cursorPointer <= textValueLength) {
                // if () {

                // } else if() {

                // }
            }

        }catch(e) {
            logError(e);
        }
        return [];
    }



}
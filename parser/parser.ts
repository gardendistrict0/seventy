import { p_BinaryExpression, p_UnaryExpression, Token, TokenType } from "../global/global.ts";
  

export class Parser{
    //deno-lint-ignore no-explicit-any
    private AST: any = {}; // Oh no, the poor compiler, no static types, this is so sad. To be continued in the sequel of: "Typescript: A beautiful looking dumpster fire"...
    private Errors : Error[] = [];
    constructor(private Tokens: Token[]) {
      this.Tokens = Tokens;
    }

    parse() {
        this.AST = {
            type: "Program",
            body: []
        }

        let index = 0;
        while (index < this.Tokens.length - 1) {
            const token = this.Tokens[index];
            const l_token = this.Tokens[index - 1];
            const r_token = this.Tokens[index + 1];
            // Binary expression
            if (r_token && l_token) { 
                if (token.type === TokenType.ADDITION) {
                    this.AST.body.push(p_BinaryExpression(l_token.value, "+", r_token.value));
                } else if (token.type === TokenType.SUBTRACTION) {
                    this.AST.body.push(p_BinaryExpression(l_token.value, "-", r_token.value));
                } else if (token.type === TokenType.MULTIPLY) {
                    this.AST.body.push(p_BinaryExpression(l_token.value, "*", r_token.value));
                } else if (token.type === TokenType.DIVIDE) {
                    this.AST.body.push(p_BinaryExpression(l_token.value, "/", r_token.value));
                } else if (token.type === TokenType.INCREMENT) {
                    this.AST.body.push(p_UnaryExpression("++", l_token.value));
                } else if (token.type === TokenType.DECREMENT) {
                    this.AST.body.push(p_UnaryExpression("--", l_token.value));
                } 
                index++;
            } else if (index == 0) {
                this.Errors.push(new Error("Expected number token, got null"));
                continue;
            }
        }
    }
    
}

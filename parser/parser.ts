// deno-lint-ignore no-unused-vars
import { p_BinaryExpression, Token, TokenType,  } from "../global/global.ts";
  

export class Parser{
    // deno-lint-ignore no-explicit-any
    private AST : any = {};
    constructor(private Tokens: Token[]) {
      this.Tokens = Tokens;
    }

    parse() {
        this.AST = {
            type: "Program",
            body: []
        }

        let index = 0;
        while (index < this.Tokens.length) {
            const token = this.Tokens[index];
            const l_token = this.Tokens[index - 1];
            const r_token = this.Tokens[index + 1];
            if (token.type === TokenType.ADDITION) {
                this.AST.body.push(p_BinaryExpression(l_token.value, "+", r_token.value));
            } else if (token.type === TokenType.SUBTRACTION) {
                this.AST.body.push(p_BinaryExpression(l_token.value, "-", r_token.value));
            } else if (token.type === TokenType.MULTIPLY) {
                this.AST.body.push(p_BinaryExpression(l_token.value, "*", r_token.value));
            } else if (token.type === TokenType.DIVIDE) {
                this.AST.body.push(p_BinaryExpression(l_token.value, "/", r_token.value));
            }
            index++;
        }
    }
    
}
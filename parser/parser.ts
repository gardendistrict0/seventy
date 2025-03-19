// deno-lint-ignore no-unused-vars
import { Token, TokenType } from "../global/global.ts";
  

export class Parser{
    // deno-lint-ignore no-explicit-any
    private AST : any = {};
    constructor(private Tokens: Token[]) {
      this.Tokens = Tokens;
    }

    setupAST() {
        this.AST = {
            type: "Program",
            body: []
        };
    }
    

}
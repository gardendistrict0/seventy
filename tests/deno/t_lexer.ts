import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Lexer } from "../../lexer/lexer.ts";
import { TokenType } from "../../global/global.ts";

Deno.test("Lexer test", () => {
    const lexer = new Lexer("123 456");
    const tokens = lexer.tokenize();
    assertEquals(tokens, [
        { type: TokenType.INTEGER, value: "123" },
        { type: TokenType.INTEGER, value: "456" }
    ]);
});

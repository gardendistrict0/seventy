import { assertEquals } from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { Lexer } from "../../lexer/lexer.ts";
import { TokenType } from "../../global/global.ts";

Deno.test("Number/Whitespace tests", () => {
    const lexer = new Lexer("123 456");
    const tokens = lexer.tokenize();
    assertEquals(tokens, [
        { type: TokenType.INTEGER, value: "123" },
        { type: TokenType.INTEGER, value: "456" }
    ]);
});

Deno.test("String tests", () => {
    const lexer = new Lexer('"Hello, World!"');
    const tokens = lexer.tokenize();
    assertEquals(tokens, [
        { type: TokenType.STRING, value: "Hello, World!" }
    ]);
});

Deno.test("Operator tests", () => {
    const lexer = new Lexer("+-*/=.");
    const tokens = lexer.tokenize();
    assertEquals(tokens, [
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.SUBTRACTION, value: "-" },
        { type: TokenType.MULTIPLY, value: "*" },
        { type: TokenType.DIVIDE, value: "/" },
        { type: TokenType.EQUAL, value: "=" },
        { type: TokenType.ACCESS_PERIOD, value: "." }
    ]);
});

Deno.test("Comment tests", () => {
    const lexer = new Lexer("# This is a comment\n123");
    const tokens = lexer.tokenize();
    assertEquals(tokens, [
        { type: TokenType.NEWLINE, value: "\n" },
        { type: TokenType.INTEGER, value: "123" }
    ]);
});

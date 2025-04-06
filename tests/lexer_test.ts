import { assertEquals } from 'https://deno.land/std@0.116.0/testing/asserts.ts';
import { Lexer } from '../lexer/lexer.ts';
import { TokenType, Token } from '../global/global.ts';

function runTest(input: string, expectedTokens: Token[]) {
    const unit = new Lexer(input);
    unit.tokenize();
    assertEquals(unit.returnTokens(), expectedTokens);
}

Deno.test('Lexer: Tokenize simple mathematical expressions', () => {
    runTest("1 + 2", [
        { type: TokenType.INTEGER, value: "1" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.INTEGER, value: "2" },
    ]);
    
    runTest("1 + 2 + 3", [
        { type: TokenType.INTEGER, value: "1" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.INTEGER, value: "2" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.INTEGER, value: "3" },
    ]);
    
    runTest("x + y * 3", [
        { type: TokenType.IDENTIFIER, value: "x" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.IDENTIFIER, value: "y" },
        { type: TokenType.MULTIPLY, value: "*" },
        { type: TokenType.INTEGER, value: "3" },
    ]);

    runTest("x + y * 3 + 4", [
        { type: TokenType.IDENTIFIER, value: "x" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.IDENTIFIER, value: "y" },
        { type: TokenType.MULTIPLY, value: "*" },
        { type: TokenType.INTEGER, value: "3" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.INTEGER, value: "4" },
    ]);
});

Deno.test('Lexer: Identify identifiers and predefined identifiers', () => {
    runTest("x", [
        { type: TokenType.IDENTIFIER, value: "x" },
    ]);

    runTest("e", [
        { type: TokenType.IDENTIFIER, value: "e" },
    ]);

    runTest("pi print", [
        { type: TokenType.IDENTIFIER, value: "pi" },
        { type: TokenType.PREDEF_ID, value: "print" },
    ]);

    runTest("float flaot fl", [
        { type: TokenType.IDENTIFIER, value: "float" },
        { type: TokenType.IDENTIFIER, value: "flaot" },
        { type: TokenType.PREDEF_ID, value: "fl" },
    ]);
});

Deno.test('Lexer: Handle empty input', () => {
    runTest("", []);
});

Deno.test('Lexer: Handle whitespace-only input', () => {
    runTest("   ", []);
});

Deno.test('Lexer: Tokenize multiple operators', () => {
    runTest("1 + 2 - 3 * 4 / 5", [
        { type: TokenType.INTEGER, value: "1" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.INTEGER, value: "2" },
        { type: TokenType.SUBTRACTION, value: "-" },
        { type: TokenType.INTEGER, value: "3" },
        { type: TokenType.MULTIPLY, value: "*" },
        { type: TokenType.INTEGER, value: "4" },
        { type: TokenType.DIVIDE, value: "/" },
        { type: TokenType.INTEGER, value: "5" },
    ]);
});

Deno.test('Lexer: Tokenize string literals', () => {
    runTest('"hello" + "world"', [
        { type: TokenType.STRING, value: "hello" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.STRING, value: "world" },
    ]);
});

Deno.test('Lexer: Tokenize parentheses', () => {
    runTest("(1 + 2) * 3", [
        { type: TokenType.OPEN_PAREN, value: "(" },
        { type: TokenType.INTEGER, value: "1" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.INTEGER, value: "2" },
        { type: TokenType.CLOSE_PAREN, value: ")" },
        { type: TokenType.MULTIPLY, value: "*" },
        { type: TokenType.INTEGER, value: "3" },
    ]);
});

Deno.test('Lexer: Tokenize mixed input with spaces', () => {
    runTest("  a  +   b  *  c ", [
        { type: TokenType.IDENTIFIER, value: "a" },
        { type: TokenType.ADDITION, value: "+" },
        { type: TokenType.IDENTIFIER, value: "b" },
        { type: TokenType.MULTIPLY, value: "*" },
        { type: TokenType.IDENTIFIER, value: "c" },
    ]);
});
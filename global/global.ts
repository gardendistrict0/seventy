// Lexer.ts
//--------------------------------------------------------------------------------------------------------------

export enum TokenType {
    // COMMENT
    COMMENT,
    MULTILINE,

    // COMMAND
    PRINT,
    PRINTFORM,

    // OPERATOR
    ADDITION,
    SUBTRACTION,
    MULTIPLY,
    DIVIDE,
    EQUAL,
    ACCESS_PERIOD,

    // COMPARISON
    GREATER_THAN,
    LESS_THAN,
    GREATER_THAN_EQUAL,
    LESS_THAN_EQUAL,
    EQUAL_TO,
    NOT_EQUAL_TO,
    AND,
    OR,
    XOR,
    NOR,
    NAND,
    XNOR,
    NOT,

    // TYPE
    STRING,
    INTEGER,
    FLOAT,
    BINARY,

    // PARENTHESIS
    OPEN_PAREN,
    CLOSE_PAREN,
    OPEN_CURLY,
    CLOSE_CURLY,
    OPEN_SQUARE,
    CLOSE_SQUARE,

    // IDENTIFIER
    IDENTIFIER,
    PREDEF_ID,

    // MISC
    NEWLINE,
    PRG_CONFIG,
    ESCAPE
}

export interface Token {
    type: TokenType;
    value: string;
}

export const isNumber = (char : string) => {
    return !isNaN(parseInt(char));
}

export const isLetter = (char : string) => {
    return char.toLowerCase() != char.toUpperCase();
}
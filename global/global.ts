// Lexer.ts
//--------------------------------------------------------------------------------------------------------------

export enum TokenType {
    // Comment
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

    // TYPE
    STRING,
    INTEGER,
    FLOAT,
    BINARY,

    // MISC
    NEWLINE
}

export interface Token {
    type: TokenType;
    value: string;
}

export const isNumber = (char : string) => {
    return !isNaN(parseInt(char));
}
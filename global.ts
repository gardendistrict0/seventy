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
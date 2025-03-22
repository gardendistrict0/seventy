// Lexer.ts
//--------------------------------------------------------------------------------------------------------------

export enum TokenType {
    // COMMENT
    COMMENT = "COMMENT",
    MULTILINE = "MULTILINE",

    // COMMAND
    PRINT = "PRINT",
    PRINTFORM = "PRINTFORM",

    // OPERATOR
    ADDITION = "ADDITION",
    SUBTRACTION = "SUBTRACTION",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE",
    EQUAL = "EQUAL",
    ACCESS_PERIOD = "ACCESS_PERIOD",

    // COMPARISON
    GREATER_THAN = "GREATER_THAN",
    LESS_THAN = "LESS_THAN",
    GREATER_THAN_EQUAL = "GREATER_THAN_EQUAL",
    LESS_THAN_EQUAL = "LESS_THAN_EQUAL",
    EQUAL_TO = "EQUAL_TO",
    NOT_EQUAL_TO = "NOT_EQUAL_TO",
    AND = "AND",
    OR = "OR",
    XOR = "XOR",
    NOR = "NOR",
    NAND = "NAND",
    XNOR = "XNOR",
    NOT = "NOT",

    //TODO: Add Bitwise operators

    // TYPE
    STRING = "STRING",
    INTEGER = "INTEGER",
    FLOAT = "FLOAT",
    BINARY = "BINARY",

    // PARENTHESIS
    OPEN_PAREN = "OPEN_PAREN",
    CLOSE_PAREN = "CLOSE_PAREN",
    OPEN_CURLY = "OPEN_CURLY",
    CLOSE_CURLY = "CLOSE_CURLY",
    OPEN_SQUARE = "OPEN_SQUARE",
    CLOSE_SQUARE = "CLOSE_SQUARE",

    // IDENTIFIER
    IDENTIFIER = "IDENTIFIER",
    PREDEF_ID = "PREDEF_ID",

    // MISC
    NEWLINE = "NEWLINE",
    PRG_CONFIG = "PRG_CONFIG",
    ESCAPE = "ESCAPE"
}

// deno-lint-ignore no-unused-vars
const enum PredefinedIdentifiers {
    // Functions
    print = "print",

    // Types
    string = "string",
    integer = "int",
    float = "fl",
    boolean = "bool",
    binary = "bin",
    free = "free",

    // Constants
    pi = "pi",
    e = "e",
    true = "true",
    false = "false",
    never = "never",
    undefined = "undefined",
    infinity = "infinity",

    // Keywords
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

// Parser.ts
//--------------------------------------------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
export function p_Literal(data: any) {
    return {
      type: "Literal",
      value: data,
      raw: `{${data}}`
    };
}

export function p_Identifier(data: string) {
    return {
      type: "Identifier",
      name: data,
      raw: `{${data}}`
    };
}

export function p_IdentifierPredef(data: string) {
    return {
      type: "IdentifierPredef",
      name: data,
      raw: `{${data}}`
    };
}

// deno-lint-ignore no-explicit-any
export function p_BinaryExpression(l_data: string, op: string, r_data: any) {
    return {
        type: "BinaryExpression",
        left: l_data,
        right: r_data,
        operator: op,
        raw: `${l_data} ${op} ${r_data}`
        
    }
}

// deno-lint-ignore no-explicit-any
export function p_UnaryExpression(op: string, data: any) {
    return {
        type: "UnaryExpression",
        operator: op,
        argument: data,
        raw: `${op} ${data}`
    }
}

// deno-lint-ignore no-explicit-any
export function p_AssignmentExpression(id: string, op: string, data: any) {
    return {
        type: "AssignmentExpression",
        left: id,
        right: data,
        operator: op,
        raw: `${id} ${op} ${data}`
    }
}

export function p_CallExpression(func: string, args: string[]) {
    return {
        type: "CallExpression",
        left: func,
        right: args,
        raw: `${func}(${args.join(", ")})`
    }
}

export function p_ObjectAccess(obj: string, property: string) {
    return {
        type: "ObjectAccess",
        left: obj,
        right: property,
        raw: `${obj}.${property}`
    }
}

export function p_ArrayAccess(array: string, id: string) {
    return {
        type: "ArrayAccess",
        left: array,
        right: id,
        raw: `${array}[${id}]`
    }
}


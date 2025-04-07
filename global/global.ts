// All
//--------------------------------------------------------------------------------------------------------------


export interface Error {
    message: Error;
}
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

    // UNARY
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",

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

    // BITWISE OPERATORS
    BITWISE_AND = "BITWISE_AND",
    BITWISE_OR = "BITWISE_OR",
    BITWISE_XOR = "BITWISE_XOR",
    BITWISE_NOT = "BITWISE_NOT",
    LEFT_SHIFT = "LEFT_SHIFT",
    RIGHT_SHIFT = "RIGHT_SHIFT",
    UNSIGNED_RIGHT_SHIFT = "UNSIGNED_RIGHT_SHIFT",

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


export const PredefinedIdentifiers : string[] = [
    "print",
    "string",
    "int",
    "fl",
    "bool",
    "bin",
    "free",
    "true",
    "false",
    "never",
    "undefined",
    "infinity",
    "def"
];


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


export function p_Literal(data: string) { // PARAMETER MUST BE STRING OR TYPESCRIPT WILL HAVE A TANTRUM
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

export function p_BinaryExpression(l_data: string, op: string, r_data: string) {
    return {
        type: "BinaryExpression",
        left: l_data,
        right: r_data,
        operator: op,
        raw: `${l_data} ${op} ${r_data}`
        
    }
}

export function p_UnaryExpression(op: string, data: string) { // SAME CASE HERE
    return {
        type: "UnaryExpression",
        operator: op,
        argument: data,
        raw: `${op} ${data}`
    }
}

export function p_AssignmentExpression(id: string, op: string, data: string) { // HERE TOO
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

export function p_VariableDeclaration(variable: string, varvalue: string, STATICtype?: string) {
    return {
        type: "VariableDeclaration",
        name: variable,
        staticType: STATICtype !== 'undefined' ? STATICtype : null,
        value: varvalue,
        raw: STATICtype !== 'undefined' ? `${variable} : ${STATICtype} = ${varvalue}` : `${variable} = ${varvalue}`
    }
}

export function p_CUSTOM(data: string, body?: Record<string, unknown>) {
    return {
        type: "CUSTOM",
        name: data,
        body: body,
        raw: `${data}`
    }
}

export function p_Program(data: string[]) {
    return {
        type: "Program",
        body: data,
        raw: `${data.join("\n")}`
    }
}


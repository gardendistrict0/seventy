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

export const PredefinedIdentifiers : string[] = [
    "print",
    "string",
    "int",
    "fl",
    "bool",
    "bin",
    "free",
    "pi",
    "e",
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

export function p_VariableDeclaration(variable: string, varvalue: string, STATICtype?: string) {
    return {
        type: "VariableDeclaration",
        name: variable,
        staticType: STATICtype !== 'undefined' ? STATICtype : null,
        value: varvalue,
        raw: STATICtype !== 'undefined' ? `${variable} : ${STATICtype} = ${varvalue}` : `${variable} = ${varvalue}`
    }
}

//deno-lint-ignore no-explicit-any
export function p_CUSTOM(data: string, body?: any) {
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


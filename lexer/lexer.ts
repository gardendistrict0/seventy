import { isNumber, Token, TokenType, isLetter} from "../global/global.ts";

let sourceIndex: number = 0;
let testNumber : number;
let testString : string;
const tokens: Token[] = [];

export class Lexer {
  constructor(private source: string) {
    this.source = source;
  }
  tokenize(): Token[] {
    for (sourceIndex = 0; sourceIndex < this.source.length; sourceIndex++) {
      const char = this.source.charAt(sourceIndex); //FIXME: idk what is wrong here, deno's having a crashout again

      // Whitespace control
      if (char == " ") continue;
      if (char == "\t") continue;
      if (char == "\n") tokens.push({ type: TokenType.NEWLINE, value: "\n" });
      //TODO: Add more whitespaces later

      // Comment control
      if (char == "#") {
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex) !== "\n") {
            sourceIndex++;
          }
          // Don't push because it's a comment (duh?)
      }
      //TODO: Add multiline comments later

      // Number control
      if (isNumber(char)) {
        testNumber = parseInt(char);
        while (sourceIndex < this.source.length && isNumber(this.source.charAt(sourceIndex++))) {
            testNumber = testNumber * 10 + parseInt(this.source.charAt(sourceIndex));
            sourceIndex++;
        }
        tokens.push({type: TokenType.INTEGER, value: testNumber.toString()});
      }

      // String control
      
      // Double quote strings
      if (char == '"') {
        testString = "";
        sourceIndex++;
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex++) !== '"') {
          testString += this.source.charAt(sourceIndex);
          sourceIndex++;
        }
      }

      // Single quote strings
      if (char == "'") {
        testString = "";
        sourceIndex++;
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex++) !== "'") {
          testString += this.source.charAt(sourceIndex);
          sourceIndex++;
        }
      }

      // Operator control
      if (char == ".") tokens.push({type: TokenType.ACCESS_PERIOD, value: "."});
      if (char == "+") tokens.push({type: TokenType.ADDITION, value: "+"});
      if (char == "-") tokens.push({type: TokenType.SUBTRACTION, value: "-"});
      if (char == "*") tokens.push({type: TokenType.MULTIPLY, value: "*"});
      if (char == "/") tokens.push({type: TokenType.DIVIDE, value: "/"});
      if (char == "=") tokens.push({type: TokenType.EQUAL, value: "="});

      // Comparison control
      if (char == "<") tokens.push({type: TokenType.LESS_THAN, value: "<"});
      if (char == ">") tokens.push({type: TokenType.GREATER_THAN, value: ">"});
      if (char == "!") tokens.push({type: TokenType.NOT, value: "!"});
      if (char == "&&") tokens.push({type: TokenType.AND, value: "&"});
      if (char == "||") tokens.push({type: TokenType.OR, value: "|"});
      if (char == "^") tokens.push({type: TokenType.XOR, value: "^"});
      if (char == "~") tokens.push({type: TokenType.NOR, value: "~"});
      if (char == "!&") tokens.push({type: TokenType.NAND, value: "&"});
      if (char == "!|") tokens.push({type: TokenType.NOR, value: "|"});
      if (char == "!^") tokens.push({type: TokenType.XNOR, value: "^"});
      
      // Parentheses control
      if (char == "(") tokens.push({type: TokenType.OPEN_PAREN, value: "("});
      if (char == ")") tokens.push({type: TokenType.OPEN_PAREN, value: ")"});
      if (char == "{") tokens.push({type: TokenType.OPEN_CURLY, value: "{"});
      if (char == "}") tokens.push({type: TokenType.CLOSE_CURLY, value: "}"});
      if (char == "[") tokens.push({type: TokenType.OPEN_SQUARE, value: "["});
      if (char == "]") tokens.push({type: TokenType.CLOSE_SQUARE, value: "]"});
      
      // Identifier control
      if (isLetter(char)) {
        testString = char;
        while (sourceIndex < this.source.length && (isLetter(this.source.charAt(sourceIndex++)) || isNumber(this.source.charAt(sourceIndex++)))) {
          testString += this.source.charAt(sourceIndex);
          sourceIndex++;
        }
        tokens.push({type: TokenType.IDENTIFIER, value: testString});
      }
      
      
    }
    
    // Return list of tokens
    return tokens;
  }
}
import { isNumber, Token, TokenType } from "../global/global.ts";

let sourceIndex: number = 0;
let testNumber : number;
let testString : string;
const tokens: Token[] = [];

export class Lexer {
  constructor(private source: string) {
    this.source = source;
  }
  lex(): Token[] {
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
      }
      //TODO: Add multiline comments later

      // Number control
      if (isNumber(char)) {
        testNumber = parseInt(char);
        while (sourceIndex < this.source.length && isNumber(this.source.charAt(sourceIndex++))) {
            testNumber = testNumber * 10 + parseInt(this.source.charAt(sourceIndex));
        }
      }

      // String control
      
      // Double quote strings
      if (char == '"') {
        testString = "";
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex++) !== '"') {
          testString += this.source.charAt(sourceIndex);
        }
      }

      // Single quote strings
      if (char == "'") {
        testString = "";
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex++) !== "'") {
          testString += this.source.charAt(sourceIndex);
        }
      }

      // Operator control
      if (char == ".") tokens.push({type: TokenType.ACCESS_PERIOD, value: "."});
      if (char == "+") tokens.push({type: TokenType.ADDITION, value: "+"});
      if (char == "-") tokens.push({type: TokenType.SUBTRACTION, value: "-"});
      if (char == "*") tokens.push({type: TokenType.MULTIPLY, value: "*"});
      if (char == "/") tokens.push({type: TokenType.DIVIDE, value: "/"});
      if (char == "=") tokens.push({type: TokenType.EQUAL, value: "="});
    }
    return tokens;
  }
}

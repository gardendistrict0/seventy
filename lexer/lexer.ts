import { isNumber, Token as _Token, TokenType, isLetter, PredefinedIdentifiers } from "../global/global.ts";

export let sourceIndex = 0;
export class Lexer {
  private tokens: { type: TokenType; value: string }[] = [];
  constructor(private source: string) {
    this.source = source;
  }

  tokenize() {
    this.tokens.length = 0;
    for (sourceIndex = 0; sourceIndex < this.source.length; sourceIndex++) {
      const char = this.source.charAt(sourceIndex);

      // Whitespace control
      if (char == " " || char == "\t") continue;
      if (char == "\n") {
        this.tokens.push({ type: TokenType.NEWLINE, value: "\n" });
        continue;
      }

      // Comment control
      if (char == "#") {
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex) !== "\n") {
          sourceIndex++;
        }
        continue; // Don't push because it's a comment (duh?)
      }

      // Number control
      if (isNumber(char)) {
        let testNumber = parseInt(char);
        while (sourceIndex + 1 < this.source.length && isNumber(this.source.charAt(sourceIndex + 1))) {
          sourceIndex++;
          testNumber = testNumber * 10 + parseInt(this.source.charAt(sourceIndex));
        }
        this.tokens.push({ type: TokenType.INTEGER, value: testNumber.toString() });
        continue; // Move on after finding a number
      }

      // String control
      if (char == '"') {
        let testString = "";
        sourceIndex++; // Skip past the opening quote
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex) !== '"') {
          testString += this.source.charAt(sourceIndex);
          sourceIndex++;
        }
        this.tokens.push({ type: TokenType.STRING, value: testString });
        continue;
      }

      if (char == "'") {
        let testString = "";
        sourceIndex++; // Skip past the opening quote
        while (sourceIndex < this.source.length && this.source.charAt(sourceIndex) !== "'") {
          testString += this.source.charAt(sourceIndex);
          sourceIndex++;
        }
        this.tokens.push({ type: TokenType.STRING, value: testString });
        continue;
      }

      // Multi-character operators control
      if (char == "&" && this.source.charAt(sourceIndex + 1) == "&") {
        this.tokens.push({ type: TokenType.AND, value: "&&" });
        sourceIndex++; // Skip the next character
        continue;
      }

      if (char == "|" && this.source.charAt(sourceIndex + 1) == "|") {
        this.tokens.push({ type: TokenType.OR, value: "||" });
        sourceIndex++; // Skip the next character
        continue;
      }

      if (char == "!" && this.source.charAt(sourceIndex + 1) == "=") {
        this.tokens.push({ type: TokenType.NOT_EQUAL_TO, value: "!=" });
        sourceIndex++; // Skip the next character
        continue;
      }

      if (char == "=" && this.source.charAt(sourceIndex + 1) == "=") {
        this.tokens.push({ type: TokenType.EQUAL_TO, value: "==" });
        sourceIndex++; // Skip the next character
        continue;
      }

      // Operator control
      if (char == ".") this.tokens.push({ type: TokenType.ACCESS_PERIOD, value: "." });
      if (char == "+") this.tokens.push({ type: TokenType.ADDITION, value: "+" });
      if (char == "-") this.tokens.push({ type: TokenType.SUBTRACTION, value: "-" });
      if (char == "*") this.tokens.push({ type: TokenType.MULTIPLY, value: "*" });
      if (char == "/") this.tokens.push({ type: TokenType.DIVIDE, value: "/" });
      if (char == "=") this.tokens.push({ type: TokenType.EQUAL, value: "=" });

      // Comparison control
      if (char == "<") this.tokens.push({ type: TokenType.LESS_THAN, value: "<" });
      if (char == ">") this.tokens.push({ type: TokenType.GREATER_THAN, value: ">" });
      if (char == "!") this.tokens.push({ type: TokenType.NOT, value: "!" });
      if (char == "^") this.tokens.push({ type: TokenType.XOR, value: "^" });
      if (char == "~") this.tokens.push({ type: TokenType.NOR, value: "~" });

      // Parentheses control
      if (char == "(") this.tokens.push({ type: TokenType.OPEN_PAREN, value: "(" });
      if (char == ")") this.tokens.push({ type: TokenType.CLOSE_PAREN, value: ")" });
      if (char == "{") this.tokens.push({ type: TokenType.OPEN_CURLY, value: "{" });
      if (char == "}") this.tokens.push({ type: TokenType.CLOSE_CURLY, value: "}" });
      if (char == "[") this.tokens.push({ type: TokenType.OPEN_SQUARE, value: "[" });
      if (char == "]") this.tokens.push({ type: TokenType.CLOSE_SQUARE, value: "]" });

      // Unary control
      if (char == "+" && this.source.charAt(sourceIndex + 1) == "+") {
        this.tokens.push({ type: TokenType.INCREMENT, value: "++" });
        sourceIndex++;
      }
      if (char == "-" && this.source.charAt(sourceIndex + 1) == "-") {
        this.tokens.push({ type: TokenType.DECREMENT, value: "--" });
        sourceIndex++;
      }
      
      // Identifier control
      if (isLetter(char)) {
        let testString = char;
        while (sourceIndex + 1 < this.source.length && (isLetter(this.source.charAt(sourceIndex + 1)) || isNumber(this.source.charAt(sourceIndex + 1)))) {
          sourceIndex++;
          testString += this.source.charAt(sourceIndex);
        }
        if (PredefinedIdentifiers.includes(testString)) {
          this.tokens.push({ type: TokenType.PREDEF_ID, value: testString });
          continue;
        } else {
          this.tokens.push({ type: TokenType.IDENTIFIER, value: testString });
        }
      }
    }

    return this.tokens;
  }
  
  returnTokens() {
    return this.tokens;
  }
}

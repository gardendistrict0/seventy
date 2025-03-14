import { Lexer } from './lexer/lexer.ts';

const source = '123 + 456 ==';
const lex = new Lexer(source);
console.log(lex.tokenize());
import { Lexer } from "../lexer/lexer.ts";
const args : string[] = Deno.args;

if (args.includes('--version')) {
    console.log('v0.1.0-alpha'); // Print version
    Deno.exit(0);
} else if (args.includes('--tokenize')) {
    const lexer = new Lexer(args[1]);
    lexer.tokenize();
    console.log(lexer.returnTokens());
    Deno.exit(0);
} else {
    Deno.exit(1);
}

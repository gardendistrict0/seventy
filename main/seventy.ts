import { Lexer } from "../lexer/lexer.ts";
const args : string[] = Deno.args;

if (args.includes('--version')) {
    console.log('v0.1.0-alpha'); // Print version
    Deno.exit(0);
} else if (args.includes('--tokenize')) {
    
} else {
    
}

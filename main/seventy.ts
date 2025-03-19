import { Lexer } from "../lexer/lexer.ts";

const ARGS : string[] = Deno.args;
const HELP_MESSAGE = `
Usage: seventy [arguments]

Supported arguments:
    -h, --help                   Prints this help message
    -v, --version                Prints the current version
    -t [filePath], --tokenize [filePath]  
                                  Tokenizes the given file
`;

const VERSION : string = "Seventy v0.1.0-beta\n";
let _silent : boolean = false;

function silentCommand() {
    _silent = true;
}

function printHelpMessage(helpMessage: string) {
    console.log(helpMessage);
}

function printVersion(version: string) {
    console.log(version);
}

function tokenizeArgument(filePath?: string) {
    if (!filePath) {
        console.error("ERROR: Missing file path.");
        Deno.exit(1);
    }

    try {
        const content : string = Deno.readTextFileSync(filePath);
        const lexer = new Lexer(content);
        console.log(lexer.tokenize());
        Deno.exit(0);
    } catch (error) {
        if (error instanceof Error) {
            console.error("ERROR: Failed to tokenize file:", error.message);
        } else {
            console.error("ERROR: Failed to tokenize file:", error);
        }
        Deno.exit(1);
    }
}


if (ARGS.includes("-S") || ARGS.includes("--silent")) {
    silentCommand();
}


switch (ARGS[0]) {
    case '-H':
    case '--help':
        printHelpMessage(HELP_MESSAGE);
        break;
    case '-V':
    case '--version':
        printVersion(VERSION);
        break;
    case '-T':
    case '--tokenize':
        tokenizeArgument(ARGS[1]);
        break;
    default:
        console.error("Use -H or --help to print supported commands.");
        Deno.exit(1);
}
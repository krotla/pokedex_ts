import { createInterface } from 'node:readline';
import { CLICommand, State } from './state.js';

export async function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", async (line) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        } 

        const commandName = words[0];

        const args = words.length > 1 ? words.slice(1) : []; 

        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of available commands.`);
            state.readline.prompt();
            return;
        }

        try {
            await cmd.callback(state, ...args);
        } catch (e) {
            console.log(e);
        }
        state.readline.prompt();        
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(/\s+/).filter((word) => word !== "");
}


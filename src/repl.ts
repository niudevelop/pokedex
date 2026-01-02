import { createInterface } from "node:readline";
export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(" ")
    .filter((s) => s.length > 0);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > " 
  });
  rl.prompt();

  rl.on('line', (line) => {
  if (line.length === 0){
      rl.prompt();
      return
    }
    const commands = cleanInput(line)
    rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
}

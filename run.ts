import {exec} from 'child_process';

const args = process.argv.slice(2); // Get CLI arguments
const [year, day] = args;

if (!year || !day) {
  console.error('Usage: run-dynamic.ts -- <year> <day>');
  process.exit(1);
}

const filePath = `./src/${year}/${day}/${year}-${day}.ts`;

exec(`ts-node ${filePath}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});

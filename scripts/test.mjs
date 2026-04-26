import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptFile = fileURLToPath(import.meta.url);
const scriptDir = dirname(scriptFile);
const repoRoot = resolve(scriptDir, '..');
const vitestBin = resolve(repoRoot, 'node_modules', 'vitest', 'vitest.mjs');

const forwardedArgs = process.argv.slice(2).filter((arg) => arg !== '--runInBand');

const result = spawnSync(process.execPath, [vitestBin, 'run', ...forwardedArgs], {
  cwd: repoRoot,
  stdio: 'inherit',
});

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);

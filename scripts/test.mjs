import { spawnSync } from 'node:child_process';

const forwardedArgs = process.argv.slice(2).filter((arg) => arg !== '--runInBand');

const result = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['vitest', 'run', ...forwardedArgs],
  {
    stdio: 'inherit',
    env: process.env,
  }
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);

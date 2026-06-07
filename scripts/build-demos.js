import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const DEMOS = [
  {
    name: 'advogado',
    repo: 'https://github.com/AllanLimaS/portf_LP_advogado.git',
    base: '/projetos/advogado/',
  },
];

const BUILD_DIR = join(root, '.demos-build');
const TARGET_DIR = join(root, 'public', 'projetos');

function run(cmd, opts = {}) {
  console.log(`\n  > ${cmd}`);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

console.log('Building demo projects...\n');

if (existsSync(BUILD_DIR)) rmSync(BUILD_DIR, { recursive: true });
if (!existsSync(TARGET_DIR)) mkdirSync(TARGET_DIR, { recursive: true });

for (const demo of DEMOS) {
  const clonePath = join(BUILD_DIR, demo.name);
  const destPath = join(TARGET_DIR, demo.name);

  console.log(`\n${demo.name}`);
  console.log(`  repo: ${demo.repo}`);

  run(`git clone --depth 1 "${demo.repo}" "${clonePath}"`);

  const configPath = join(clonePath, 'astro.config.mjs');
  let config = readFileSync(configPath, 'utf-8');

  config = config.replace(
    'defineConfig({',
    `defineConfig({\n  base: '${demo.base}',`
  );
  writeFileSync(configPath, config);
  console.log(`  base path set: ${demo.base}`);

  run('npm install', { cwd: clonePath });
  run('npm run build', { cwd: clonePath });

  if (existsSync(destPath)) rmSync(destPath, { recursive: true });
  cpSync(join(clonePath, 'dist'), destPath, { recursive: true });

  const indexPath = join(destPath, 'index.html');
  let html = readFileSync(indexPath, 'utf-8');

  html = html.replace(
    /(href|src)=["']\/(?!\/|projetos\/)/g,
    `$1="${demo.base}`
  );
  writeFileSync(indexPath, html);
  console.log(`  fixed absolute paths`);
  console.log(`  output -> public/projetos/${demo.name}/`);
}

console.log('\nCleaning up...');
rmSync(BUILD_DIR, { recursive: true });
console.log('Done.\n');

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;

function exec(cmd) {
  execSync(cmd, { stdio: 'inherit', env: process.env });
}

function copy(from, to) {
  const read = fs.createReadStream(from);
  const write = fs.createWriteStream(to);

  return new Promise((resolve, reject) => {
    read.on('error', reject);
    write.on('error', reject);
    read.on('close', resolve);
    read.pipe(write);
  });
}

function ls(dir) {
  return fs.promises.readdir(dir);
}

function abs(dir) {
  return path.join(__dirname, dir);
}

async function build() {
  const dirs = ['root-config', 'vega-header', 'vega-projects', 'vega-fem', 'vega-auth'].map(abs);

  for (dir of dirs) {
    process.chdir(dir);

    exec('yarn build');

    const files = await ls(path.join(dir, 'dist'));

    for (file of files) {
      await copy(path.join(dir, 'dist', file), path.join(rootDir, 'docs', file));
    }
  }
}

build();

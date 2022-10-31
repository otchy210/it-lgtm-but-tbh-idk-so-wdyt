import fs from 'fs';

const packageJsonPath = './package.json';
const srcPath = './src/manifest.json';
const destPath = './build/manifest.json';

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

const destJson = JSON.parse(fs.readFileSync(srcPath));

['description', 'version'].forEach((field) => {
    destJson[field] = packageJson[field];
});

fs.writeFileSync(destPath, JSON.stringify(destJson, null, 4));

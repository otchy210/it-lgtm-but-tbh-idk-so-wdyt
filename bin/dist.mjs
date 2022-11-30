import { execSync } from 'child_process';
import fs from 'fs';

const packageJson = './package.json';
const packageInfo = JSON.parse(fs.readFileSync(packageJson));
const { name, version } = packageInfo;
const distName = `${name}-${version}`;
const distDir = './dist';
const zipDirPath = `${distDir}/${distName}/`;
const zipFileName = `${distName}.zip`;
const zipFilePath = `${distDir}/${zipFileName}`;

if (fs.existsSync(zipFilePath)) {
    throw new Error(`${zipFilePath} already exists.`);
}

fs.mkdirSync(zipDirPath);
execSync(`cp -rf ./build/* ${zipDirPath}`);
execSync(`cd ${distDir} && zip -r ${zipFileName} ${distName}/`);
execSync(`rm -rf ${zipDirPath}`);

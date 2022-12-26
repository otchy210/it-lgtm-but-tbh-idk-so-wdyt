import fs from 'fs';

// manifest.json
{
    const packageJsonPath = './package.json';
    const srcPath = './src/manifest.json';
    const destPath = './build/manifest.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
    const destJson = JSON.parse(fs.readFileSync(srcPath));
    ['description', 'version'].forEach((field) => {
        destJson[field] = packageJson[field];
    });
    fs.mkdirSync('./build/', {recursive: true});
    fs.writeFileSync(destPath, JSON.stringify(destJson, null, 4));
}

// html files
['popup', 'card'].forEach((fileName) => {
    const srcPath = `./src/${fileName}.html`;
    const destPath = `./build/${fileName}.html`;
    fs.copyFileSync(srcPath, destPath);
});

// image files
fs.mkdirSync('./build/images', { recursive: true });
fs.readdirSync('./images')
    .filter((fileName) => {
        return fileName.startsWith('icon');
    })
    .forEach((fileName) => {
        fs.copyFileSync(`./images/${fileName}`, `./build/images/${fileName}`);
    });

// words.txt -> words.json
{
    const srcPath = './src/words.txt';
    const destPath = './build/words.json';
    const urlRegex = /(.+)\s*\(\s*(https?:\/\/[^)]+)\s*\)\s*$/;
    const map = fs.readFileSync(srcPath)
        .toString()
        .split('\n')
        .map((line) => {
            const index = line.indexOf(' ');
            if (index < 0) {
                return [];
            }
            const abbr = line.slice(0, index);
            const desc = line.slice(index).trim();
            if (abbr.length === 0 || desc.length === 0) {
                return [];
            }
            const retrieved = urlRegex.exec(desc);
            if (retrieved && retrieved[2]) {
                return [abbr, retrieved[1].trim(), retrieved[2].trim()];
            } else {
                return [abbr, desc];
            }
        })
        .filter((item) => {
            return item.length !== 0;
        })
        .reduce((map, [abbr, desc, url]) => {
            if (!map[abbr]) {
                map[abbr] = [];
            }
            if (url) {
                map[abbr].push([desc, url]);
            } else {
                map[abbr].push([desc]);
            }
            return map;
        }, {});
    fs.writeFileSync(destPath, JSON.stringify(map));
}

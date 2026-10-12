const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt')

fs.writeFile(filePath, 'NodeJS FileSystem', (err) => {
    if (err) throw err;
    console.log('output.txt was created successfully');
});

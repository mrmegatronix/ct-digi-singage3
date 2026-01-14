const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/burger-night.jpg', filename: 'burger-night.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/steak-night.jpg', filename: 'steak-night.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/schnitzel.jpg', filename: 'schnitzel.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/ribs.jpg', filename: 'ribs.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/fish-chips.jpg', filename: 'fish-chips.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/platter.jpg', filename: 'platter.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2022/02/roast.jpg', filename: 'roast.jpg' },
  { url: 'https://www.coasterstavern.co.nz/wp-content/uploads/2021/07/Coasters-Logo-Web.png', filename: 'Coasters-Logo-Web.png' }
];

const downloadImage = (url, filename) => {
  const filePath = path.join(__dirname, filename);
  const file = fs.createWriteStream(filePath);

  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download ${filename}: Status Code ${response.statusCode}`);
      return;
    }

    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {}); // Delete the file async. (But we don't check the result)
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
};

console.log('Starting image downloads...');
images.forEach(img => {
  downloadImage(img.url, img.filename);
});

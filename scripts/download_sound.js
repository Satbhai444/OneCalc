const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'assets/sounds';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(path.join(dir, 'tick.mp3'));
https.get('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', function(response) {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download finished');
  });
}).on('error', (err) => {
  console.error('Error downloading:', err);
});

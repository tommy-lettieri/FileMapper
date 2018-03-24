const fs = require('fs');
const crypto = require('crypto');

function sha1(path) {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(path);
    let hash = crypto.createHash('sha1');
    hash.setEncoding('hex');

    stream.on('end', () => {
      hash.end();
      resolve(hash.read());
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.pipe(hash);
  });
}

sha1('index.js').then((result) => {
  console.log(result);
});

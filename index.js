const fs = require('fs');
const path = require('path');
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

function traverse(options) {
  fs.readdir(options.filePath, function(err, items) {
    for (var i=0; i<items.length; i++) {
      let childPath = path.resolve(options.filePath, items[i]);
      let stats = fs.lstatSync(childPath);
      if (stats.isDirectory()) {
        traverse({
          filePath: childPath,
          onFile: options.onFile,
          failure: options.failure
        });
      } else if (stats.isFile()) {
        if(typeof(options.onFile) == 'function') {
          options.onFile(childPath);
        }
      } else {
        console.log(childPath + " is not a file or directory");
        if(typeof(options.failure) == 'function') {
          options.failure(childPath + " is not a file or directory");
        }
      }
    }
  });
}

sha1('index.js').then((result) => {
  console.log(result);
});

let p = "C:\\Users\\Luigi\\Desktop\\temp"

traverse({
  filePath: p,
  onFile: function(filePath) {
    console.log(filePath);
  }
})

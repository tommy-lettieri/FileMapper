const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let self = module.exports = {
  /**
  @param: path - the path to the file to sha1
  @return: Promise - A promise of the sha1 or the error
  */
  sha1: function(path) {
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
  },
  /**
  Recursively goes through and finds all files in a specific path
  If the path is a file it will simply end there, otherwise it will list the files and call itself with each child
  @param: options - {filePath: String, onFile(path), onError(childPath, err)} - the path to the file, the onFile callback (can be called many times), the error callback (can be called many times)
  */
  traverse: function(options) {
    let stats = fs.lstatSync(options.filePath);
    if (stats.isDirectory()) {
      fs.readdir(options.filePath, function(err, items) {
        for (var i=0; i<items.length; i++) {
          let childPath = path.resolve(options.filePath, items[i]);
          self.traverse({
            filePath: childPath,
            onFile: options.onFile,
            onError: options.onError
          });
        }
      });
    } else if (stats.isFile()) {
      if(typeof(options.onFile) == 'function') {
        options.onFile(options.filePath);
      }
    } else {
      if(typeof(options.onError) == 'function') {
        options.onError(options.filePath, options.filePath + " is not a file or directory");
      }
    }
  }
}

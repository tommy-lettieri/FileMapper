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
  Get the filesize of a given filepath
  */
  getFileSize: function(filePath) {
    return fs.lstatSync(filePath).size;
  },
  /**
  Recursively goes through and finds all files in a specific path
  If the path is a file it will simply end there, otherwise it will list the files and call itself with each child
  @param: options - {filePath: String, onFile(path), onError(childPath, err)} - the path to the file, the onFile callback (can be called many times), the error callback (can be called many times)
  */
  traverse: async function(options) {
    let stats = fs.lstatSync(options.filePath);
    if (stats.isDirectory()) {
      fs.readdir(options.filePath, (err, items) => {
        if(items.length === 0) {
          // if there are no items in the directory than it is done
          if(typeof(options.onDone) == 'function') {
            options.onDone();
          }
        } else {
          // keep track of how many of children have been resolved
          var resolvedCount = 0;
          for (var i=0; i<items.length; i++) {
            let childPath = path.resolve(options.filePath, items[i]);
            self.traverse({
              // use the childPath
              filePath: childPath,
              // pass along the callbacks
              onFile: options.onFile,
              onError: options.onError,
              // Pass an onDone that will track when the directory is done, when it is done it will run the passed in onDone (so the original passed in will be called once)
              onDone: () => {
                resolvedCount++;
                // once all resolved call done
                if(resolvedCount === items.length) {
                  if(typeof(options.onDone) == 'function') {
                    options.onDone();
                  }
                }
              }
            });
          }
        }
      });
    } else if (stats.isFile()) {
      // if it is a file call the file callback
      if(typeof(options.onFile) == 'function') {
        const onFileResult = options.onFile(options.filePath);
        if (typeof(onFileResult.then) === 'function') {
          await onFileResult;
        }
      }

      // the file is done immediately due to it's lack of children
      if(typeof(options.onDone) == 'function') {
        options.onDone();
      }
    } else {
      // if not a directory or file call the error handler
      if(typeof(options.onError) == 'function') {
        options.onError(options.filePath, options.filePath + " is not a file or directory");
      }

      // regardless done must be called
      if(typeof(options.onDone) == 'function') {
        options.onDone();
      }
    }
  },
  writeFile: function(filePath, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          return reject (err);
        } else {
          return resolve();
        }
      })
    })
  },
  readFile: function(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  }
}

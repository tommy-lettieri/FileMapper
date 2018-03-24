const fileUtils = require('./fileUtils');

// fileUtils.sha1('index.js').then((result) => {
//   console.log(result);
// });
//
// fileUtils.traverse({
//   filePath: "C:\\Users\\Luigi\\Desktop\\temp\\.git\\COMMIT_EDITMSG",
//   onFile: function(filePath) {
//     console.log("File Base Path" + filePath);
//   }
// });
//
// fileUtils.traverse({
//   filePath: "C:\\Users\\Luigi\\Desktop\\temp",
//   onFile: function(filePath) {
//     console.log("Directory Base Path" + filePath);
//   }
// });

let results = {};
fileUtils.traverse({
  filePath: "C:\\Users\\Luigi\\Desktop\\temp",
  onFile: function(filePath) {
    fileUtils.sha1(filePath).then((sha1) => {
      let key = sha1 + "_" + fileUtils.getFileSize(filePath);
      if (!results[key]) {
        results[key] = {
          childPaths: []
        };
      }

      results[key].childPaths.push(filePath);
    });
  }
});

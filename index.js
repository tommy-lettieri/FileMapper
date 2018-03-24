const fileUtils = require('./fileUtils');

fileUtils.sha1('index.js').then((result) => {
  console.log(result);
});

fileUtils.traverse({
  filePath: "C:\\Users\\Luigi\\Desktop\\temp\\.git\\COMMIT_EDITMSG",
  onFile: function(filePath) {
    console.log("File Base Path" + filePath);
  }
})

fileUtils.traverse({
  filePath: "C:\\Users\\Luigi\\Desktop\\temp",
  onFile: function(filePath) {
    console.log("Directory Base Path" + filePath);
  }
})

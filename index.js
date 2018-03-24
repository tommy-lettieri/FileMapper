const fileUtils = require('./fileUtils');

fileUtils.sha1('index.js').then((result) => {
  console.log(result);
});

let p = "C:\\Users\\Luigi\\Desktop\\temp"

fileUtils.traverse({
  filePath: p,
  onFile: function(filePath) {
    console.log(filePath);
  }
})

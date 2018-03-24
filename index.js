const fileUtils = require('./utils/fileUtils');
const objectUtils = require('./utils/objectUtils');

fileUtils.sha1('index.js').then((result) => {
  console.log(result);
});
//
// fileUtils.traverse({
//   filePath: "C:\\Users\\Luigi\\Desktop\\temp\\.git\\COMMIT_EDITMSG",
//   onFile: function(filePath) {
//     console.log("File Base Path" + filePath);
//   },
//   onDone: function() {
//     console.log('file done');
//   }
// });
//
// fileUtils.traverse({
//   filePath: "C:\\Users\\Luigi\\Desktop\\temp",
//   onFile: function(filePath) {
//     console.log("Directory Base Path" + filePath);
//   },
//   onDone: function() {
//     console.log('dir done');
//   }
// });

// let results = {};
// fileUtils.traverse({
//   filePath: "C:\\Users\\Luigi\\Desktop\\temp",
//   onFile: (filePath) => {
//     fileUtils.sha1(filePath).then((sha1) => {
//       let key = sha1 + "_" + fileUtils.getFileSize(filePath);
//       if (!results[key]) {
//         results[key] = {
//           childPaths: []
//         };
//       }
//
//       results[key].childPaths.push(filePath);
//     });
//   },
//   onDone: () => {
//     console.log(JSON.stringify(results, null, 2));
//   }
// });

let a = {
  a: 'a',
  b: 'b',
  s: 's',
  q: 'q',
  r: 'r',
  // z: 'z',
  arr: ['a', 'b', 'c'],
  z: {
    a: 'a',
    b: 'b',
    s: 's',
    q: 'q',
    r: 'r',
    // z: 'z',
    arr: ['a', 'b', 'c'],
  },
}

let b = {
  r: 'r',
  s: 's',
  a: 'a',
  q: 'q',
  b: 'b',
  // z: 'z',
  arr: ['a', 'b', 'c'],
  z: {
    a: 'a',
    b: 'r',
    s: 's',
    q: 'q',
    r: 'r',
    // z: 'z',
    arr: ['a', 'b', 'c'],
  },
}

console.log(objectUtils.diffObject(a,b));

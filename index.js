const fileUtils = require('./utils/fileUtils');
const objectUtils = require('./utils/objectUtils');

console.log(JSON.stringify(process.argv, null, 2));

// arg 0: node exe path
// arg 1: path to run script
// arg 2: command

const command = process.argv[2];
switch(command) {
  case "map":
  const outFilePath = process.argv[3];
  (async () => {
    const results = {};
    await new Promise(resolve => {
      fileUtils.traverse({
        filePath: ".",
        onFile: async (filePath) => {
          const hash = await fileUtils.sha1(filePath);
          results[hash] = results[hash] || [];
          results[hash].push(filePath);
        },
        onDone: resolve
      });
    });
    const s = JSON.stringify(results, null, 2);
    if (!outFilePath) {
      console.log(s);
    } else {
      fileUtils.writeFile(outFilePath, s);
    }
  })();
  break;
  case "diff":
  console.log("TODO");
  break;
  case "dups":
  console.log("TODO");
  break;
  case "usage":
  console.log("TODO");
  break;
  default:
  console.log(`Invalid command "${command}"`)
}

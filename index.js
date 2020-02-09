const fileUtils = require('./utils/fileUtils');
const objectUtils = require('./utils/objectUtils');

console.log(JSON.stringify(process.argv, null, 2));

// arg 0: node exe path
// arg 1: path to run script
// arg 2: command
(async () => {

  const command = process.argv[2];
  switch(command) {
  case "map":
  const startFilePath = process.argv[3] || ".";
  const outFilePath = process.argv[4];
    const results = {};
    await new Promise(resolve => {
      fileUtils.traverse({
        filePath: startFilePath,
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
      await fileUtils.writeFile(outFilePath, s);
    }
    break;
    case "diff":
    console.log("TODO");
    break;
    case "dups":
    const inFilePath = process.argv[3];
    if (!inFilePath) {
      console.error("dups requires a file path to read from");
      process.exit(1);
    }
    const dupsMapString = await fileUtils.readFile(inFilePath);
    const dupsMap = JSON.parse(dupsMapString);
    const resultDupsMap = Object.keys(dupsMap)
    .filter(key => dupsMap[key].length > 2)
    .reduce((result, value) => {
      result[value] = dupsMap[value]
      return result;
    }, {});
    console.log(JSON.stringify(resultDupsMap, null, 2));
    break;
    case "usage":
    console.log("TODO");
    break;
    default:
    console.log(`Invalid command "${command}"`)
  }
})();

const fileUtils = require('./utils/fileUtils');
const objectUtils = require('./utils/objectUtils');

console.log(`Arguements: ${JSON.stringify(process.argv, null, 2)}`);

const map = async (startFilePath, outFilePath) => {
  const results = {};
  await new Promise(async resolve => {
    await fileUtils.traverse({
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
}

const diff = async (firstFile, secondFile) => {
  if (!firstFile) {
    console.error("diff requires a two files to read from, received none");
    process.exit(1);
  }
  if (!secondFile) {
    console.error("diff requires a two files to read from, received one");
    process.exit(1);
  }

  const firstFileString = await fileUtils.readFile(firstFile);
  const secondFileString = await fileUtils.readFile(secondFile);
  const firstArray = Object.keys(JSON.parse(firstFileString));
  const secondArray = Object.keys(JSON.parse(secondFileString));
  const diff = objectUtils.diffArray({
    firstArray,
    secondArray
  });
  console.log(JSON.stringify(diff, null, 2));
}

const dups = async (inFilePath) => {
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
}

// arg 0: node exe path
// arg 1: path to run script
// arg 2: command
(async () => {
  const command = process.argv[2];
  switch(command) {
  case "map":
  const startFilePath = process.argv[3] || ".";
  const outFilePath = process.argv[4];
  await map(startFilePath, outFilePath);
  break;
  case "diff":
  const firstFile = process.argv[3];
  const secondFile = process.argv[4];
  await diff(firstFile, secondFile);
  break;
  case "dups":
  const inFilePath = process.argv[3];
  await dups(inFilePath);
  break;
  case "usage":
  console.log("TODO");
  break;
  default:
  console.log(`Invalid command "${command}"`)
}
})();

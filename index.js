const fileUtils = require('./utils/fileUtils');
const objectUtils = require('./utils/objectUtils');

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

  console.log(JSON.stringify(results, null, 2));
})();

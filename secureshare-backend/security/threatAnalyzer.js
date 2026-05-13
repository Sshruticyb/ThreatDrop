function analyzeFile(filename) {

  let score = 0;

  let reasons = [];



  const lower =
    filename.toLowerCase();



  const dangerousExtensions = [

    ".exe",
    ".bat",
    ".cmd",
    ".scr",
    ".msi",
    ".vbs",
    ".js",
    ".jar",
    ".ps1"

  ];



  dangerousExtensions.forEach(

    (ext) => {

      if (lower.endsWith(ext)) {

        score += 40;

        reasons.push(

          `Dangerous executable extension detected (${ext})`

        );

      }

    }

  );



  return {

    score,

    reasons

  };

}



module.exports = {

  analyzeFile

};
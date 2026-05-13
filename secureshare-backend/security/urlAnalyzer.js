function analyzeURL(url) {

  let score = 0;

  let reasons = [];



  // =========================
  // SUSPICIOUS TLDs
  // =========================

  const suspiciousTLDs = [

    ".xyz",
    ".top",
    ".tk",
    ".ru"

  ];



  suspiciousTLDs.forEach((tld) => {

    if (url.includes(tld)) {

      score += 20;

      reasons.push(

        `Suspicious domain detected (${tld})`

      );

    }

  });



  // =========================
  // HTTP CHECK
  // =========================

  if (url.startsWith("http://")) {

    score += 20;

    reasons.push(

      "Uses insecure HTTP connection"

    );

  }



  // =========================
  // @ REDIRECT TRICK
  // =========================

  if (url.includes("@")) {

    score += 40;

    reasons.push(

      "Contains @ redirect trick"

    );

  }



  // =========================
  // HOMOGRAPH
  // =========================

  if (url.includes("xn--")) {

    score += 40;

    reasons.push(

      "Possible homograph attack detected"

    );

  }



  // =========================
  // FINAL LEVEL
  // =========================

  let level = "LOW";



  if (score >= 70) {

    level = "HIGH";

  } else if (score >= 40) {

    level = "MEDIUM";

  }



  return {

    score,

    level,

    reasons

  };

}



module.exports = {

  analyzeURL

};
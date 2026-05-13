const crypto = require("crypto");

const fs = require("fs");



// =========================
// SECRET KEY
// =========================

const SECRET_KEY =
  crypto
    .createHash("sha256")
    .update("THREATDROP_SECRET_KEY")
    .digest();



// =========================
// ENCRYPT FILE
// =========================

function encryptFile(filePath) {

  const iv =
    crypto.randomBytes(16);



  const cipher =
    crypto.createCipheriv(

      "aes-256-cbc",

      SECRET_KEY,

      iv

    );



  const fileData =
    fs.readFileSync(filePath);



  const encryptedData =
    Buffer.concat([

      cipher.update(fileData),

      cipher.final()

    ]);



  // SAVE ENCRYPTED FILE
  fs.writeFileSync(

    filePath,

    Buffer.concat([iv, encryptedData])

  );

}



// =========================
// DECRYPT FILE
// =========================

function decryptFile(filePath) {

  const fileData =
    fs.readFileSync(filePath);



  const iv =
    fileData.slice(0, 16);



  const encryptedData =
    fileData.slice(16);



  const decipher =
    crypto.createDecipheriv(

      "aes-256-cbc",

      SECRET_KEY,

      iv

    );



  const decrypted =
    Buffer.concat([

      decipher.update(encryptedData),

      decipher.final()

    ]);



  return decrypted;

}



module.exports = {

  encryptFile,

  decryptFile

};
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { v4: uuid4 } = require("uuid");
const analyzeFile = require("./security/threatAnalyzer");
const AccessLog = require("./models/AccessLog");
const analyzeURL = require("./security/urlAnalyzer");

const File = require("./models/file");

const app = express();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("./models/User");
const crypto = require("crypto");

const fs = require("fs");
const {

  encryptFile,

  decryptFile

} = require("./utils/encryption");
const authMiddleware =
  require("./middleware/authMiddleware");


// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {

  try {

    const { username, email, password } = req.body;



    const existingUser = await User.findOne({ email });



    if (existingUser) {

      return res.status(400).json({

        message: "User already exists"

      });

    }



    const hashedPassword = await bcrypt.hash(password, 10);



    const newUser = new User({

      username,
      email,
      password: hashedPassword

    });



    await newUser.save();



    res.status(201).json({

      message: "User registered successfully"

    });



  } catch (error) {

    console.log(error);



    res.status(500).json({

      message: "Server error"

    });

  }

});



app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;



    const user = await User.findOne({ email });



    if (!user) {

      return res.status(400).json({

        message: "Invalid credentials"

      });

    }



    const validPassword = await bcrypt.compare(

      password,

      user.password

    );



    if (!validPassword) {

      return res.status(400).json({

        message: "Invalid credentials"

      });

    }



    const token = jwt.sign(

      {

        userId: user._id

      },

      process.env.JWT_SECRET

    );



    res.json({

      token,
      username: user.username

    });



  } catch (error) {

    console.log(error);



    res.status(500).json({

      message: "Server error"

    });

  }

});


// ======================
// DATABASE CONNECTION
// ======================

mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {

  console.log("✅ Database Connected");

})

.catch((err) => {

  console.log(err);

});



// ======================
// MULTER CONFIG
// ======================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");

  },

  filename: function (req, file, cb) {

    cb(null, Date.now() + "-" + file.originalname);

  }

});

const upload = multer({ storage });



// ======================
// HOME ROUTE
// ======================

app.get("/", (req, res) => {

  res.send("🚀 ThreatDrop Backend Running");

});

function generateFileHashes(filePath) {

  const fileBuffer =
    fs.readFileSync(filePath);



  // SHA256
  const sha256 =
    crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");



  // MD5
  const md5 =
    crypto
      .createHash("md5")
      .update(fileBuffer)
      .digest("hex");



  return {

    sha256,

    md5

  };

}

// ======================
// FILE UPLOAD ROUTE
// ======================

app.post(
  "/upload",

  authMiddleware,
  
  upload.single("file"),

  async (req, res) => {
   


    try {
       const analysis = analyzeFile(
  req.file.originalname);

      const hashes =
      generateFileHashes(req.file.path);

      encryptFile(req.file.path);

      const isQuarantined =
  analysis.score >= 70;

   

      const newFile = new File({

        filename: req.file.originalname,

        path: req.file.path,

        uuid: uuid4(),

        userId: req.user.userId,

        sha256: hashes.sha256,

md5: hashes.md5,
quarantined: isQuarantined,

        expiresAt: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        )

      });
     

      await newFile.save();

      res.json({

        message: "✅ File uploaded",

        file: newFile,

        hashes,

        quarantined: isQuarantined,

        downloadLink:
         `https://threatdrop-backend.onrender.com/file/${newFile.uuid}`

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error: "Upload failed"

      });

    }

  }
);



// ======================
// FILE DOWNLOAD ROUTE
// ======================
app.get("/file-info/:uuid", async (req, res) => {

  try {

    const file = await File.findOne({

      uuid: req.params.uuid

    });

    if (!file) {

      return res.status(404).json({

        error: "File not found"

      });

    }

    // THREAT ANALYSIS
    const analysis = analyzeFile(
      file.filename
    );

    res.json({

      filename: file.filename,

      uuid: file.uuid,

      analysis

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Failed to fetch file info"

    });

  }

});

app.get("/file/:uuid", async (req, res) => {

  try {

    const file = await File.findOne({

      uuid: req.params.uuid

    });

    // FILE NOT FOUND
    if (!file) {

      return res.status(404).json({

        error: "File not found"

      });

    }

    // LINK EXPIRED
    if (new Date() > file.expiresAt) {

      return res.status(410).json({

        error: "⚠ Link expired"

      });

    }

    // DOWNLOAD FILE
    const newLog = new AccessLog({

  fileUuid: file.uuid,

  ipAddress: req.ip,

  userAgent: req.headers["user-agent"]

});


await newLog.save();
if (file.quarantined) {

  return res.status(403).json({

    error:
      "⚠ File quarantined due to security risks"

  });

}
file.downloadCount += 1;

await file.save();
    const decryptedData =
  decryptFile(file.path);



res.setHeader(

  "Content-Disposition",

  `attachment; filename="${file.filename}"`

);



res.send(decryptedData);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Download failed"

    });

  }

});

app.get("/logs/:uuid", async (req, res) => {

  try {

    const logs = await AccessLog.find({

      fileUuid: req.params.uuid

    });

    res.json(logs);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Failed to fetch logs"

    });

  }

});
app.post("/analyze-url", (req, res) => {

  try {

    const { url } = req.body;

    const analysis = analyzeURL(url);

    res.json(analysis);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "URL analysis failed"

    });

  }

});
app.post("/register", async (req, res) => {

  try {

    const {

      username,
      email,
      password

    } = req.body;



    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        error: "User already exists"

      });

    }



    const hashedPassword =
      await bcrypt.hash(password, 10);



    const newUser = new User({

      username,

      email,

      password: hashedPassword

    });

    await newUser.save();



    res.json({

      message: "Registration successful"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Registration failed"

    });

  }

});
app.post("/login", async (req, res) => {

  try {

    const {

      email,
      password

    } = req.body;



    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        error: "Invalid credentials"

      });

    }



    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );



    if (!isMatch) {

      return res.status(400).json({

        error: "Invalid credentials"

      });

    }



    const token = jwt.sign(

      {

        userId: user._id

      },

      "SECRET_KEY",

      {

        expiresIn: "1d"

      }

    );



    res.json({

      token,

      username: user.username

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Login failed"

    });

  }

});

app.get(

  "/my-files",

  authMiddleware,

  async (req, res) => {

    try {

      const files =
        await File.find({

          userId: req.user.userId

        })

        .sort({ createdAt: -1 });




      res.json(files);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error: "Failed to fetch files"

      });

    }

  }

);
app.get("/dashboard-stats", async (req, res) => {

  try {

    // =========================
    // TOTAL FILES
    // =========================

    const totalUploads =
      await File.countDocuments();




    // =========================
    // QUARANTINED FILES
    // =========================

    const quarantinedFiles =
      await File.countDocuments({

        quarantined: true

      });




    // =========================
    // TOTAL DOWNLOADS
    // =========================

    const files =
      await File.find();




    let totalDownloads = 0;



    files.forEach((file) => {

      totalDownloads +=
        file.downloadCount || 0;

    });




    // =========================
    // RECENT FILES
    // =========================

    const recentFiles =
      await File.find()

        .sort({ createdAt: -1 })

        .limit(5);




    // =========================
    // RESPONSE
    // =========================

    res.json({

      totalUploads,

      quarantinedFiles,

      totalDownloads,

      recentFiles

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Dashboard failed"

    });

  }

});
app.get(

  "/file-info/:uuid",

  async (req, res) => {

    try {

      const file =
        await File.findOne({

          uuid: req.params.uuid

        });



      if (!file) {

        return res.status(404).json({

          error: "File not found"

        });

      }



      res.json(file);

    } catch (error) {

      console.log(error);

    }

  }

);
app.delete(

  "/delete-file/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const file =
        await File.findById(

          req.params.id

        );



      if (!file) {

        return res.status(404).json({

          error: "File not found"

        });

      }



      // ONLY OWNER CAN DELETE

      if (

        file.userId.toString()

        !==

        req.user.userId

      ) {

        return res.status(403).json({

          error: "Unauthorized"

        });

      }



      // DELETE PHYSICAL FILE

      if (

        fs.existsSync(file.path)

      ) {

        fs.unlinkSync(file.path);

      }



      // DELETE DB ENTRY

      await File.findByIdAndDelete(

        req.params.id

      );



      res.json({

        message:

          "File deleted successfully"

      });

    } catch (error) {

      console.log(error);



      res.status(500).json({

        error:

          "Delete failed"

      });

    }

  }

);

// ======================
// START SERVER
// ======================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

});
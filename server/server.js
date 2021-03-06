require("dotenv").config();
const express = require("express");
const app = express(); // create express app
const path = require("path");
const serveStatic = require("serve-static");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const header = { "Content-Type": "application/json" };
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt")
const fs = require('fs')
const multer = require("multer")
const { spawn } = require("child_process")
const storage = multer.diskStorage({
  destination: function(req, file, done){
    done(null, 'temp/')
  },
  filename: function(req, file, done){
    console.log(file.originalname)
    done(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})
const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@a3.xvhzl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();
app.set("trust proxy", 1);
app.use(bodyParser.json({ limit: "50mb" }));

const userReg = (username, password, email, name) => {
  return new Promise((resolve, reject) => {
    console.log(username, password, email);
    if (!username || !password || !email || !name) {
      resolve({
        error: "Missing Fields",
      });
    }
    const collection = client
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION);
    collection
      .findOne({ username: username })
      .then((result) => {
        if (!!result) {
          resolve({
            error: "User Exists",
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              console.log(err);
              reject({
                error: "Salt Error",
              });
            } else {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  console.log(err);
                  reject({
                    error: "Encryption Error",
                  });
                } else {
                  const user = {
                    username,
                    email,
                    password: hash,
                    name,
                    songs: []
                  };

                  collection
                    .insertOne(user)
                    .then((result) => {
                      console.log("Insert");
                      console.log(result.ops[0]);
                      resolve(result.ops[0]);
                    })
                    .catch((err) => {
                      console.log(err);
                      reject({
                        error: "Could Not Add User",
                      });
                    });
                }
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        reject({
          error: "Issue with MongoDB",
          systemError: err,
        });
      });
  });
};
const userLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      resolve({
        error: "Missing Fields",
      });
    } else {
      const collection = client
        .db(process.env.DB_NAME)
        .collection(process.env.DB_COLLECTION);
      collection
        .findOne({ username: username })
        .then((result) => {
          if (!result) {
            resolve({
              error: "No User Exists",
            });
          } else {
            bcrypt
              .compare(password, result.password)
              .then((loggedIn) => {
                resolve(result);
              })
              .catch((err) => {
                resolve({
                  error: "Incorrect Password",
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          reject({
            error: "Issue with the DB Query",
          });
        });
    }
  });
};

app.use(
  session({
    secret: "bionicle",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((userId, done) => {
  client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION)
    .findOne({ _id: ObjectId(userId) })
    .then((user) => {
      if (!!user) {
        done(null, user);
      } else {
        done({ error: "User Not Found" }, null);
      }
    })
    .catch((err) => {
      console.log(err);
      done(err, false);
    });
});

passport.use(
  "local-registration",
  new LocalStrategy({ passReqToCallback: true, session: true }, function (
    req,
    username,
    password,
    done
  ) {
    userReg(username, password, req.body.email, req.body.name)
      .then((result) => {
        if (result.error) {
          done(
            {
              error: result.error,
            },
            null
          );
        } else {
          done(null, result);
        }
      })
      .catch((err) => {
        console.log(err);
        done(
          {
            error: "Server Issue",
            systemError: err,
          },
          null
        );
      });
  })
);

passport.use(
  "local-login",
  new LocalStrategy({ passReqToCallback: true, session: true }, function (
    req,
    username,
    password,
    done
  ) {
    userLogin(username, password)
      .then((result) => {
        if (result.error) {
          done(
            {
              error: result.error,
            },
            null
          );
        } else {
          done(null, result);
        }
      })
      .catch((err) => {
        console.log("DB Issue");
        console.log(err);
        done(
          {
            error: "Issue with Mongo",
            systemError: err.error,
          },
          null
        );
      });
  })
);

app.post("/login", function (req, res, next) {
  if (!req.body.password || !req.body.username) {
    res.writeHead(400, { header });
    res.end(
      JSON.stringify({
        errorMessage: "Invalid Registration",
        error: "Missing Fields",
        errorCode: 400,
      })
    );
  } else {
    passport.authenticate(
      "local-login",
      {
        session: true,
      },
      function (err, user, info) {
        if (err) {
          if (err.systemError) {
            res.writeHead(500, { header });
            res.end(
              JSON.stringify({
                errorMessage: "There was an issue with the server",
                error: err.systemError,
                errorCode: 500,
              })
            );
          } else {
            res.writeHead(400, { header });
            res.end(
              JSON.stringify({
                errorMessage: "Invalid Login",
                error: err.error,
                errorCode: 400,
              })
            );
          }
        } else {
          req.login(user, function (err) {
            if (err) {
              console.log(err);
              res.writeHead(500);
              res.end(
                JSON.stringify({
                  errorMessage: "Session Issue",
                  error: err,
                  errorCode: 500,
                })
              );
            }
            // res.redirect("/index.html")
            res.end(JSON.stringify({ Success: "YeetLogin" }));
          });
        }
      }
    )(req, res, next);
  }
});

app.post("/register", (req, res, next) => {
  if (!req.body.password || !req.body.username || !req.body.email || !req.body.name) {
    res.writeHead(400, { header });
    res.end(
      JSON.stringify({
        errorMessage: "Invalid Registration",
        error: "Missing Fields",
        errorCode: 400,
      })
    );
  } else {
    passport.authenticate(
      "local-registration",
      {
        session: true,
      },
      function (err, user, info) {
        if (err) {
          if (err.systemError) {
            res.writeHead(500, { header });
            res.end(
              JSON.stringify({
                errorMessage: "There was an issue with the server",
                error: err.systemError,
                errorCode: 500,
              })
            );
          } else {
            res.writeHead(400, { header });
            res.end(
              JSON.stringify({
                errorMessage: "Invalid Registration",
                error: err.error,
                errorCode: 400,
              })
            );
          }
        } else {
          req.login(user, function (err) {
            if (err) {
              console.log(err);
              res.writeHead(500);
              res.end(
                JSON.stringify({
                  errorMessage: "Session Issue",
                  error: err,
                  errorCode: 500,
                })
              );
            }
            res.writeHead(200);
            res.end(JSON.stringify({ Success: "YeetLogin" }));
          });
        }
      }
    )(req, res, next);
  }
});

app.post("/logout", (req, res) => {
  req.logout();
  res.writeHead(200);
  res.end(JSON.stringify({ Success: "Logout" }));
});

app.get("/songs", (req,res) => {
  if(req.user){
    const collection = client
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION);
      collection.findOne({ _id: ObjectId(req.user._id)}).then(result => {
        if(!!result){
          res.writeHead(200, { header })
          res.end(JSON.stringify({
            songs: result.songs
          }))
        }
        else {
          res.writeHead(403, { header })
          res.end(JSON.stringify({error: "No Such User Exists"}));
        }
      })
  }
  else {
    res.writeHead(403, { header })
    res.end(JSON.stringify({error: "You are not logged in"}));
  }
})

app.post("/uploadXML", upload.single('xmlFile'), (req, res) => {
  if(req.user){
    if(req.file.path){
      parseXML(req.file.path).then((result) => {
        fs.unlink(req.file.path, (err) => {
          if(err){
            console.log(err)
            res.writeHead(500)
            res.end(JSON.stringify({
              error: err
            }))
          }
          else {
              const collection = client
              .db(process.env.DB_NAME)
              .collection(process.env.DB_COLLECTION);
    
              collection.updateOne({ _id: ObjectId(req.user._id) }, {
                $push: {
                  songs: {
                    songName: req.body.songName,
                    abcString: result
                  }
                }
              }).then((success) => {
                res.writeHead(200)
                res.end(JSON.stringify({
                  Success: "File Uploaded",
                  abcString: result
                }))
              })
            
          }
        })
        
      })
      .catch((err) => {
        fs.unlink(req.file.path, (error) => {
          if(error){
            console.log(error)
          }
          res.writeHead(500)
          res.end(JSON.stringify({
            error: err
          }))
        })
      })
    }
    else {
      res.writeHead(400, { header })
      res.end(JSON.stringify({error: "Bad File"}));
    }
  }
  else {
    res.writeHead(403, { header })
    res.end(JSON.stringify({error: "You are not logged in"}));
  }
})
// Running a python script in the console

const parseXML = (filePath) => {
  let xmlParseResult = '';
  return new Promise((resolve) => {
    const python = spawn('python3', ['./lib/xml2abc.py', filePath])
    python.stdout.on('data', function(data) {
      console.log("success")
        xmlParseResult += data.toString()
    })
    python.on('close', (code) => {
      const final = xmlParseResult.trim()
      resolve(final)
    })
  })
}

app.get('/authStatus', (req, res) => {
  res.writeHead(200, {
      header
  })
  res.end(JSON.stringify({
      authStatus: req.isAuthenticated()
  }))
})

app.use(
  serveStatic(path.join(__dirname, "..", "build"), {
    index: "index.html",
    extensions: ["html"],
  })
);

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'build/index.html'))
})
// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
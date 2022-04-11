const express = require("express");
const UsersBL = require("../Models/UsersBL.js");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/UsersModel.js");
const passport = require("passport");
const utils = require("../lib/utils");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
    if(err) {
      next(err);
    };}
  
);

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  User.findOne({ Username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of utils.js, validate the password with crypto hash and salt.
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          user : user,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,

        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Register a new subscriber
router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    Username: req.body.username,
    hash: hash,
    salt: salt,
    Name : req.body.name,
    Email : req.body.email,
    Street : req.body.street,
    City : req.body.city,
    Zipcode: req.body.zipcode,
  });

  try {
    newUser.save().then((user) => {
      const jwt = utils.issueJWT(user)
      res.json({ success: true, user: user, token: jwt.token ,expiresIn: jwt.expires });
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (async function (req, resp) {
    let data = await UsersBL.getAllUsers();
    return resp.json(data);
  })
);


router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (async function (req, resp) {
    let id = req.params.id;  
    let data = await UsersBL.getUserbyID(id);
    return resp.json(data);

  })
);





router.put(
  '/:id',
  passport.authenticate("jwt", { session: false }),
  (async (req, res) => {
    let id = req.params.id;  
    let UserObj = req.body;  
    let status = await UsersBL.UpdateUser(id,UserObj)
    return res.json(status)
    })
)



router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, resp) {
    let Userobj = req.body;
    let status = await UsersBL.addUser(Userobj);
    return resp.json(status);
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function (req, resp) {
    var ID = req.params.id;
    let status = await UsersBL.deleteUser(ID);
    return resp.json(status);
  }
);



module.exports = router;
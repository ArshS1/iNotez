const express = require("express");
const router = express.Router();
const user = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// env file
const jwtBody = "dontShareThis";

const { body, validationResult } = require("express-validator");

// the [] is for validation purposes for Login details
// /api/auth/createuser -- end point
router.post(
  "/createuser",
  [
    // name
    body("name", "Name must be 5 characters").isLength({ min: 5 }),

    // username must be an email
    body("email", "Email must be valid").isEmail(),

    // password must be at least 5 chars long
    body("password", "Password must have 7 letters").isLength({ min: 7 }),
  ],
  async (req, res) => {
    let success = false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() }); // return errors in case of bad request
    }
    // try to create a user first then throw error if present
    try {
      let User = await user.findOne({ email: req.body.email });
      if (User) {
        return res.status(400).json({ success, error: "Email already in Use." }); // return errors in case of bad request
      }

      // use bcrypt to generate a secure password
      const salt = await bcrypt.genSalt(10);
      const safePassword = await bcrypt.hash(req.body.password, salt);

      User = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: safePassword,
      });

      // send the data and the secret
      const info = {
        user: {
          id: user.id,
        },
      };
      const authData = jwt.sign(info, jwtBody);
      success = true; 

      res.json({success, authData});
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// the [] is for validation purposes for Login details
// /api/auth/login -- end point
router.post(
  "/login",
  [
    // username must be an email
    body("email", "Email must be valid").isEmail(),

    // password must be at least 5 chars long
    body("password", "Password must have 7 letters").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // return errors in case of bad request
    }

    const { email, password } = req.body;

    try {
      let success = false; 
      let User = await user.findOne({ email });
      if (!User) {
        success = false; 
        return res
          .status(400)
          .json(success, { error: "Check credentials and try again." });
      }
      const check = await bcrypt.compare(password, User.password);
      if (!check) {
        success = false; 
        return res
          .status(400)
          .json(success, { error: "Check credentials and try again." });
      }
      // automatically send data if credentials are correct
      const info = {
        user: {
          id: User.id,
        },
      };
      const authData = jwt.sign(info, jwtBody);
      success = true; 
      res.json({success, authData});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// the [] is for validation purposes for Login details
// /api/auth/getuser -- end point
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    idUser = {
      User: {
        id: req.user.id
      }
    };
    const User = await user.findOne(idUser).select("-password");
    res.send(User);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// send router to be used by other functions
module.exports = router;

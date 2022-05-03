const jwt = require("jsonwebtoken");
const jwtBody = "dontShareThis";

const fetchUser = (req, res, next) => {
  const key = req.header("auth-token");
  if (!key) {
    res.status(401).send({ error: "Please authenticate with a valid token." });
  }
  try {
    const value = jwt.verify(key, jwtBody);
    req.user = value.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with a valid token." });
  }
};

module.exports = fetchUser;

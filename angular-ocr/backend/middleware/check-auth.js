const jwt = require("jsonwebtoken");
const SECRET = '@AdemaxDemoByWindSora';
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET);
    req.userData = {user: decodedToken};
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed!"});
  }
};


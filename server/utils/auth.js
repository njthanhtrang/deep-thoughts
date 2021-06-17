const jwt = require("jsonwebtoken");

// enables server to verify whether it recognizes this token, nothing to do with encoding
// store secret in .env
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // user obj adds username, email, _id to token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token, return request obj as is
    if (!token) {
      return req;
    }

    // don't want error on every req, can request and see all thoughts with invalid token
    // try catch mutes the error thrown with failing JWT verification
    try {
      // decode and attach user data to request obj
    //   if secret on jwt.verify() doesn't match secret used in jwt.sign(), obj won't be decoded
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return updated request obj
    return req;
  },
};

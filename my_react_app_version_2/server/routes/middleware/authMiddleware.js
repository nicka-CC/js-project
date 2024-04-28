import jwt from "jsonwebtoken";

export const authCheckMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    res.status(401).json({ ok: false, message: "Unauthorized" }).send();

  if (authorization) {
    let token = authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, "MY_SECRET_KEY", (err, result) => {
        if (err) res.status().json({ ok: false, message: "error" }).send();
        if (result) {
          req.hey = "Hey alo";
          next();
        }
      });
    }
  }
};

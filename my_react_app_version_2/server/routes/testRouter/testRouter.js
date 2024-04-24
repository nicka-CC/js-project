import { message } from "antd";
import express from "express";
import jwt from "jsonwebtoken"; // Import the whole package
import bcryptjs from "bcryptjs";

const { sign } = jwt; // Destructure the 'sign' method for token generation
const router = express.Router();
const authCheckMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401); // No authorization header
  let token = authorization.split(" ")[1]; // Correctly split the authorization header
  if (!token) return res.sendStatus(401); // No token found after 'Bearer'
  jwt.verify(token, "MY_SECRET_KEY", (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ ok: false, message: "Token verification failed" });
    }
    if (result) {
      return res.json({ ok: false, message: "Token verification" });
    }
  });
};

// Middleware to check if the id parameter is "22"
const testMiddleware = (req, res, next) => {
  let { id } = req.params;
  if (id && id === "22") {
    next();
  } else {
    res.sendStatus(500); // Send a server error status if the condition is not met
  }
};

// Basic route
router.get("/", (req, res) => {
  res.json({ ok: true, message: "is path /" });
});

// Route with parameter validation using middleware
router.post("/test_params/:id", testMiddleware, (req, res) => {
  res.json({
    ok: true,
    message: "is path /test_params with id",
    query: req.params,
  });
});

// Route to demonstrate handling of query parameters
router.post("/test_query", (req, res) => {
  res.json({ ok: true, message: "Received query parameters", body: req.query });
});

// Route to demonstrate handling of request body
router.post("/test_body", (req, res) => {
  res.json({ ok: true, message: "Received body data", params: req.body });
});

// Route to generate a JWT for a user
router.get("/test_getToken", (req, res) => {
  let user = {
    id: 1,
    login: "test_login",
    name: "Author",
  };
  let token = sign(user, "MY_SECRET_KEY", { expiresIn: "1d" }); // Token expires in 30 seconds
  res.json({ ok: true, token });
});

//hash password
router.post("/test_hash_password", async (req, res) => {
  const { password } = req.body;
  let hashed_password = await bcryptjs.hash(password, 3);

  res.json({ ok: true, hash: hashed_password });
});

//has password compared
router.post("/test_hash_password_check", async (req, res) => {
  const { password, hash } = req.body;
  let compare = await bcryptjs.compare(password, hash);

  res.json({ ok: true, compare });
});

//check is auth with Middleware
router.get("/test_verify", authCheckMiddleware, (req, res) => {
  res.json({ ok: true, message: "token verifyed" }).send();
});

export default router;

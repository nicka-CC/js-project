import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();
router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  if (email && name && password) {
    let candidat = await prisma.user.findUnique({
      email: email,
    });
  }
});
router.get("register", (req, res) => {
  return res.json({ ok: true }).send;
});
router.post("login", (req, res) => {});
export default router;

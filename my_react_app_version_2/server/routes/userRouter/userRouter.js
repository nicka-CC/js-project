import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
const router = express.Router();
const prisma = new PrismaClient();

import multer from "multer";
router.use(bodyParser.json());
export const uploadFiles = multer({ dest: "./uploads/" });
router.post("/upload-avatar", uploadFiles.single("file"), async (req, res) => {
  const { user } = req.body;
  if (req.file && user) {
    let _user = JSON.parse(user);

    const candidate = await prisma.user.findUnique({
      where: {
        email: _user.email,
      },
    });
    if (candidate) {
      let _upd_user = await prisma.user.update({
        data: {
          avatar: req.file.filename || "",
        },
        where: {
          email: _user.email,
        },
      });
      console.log("🚀 ~ router.post ~ _upd_user:", _upd_user);
    }
  }
  res.json({ ok: true }).send();
});
router.post("/update-username", async (req, res) => {
  const { email, newName } = req.body;

  if (!email || !newName) {
    return res
      .status(400)
      .json({ error: "Email and newUsername are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { name: newName },
    });

    console.log("Updated user:", updatedUser);
    res.json({ ok: true, message: "Username updated successfully." });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
router.post("/update-number", async (req, res) => {
  const { email, newNumber } = req.body;

  if (!email || !newNumber) {
    return res.status(400).json({ error: "Email and newNumber are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { number: newNumber },
    });

    console.log("Updated user:", updatedUser);
    res.json({ ok: true, message: "Username updated successfully." });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
router.post("/update-login", async (req, res) => {
  const { email, newEmail } = req.body;

  if (!email || !newEmail) {
    return res.status(400).json({ error: "Email and newNumber are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { email: newEmail },
    });

    console.log("Updated user:", updatedUser);
    res.json({ ok: true, message: "Username updated successfully." });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
export default router;

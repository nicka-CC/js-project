import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/reg", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    prisma.$connect();
    let alreadyCreatedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (alreadyCreatedUser)
      res.status(409).json({
        ok: false,
        message: "Пользователь с таким Email уже существует",
      });

    let hashed_pwd = await bcryptjs.hash(password, 3);

    let user = undefined;

    user = await prisma.user.create({
      data: {
        email,
        name: name,
        password: hashed_pwd,
      },
    });

    prisma.$disconnect();

    res.json({ ok: true, result: user });
  } catch (error) {
    res.status(500).json({ ok: false, result: undefined, errMsg: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    prisma.$connect();
    let candidate = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!candidate)
      return res
        .status(200)
        .json({ ok: false, message: "Данные введены неверно" });

    let compare_pwd = await bcryptjs.compare(password, candidate.password);

    // Обработчик
    if (!compare_pwd)
      return res
        .status(200)
        .json({ ok: false, message: "Данные введены неверно" });

    let _user = candidate;
    delete _user.password;

    let token = jwt.sign(_user, "MY_SECRET_KEY", { expiresIn: "1d" });
    prisma.$disconnect();
    return res.json({ ok: true, user: _user, token });
  } catch (error) {
    res.status(500).json({ ok: false, result: undefined, errMsg: error });
  }
});

export default router;

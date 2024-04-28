import express from "express";
import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import axios from "axios";
import { parseLecture } from "../../services/postParseUtils.js";
import { authCheckMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  let posts = await prisma.posts.findMany({
    select: {
      id: true,
      author_id: true,
      attachments: true,
      text: true,
      text_raw: true,
      create_date: true,
      comments: {
        select: {
          id: true,
          u_id: true,
          users: true,
        },
      },
      likes: true,
    },
  });
  res.json({ ok: true, result: posts });
});

router.post("/parse", authCheckMiddleware, async (req, res) => {
  const { url } = req.body;

  let lectures = await parseLecture(url);

  res.json({ ok: true, result: lectures });
});

export default router;

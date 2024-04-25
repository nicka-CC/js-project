import express from "express";
import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import axios from "axios";

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

router.post("/parse", async (req, res) => {
  const { url } = req.body;

  let data = "";
  await axios
    .get("https://rasp.pskgu.ru/groups/043206.html")

    .then((response) => {
      if (response.status == 200) {
        data = response.data;
      }
    });

  // console.log("🚀 ~ router.post ~ data:", data)

  let $ = cheerio.load(data);

  let weeks = $(".week");

  let structure_res = {};

  let structure = [];
  weeks.map((week) => {
    let main_ = {};
    // console.log("🚀 ~ router.post ~ week:", week)
    let weekNumber = week + 1;

    let current_week = $(weeks[week]);

    let current = cheerio.load(current_week.html());
    let table_rows = current(".table tbody tr");

    // let day = []
    // let l = []

    table_rows.map((row, index) => {
      if (["length", "option", "_root", 0, 1].includes(row)) return "";

      let current_row = cheerio.load(table_rows[row]);
      let columns = current_row("td");

      let dayName = "";
      let _l = [];
      let _t = [];

      let time_row = cheerio.load(table_rows[1]);
      let time_columns = time_row("td");

      time_columns.map((time) => {
        let current_t_column = cheerio.load(time_columns[time]);
        if (time === 0) return "";
        let current_time = current_t_column("b").text();
        _t.push(current_time);
      });

      columns.map((column) => {
        let current_column = cheerio.load(columns[column]);
        if (column === 0) {
          dayName = current_column("b").text();

          if (weekNumber in main_) {
            main_[weekNumber] = {
              ...main_[weekNumber],
              [dayName]: {
                ...main_[weekNumber][dayName],
              },
            };
          } else {
            main_[weekNumber] = {
              [dayName]: {},
            };
          }
        } else {
          let nameWithHtml = current_column("div").html();

          let nameWithHtmlSplited =
            (nameWithHtml && nameWithHtml.split("<br>")) || [];
          let lectureInfo = {
            name:
              nameWithHtmlSplited.length == 4
                ? nameWithHtmlSplited[0] + nameWithHtmlSplited[1]
                : nameWithHtmlSplited[0] || "",
            teacher:
              nameWithHtmlSplited.length == 4
                ? nameWithHtmlSplited[2]
                : nameWithHtmlSplited[1] || "",
            classroom:
              nameWithHtmlSplited.length == 4
                ? nameWithHtmlSplited[3]
                : nameWithHtmlSplited[2] || "",
          };
          _l.push(lectureInfo);
        }
      });

      main_[weekNumber] = {
        weekNumber,
        ...main_[weekNumber],

        [dayName]:
          // {
          _t.map((time_map, index) => {
            return {
              time: time_map,
              lecture: _l[index],
            };
          }),
        // }
      };
    });

    structure.push(main_);
  });

  // let weekNumber = $('.week #namweek b').text()
  // console.log("🚀 ~ router.post ~ weekNumber:", typeof weekNumber)
  // // $('.week #namweek b')[0].innerText

  res.json({ ok: true, result: structure });
});

export default router;

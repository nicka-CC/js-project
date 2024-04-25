import express from "express";
import testRouter from "./routes/testRouter/testRouter.js";
import postRouter from "./routes/postRouter/postRouter.js";
import authRouter from "./routes/authRouter/authRouter.js";
import cors from "cors";
const app = express();

const PORT = 3555;

//нужно использовать до остальных роутов
app.use(cors());
app.use(express.json());

app.use("/test/", testRouter);
app.use("/post/", postRouter);
app.use("/auth/", authRouter);
app.listen(PORT, () => {
  console.log(`server started, port ${PORT}`);
});

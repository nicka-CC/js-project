import express from "express";
import router from "./routes/testRouter/testRouter.js";
import cors from "cors";
const app = express();

const PORT = 3555;

//нужно использовать до остальных роутов
app.use(express.json());
app.use(cors());

app.use("/", router);
app.listen(PORT, () => {
  console.log(`server started, port ${PORT}`);
});

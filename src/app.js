import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import router from "./routes/user.routes.js";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(cors("*"));
app.use(express.static("public"));
// app.use(express.json({ limit: "16kb" }))
// app.use(express.urlencoded({ extended: true, limit: "16kb" }))
// app.use(express.static("public"))
// app.use(cookieparser())

// routes declaration
app.use(express.json());
// app.use('/' ,(req,res) => {
//     res.send("hi I'm working!");
// })

app.use("/api/v1/users", router);

app.get("/health", (req, res) => {
  try {
    res.send("OK");
  } catch (error) {
    res.send("FAIL");
  }
});

connectDB();
try {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}

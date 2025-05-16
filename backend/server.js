import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config({ path: "/Users/youngjaekim/Desktop/pern/.env" });

const app = express();
const PORT = process.env.PORT;

// ------------- MIDDLEWARE-----------------
// It enables send JSON TYPE DATA - Q
app.use(express.json());
// Cors - prevent the cors error
app.use(cors());
// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet());
//log the request
app.use(morgan("dev"));
// ------------------------------------------

app.get("/test", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is Running in ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "/Users/youngjaekim/Desktop/pern/.env" });

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running in ${PORT}`);
});

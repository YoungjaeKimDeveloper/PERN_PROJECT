import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// ROUTES
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config({ path: "/Users/youngjaekim/Desktop/pern/.env" });

// Singleton Instance - 하나만 생성함
// 이건 express자체를 의미함
const app = express();
const PORT = process.env.PORT || 3000;

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

// // apply arcjet rate-limit to all routes
// app.use(async (req, res, next) => {
//   try {
//     const decision = await aj.protect(req, {
//       requested: 1,
//     });

//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         return res.status(429).json({ error: "Too many request" });
//       } else if (decision.reason.isBot()) {
//         return res.status(403).json({ error: "Bot access denied" });
//       } else {
//         return res.status(403).json({ error: "Forbidden" });
//       }
//     }
//     // check for spoofed bots
//     if (
//       decision.results.some(
//         (result) => result.reason.isBot() && result.reason.isSpoofed()
//       )
//     ) {
//       return res.status(403).json({ error: "Spoofed bot detected" });
//     }
//     next();
//   } catch (error) {
//     console.log("Arcjet error");
//     next(error);
//   }
// });

// BASE ROUTER - app.use(Routing - what is the meaning of use?)
// Mounting way
app.use("/api/products", productRoutes);

//------------- Connect DB-------------
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("DB CONNECTED✅");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

initDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is Running in ${PORT}`);
  })
);

import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";

// express에서 Router기능만 사용하게되는거임
// Router로 하나의 라우터 모듈을 만들어냄
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
export default router;

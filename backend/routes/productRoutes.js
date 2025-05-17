import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

// express에서 Router기능만 사용하게되는거임
// Router로 하나의 라우터 모듈을 만들어냄
const router = express.Router();

// Get All Posts
router.get("/", getAllProducts);
// Get a post
router.get("/:id", getProduct);
// Create a post
router.post("/", createProduct);
// update product
router.put("/:id", updateProduct);
// delete product
router.delete("/:id", deleteProduct);
export default router;

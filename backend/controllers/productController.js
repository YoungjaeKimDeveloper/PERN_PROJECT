/*
  API  Frontend <---> API <----> DATA[neon]

  CRUD
*/
import { sql } from "../config/db.js";
// fetch All Products
export const getAllProducts = async (req, res) => {
  // GRAB THE DATA FROM DB
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;
    // After fetch the Data, return the data
    console.log("fetched products", products);
    return res.status(200).json({ success: true, data: products });
  } catch (e) {
    console.error("FAILED TO FETCH ALL PRODUCTS");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// fetch single product - error
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * 
    FROM products
    WHERE id = ${id}
    `;

    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.error("FAILED TO getProduct ");
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// create new product
export const createProduct = async (req, res) => {
  // Data from user
  const { name, image, price } = req.body;
  // Validation - API
  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all forms" });
  }
  try {
    // INSERT THE DATA
    const newProduct = await sql`
    INSERT INTO products (name,image,price)
    VALUES (${name},${image},${price})
    RETURNING *
    `;
    // TEST WITH POSTMAN
    return res.status(201).json({
      success: true,
      data: newProduct[0],
      message: "New Product has been created successfully✅",
    });
  } catch (error) {
    console.error("❌ERROR IN CREATING NEW POST: ", error.message);
    return res
      .status(500)
      .json({ message: `Internal Server Error:${error.message} ` });
  }
};

// update a product
export const updateProduct = async (req, res) => {
  // user Id
  const { id } = req.params;
  // User data
  const { name, image, price } = req.body;
  // Validation - ID - 1
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }
  // Validation - No filed -2
  if (!name && !image && !price) {
    return res
      .status(400)
      .json({ success: false, message: "No fields provided for update" });
  }
  // 실제 아이템 찾아주기
  const existedProduct = await sql`
    SELECT *
    FROM products
    WHERE id = ${id}
    `;

  // AFTER VALIDATION - UPDATE THE DATA
  try {
    const updatedPost = await sql`
      UPDATE products
      SET
        name = ${name},
        image = ${image},
        price = ${price}
      WHERE id = ${id}
    RETURNING *
    `;
    // CHECK THE UPDATED POST
    if (updatedPost[0] == null) {
      return res
        .status(404)
        .json({ success: false, message: "CANNOT FIND THE POST" });
    }
    return res.status(201).json({ success: true, data: updatedPost[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error:${error.message} ` });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, message: "ID is required" });
  }
  try {
    const deletedProduct = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING * 
    `;
    console.log("deletedProduct:", deletedProduct);
    if (deletedProduct[0] == null) {
      return res
        .status(404)
        .json({ success: false, message: "POST CANNOT FIND" });
    }
    return res.status(200).json({
      success: true,
      message: "POST DELETED SUCCESSFULLY",
      data: deletedProduct[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error:${error.message} ` });
  }
};

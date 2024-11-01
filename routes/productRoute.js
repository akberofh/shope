import express from "express";
import { userControlAuth } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { addUserProduct, deleteUserProduct, getUserProduct } from "../controllers/productController.js";



const router = express.Router();

router.post('/', userControlAuth,upload.single('photo'), addUserProduct);
router.get('/', userControlAuth, getUserProduct);
router.delete('/:id', userControlAuth, deleteUserProduct);

export default router;

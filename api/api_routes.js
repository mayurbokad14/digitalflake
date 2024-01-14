import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./Controller/Category.js";
import { addProduct, deleteProduct, getProducts, updateProduct } from "./Controller/Product.js";

import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'product', 'images');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(6).toString('hex');
        const ext = path.extname(file.originalname);
        const hashName = `${uniqueSuffix}${ext}`;
        cb(null, hashName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 200000 }, // Max file size: 200 KB
});

router.get("/categories", getCategories);
router.put("/category", updateCategory);
router.post("/category", createCategory);
router.delete("/category", deleteCategory);

router.get("/products",getProducts);
router.put("/product",updateProduct);
router.post("/product",upload.single('image'),addProduct);
router.delete("/product",deleteProduct);

export default router;
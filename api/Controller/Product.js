import categoryModel from "../models/category.cjs";
import productModel from "../models/product.cjs";
import sequelize from "../config_db.js";
import { DataTypes } from "sequelize";



const Category = categoryModel(sequelize,DataTypes);
const Product = productModel(sequelize, DataTypes);

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });



const getProducts = async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const offset = (page - 1) * pageSize;

        const products = await Product.findAndCountAll({
            offset,
            limit: parseInt(pageSize),
            include: [{ model: Category, as: 'category', attributes: ['name'] }],
          });
      
          return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addProduct = async (req, res) => {
    // try {
    //     const { name, packsize, categoryId, MRP, image, isActive } = req.body;

    //     // Validation
    //     if (!name || !packsize || !categoryId || !MRP) {
    //         return res.status(400).json({ error: 'Name, packsize, categoryId, and MRP are required fields' });
    //     }

    //     const newProduct = await Product.create({ name, packsize, categoryId, MRP, image, isActive });

    //     return res.status(201).json(newProduct);
    // } catch (error) {
    //     console.error('Error creating product:', error);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    // }

    
    try {
        const { name, packsize, categoryId, MRP, isActive } = req.body;
        const imagePath = req.file ? `/product/images/${req.file.filename}` : null;

        // Validate request body
        if (!name || !packsize || !categoryId || !MRP) {
            return res.status(400).json({ error: 'Name, packsize, categoryId, and MRP are required fields' });
        }

        const newProduct = await Product.create({
            name,
            packsize,
            categoryId,
            MRP,
            image: imagePath, // Save the full image path including file hash and original extension
            isActive,
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, packsize, categoryId, MRP, image, isActive } = req.body;

        // Validation
        if (!name || !packsize || !categoryId || !MRP) {
            return res.status(400).json({ error: 'Name, packsize, categoryId, and MRP are required fields' });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.name = name;
        product.packsize = packsize;
        product.categoryId = categoryId;
        product.MRP = MRP;
        product.image = image;
        product.isActive = isActive;

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();

        return res.status(204).send(); // No content on successful deletion
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export  {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts
};
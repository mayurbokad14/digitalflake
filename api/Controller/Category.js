import categoryModel from "../models/category.cjs";
import sequelize from "../config_db.js";
import { DataTypes } from "sequelize";

const Category = categoryModel(sequelize,DataTypes);

const createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    // Validate request body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }    

    const newCategory = await Category.create({ name, description, isActive });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const categories = await Category.findAll({
      offset,
      limit: parseInt(pageSize),
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description, isActive } = req.body;

    // Validate request body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;
    category.description = description;
    category.isActive = isActive;

    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();

    return res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};
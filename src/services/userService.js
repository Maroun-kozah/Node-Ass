const Category = require('../models/Category');

exports.getAllCategories = async () => {
    try {
        return await Category.find();
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.getClientComplaintCategories = async (page, limit) => {
    try {
        const categories = await Category.find()
            .skip((page - 1) * limit)
            .limit(limit);
        return categories;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getClientComplaintCategoryDetails = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.addComplaintCategory = async (categoryData) => {
    try {
        const category = new Category(categoryData);
        await category.save();
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateComplaintCategory = async (categoryId, newData) => {
    try {
        const category = await Category.findByIdAndUpdate(categoryId, newData, { new: true });
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteComplaintCategory = async (categoryId) => {
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        return { message: 'Category deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};



exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
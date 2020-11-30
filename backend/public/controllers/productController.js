var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from '../models/ProductModel.js';
// @desc Get all Products
// @route GET /api/products
// @access public
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
// @desc Get Product by id
// @route GET /api/products/:id
// @access public
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product.findById(req.params.id);
        res.json(products);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
// @desc Create a Products
// @route POST /api/products
// @access private
const createproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category, image, rating, description, } = req.body;
        const product = new Product({
            name, price, user: req.user._id, image, category, rating, description,
        });
        const createdProduct = yield product.save();
        res.json(createdProduct);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
// @desc Create a Products
// @route POST /api/products/:id
// @access private
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user.isAdmin) {
            const { name, price, category, image, rating, description, } = req.body;
            const product = yield Product.findById(req.params.id);
            if (product !== null) {
                product.name = name || product.name;
                product.price = price || product.price;
                product.category = category || product.category;
                product.image = image || product.image;
                product.rating = rating || product.rating;
                product.description = description || product.description;
            }
            const updatedProduct = yield (product === null || product === void 0 ? void 0 : product.save());
            res.json(updatedProduct);
        }
        else {
            res.status(401).json({ error: 'Unauthorized, token failed' });
        }
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
// @desc Delete single product
// @route DELETE /api/products/:id
// @access private/admin
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product.findById(req.params.id);
    if (product) {
        yield product.remove();
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404).json({ error: 'Product not found' });
    }
});
export { getProducts, createproduct, getProductById, updateProduct, deleteProduct, };

const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc Gets all products
// @route GET /api/products

async function getProducts(req, res) {
	try {
		const products = await Product.findAll();
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
}

// @desc Gets one product
// @route GET /api/products/:id

async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					messsage: "Product not found",
				}),
			);
		} else {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(product));
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc Creates one product
// @route POST /api/products

async function createProduct(req, res) {
	try {
		const body = await getPostData(req);
		const { title, description, price } = JSON.parse(body);

		const product = {
			title,
			description,
			price,
		};

		const newProduct = await Product.create(product);

		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
}
// @desc Update one product
// @route PUT /api/products/:id

async function updateProduct(req, res, id) {
	try {
		const product = await Product.findById(id);
		if (!product) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					messsage: "Product not found",
				}),
			);
		} else {
			const body = await getPostData(req);
			const { title, description, price } = JSON.parse(body);

			const productData = {
				title: title || product.title,
				description: description || product.description,
				price: price || product.price,
			};

			const updateProduct = await Product.update(productData, id);

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(updateProduct));
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc Delete one product
// @route DELETE /api/products/:id

async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					messsage: "Product not found",
				}),
			);
		} else {
			await Product.remove(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					mesage: `Product ${id} removed`,
				}),
			);
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };

const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find();
	res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, limit, page, numericFilters } =
		req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}
	let result = Product.find(queryObject);
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	}
	if (fields) {
		const selectedFields = fields.split(',').join(' ');
		result = result.select(selectedFields);
	}
	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		};
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		const options = ['price', 'rating'];
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}
	if (page) {
		const limitNum = Number(limit) || 10;
		const skipNum = (page - 1) * limitNum;
		result = result.limit(limitNum).skip(skipNum);
	}
	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
	getAllProductsStatic,
	getAllProducts,
};

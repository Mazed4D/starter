const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	featured: {
		type: Boolean,
		default: false,
	},
	createdAt: { type: Date, default: Date.now() },
	name: { type: String, required: [true, 'product name must be provided'] },
	price: { type: Number, required: [true, 'product price must be provided'] },
	company: {
		type: String,
		enum: {
			values: ['ikea', 'liddy', 'caressa', 'marcos'],
			message: '{VALUE} is not supported',
		},
	},
	rating: {
		type: Number,
		default: 4.5,
	},
});

module.exports = model('Product', productSchema);

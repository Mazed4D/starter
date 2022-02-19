const express = require('express');
const connectDB = require('./db/connect');
require('express-async-errors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productsRoute = require('./routes/products');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>');
});

app.use('/api/v1/products', productsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Example app listening on port ${port}!`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();

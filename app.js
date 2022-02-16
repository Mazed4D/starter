const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('<h1>Done</h1>');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

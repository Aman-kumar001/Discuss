const express = require('express');
const app = express();
require('dotenv').config();
const connectApp = require('./config/db');
const cors = require('cors');

connectApp();

// cors
app.use(cors({ origin: true, credentials: true }));

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Server up and running'));

/*routes*/
app.use('/users', require('./route/UsersRoute'));
app.use('/post', require('./route/PostRoute'));
app.use('/comment', require('./route/CommentRoute'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
	console.log(`server is running on http://localhost:${PORT}`)
);

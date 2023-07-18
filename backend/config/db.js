const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectApp = async () => {
	try {
		mongoose
			.connect(dotenv.configDotenv().parsed.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('MongoDB is connected');
			});
		// databasesList = await client.db().admin().listDatabases();
		// mongoose.admin().listDatabases();
	} catch (err) {
		console.error(err.message, 'failed to connect');
		process.exit(1);
	}
};

module.exports = connectApp;

const user = require('../model/users');

//provides all the existing usernames to check for uniqueness without making multiple calls
exports.getAllUserNames = (req, res) => {
	user
		.find({}, { password: 0 })
		.then((user) => res.json(user))
		.catch((err) =>
			res.status(404).json({ message: 'Internal Error', error: err.message })
		);
};

exports.createUser = (req, res) => {
	user
		.create(req.body)
		.then((data) => res.json({ message: 'User added successfully', data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: 'Failed to create an user', error: err.message })
		);
};

exports.logInUser = (req, res) => {
	user
		.find({ name: req.body.name, password: req.body.password })
		.then((data) => res.json({ message: 'User logged in successfully', data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: 'wrong username or password', error: err.message })
		);
};

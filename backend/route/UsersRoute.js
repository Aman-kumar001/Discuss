const {
	getAllUserNames,
	createUser,
	logInUser,
} = require('../controller/UserController');
const express = require('express');
const router = express.Router();

/**
 * @route GET api/getAllNames
 * @description fetch all the usernames from the database
 * @access public
 */
router.get('/getAllNames', getAllUserNames);

/**
 * @route POST api/createUser
 * @description register a new user in the database
 * @access public
 */
router.post('/createUser', createUser);

/**
 * @route POST api/loginUser
 * @description varifies and login the user
 * @access public
 */
router.post('/logInUser', logInUser);

module.exports = router;

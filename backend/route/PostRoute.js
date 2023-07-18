const { getAllPost, createPost } = require('../controller/PostController');
const express = require('express');
const router = express.Router();

/**
 * @route GET api/getAllNames
 * @description fetch all the usernames from the database
 * @access public
 */
router.get('/getAllPosts', getAllPost);

/**
 * @route POST api/createUser
 * @description register a new user in the database
 * @access public
 */
router.post('/createPost', createPost);

module.exports = router;

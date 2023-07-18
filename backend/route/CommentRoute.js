const { createComment } = require('../controller/CommentController');
const express = require('express');
const router = express.Router();

/**
 * @route POST api/createUser
 * @description register a new user in the database
 * @access public
 */
router.post('/createComment', createComment);

module.exports = router;

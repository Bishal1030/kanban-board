const express = require('express');
const router = express.Router();


const taskRoute = require('./task');


router.use('/task', taskRoute )


module.exports = router;

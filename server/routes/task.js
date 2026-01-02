const express = require('express');
const router = new express.Router();

const taskController = require('../controller/task');
const responseUtil = require('../utils/response-util');

router
  .route('/')
  .post(taskController.createTask, responseUtil)
  .get(taskController.listTask, responseUtil);

router
  .route('/:taskId')
  .patch(taskController.updateTask, responseUtil)
  .delete(taskController.deleteTask, responseUtil);



module.exports = router;

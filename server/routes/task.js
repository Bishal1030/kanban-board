const express = require('express');
const router = new express.Router();

const taskController = require('../controller/task');
const responseUtil = require('../utils/response-util');
const updateTaskValidation = require('../middleware/validators/task/update-task-validator')
const createTaskValidation = require('../middleware/validators/task/create-task-validator')

router
  .route('/')
  .post(createTaskValidation, taskController.createTask, responseUtil)
  .get(taskController.listTask, responseUtil);

router
  .route('/:taskId')
  .patch(updateTaskValidation, taskController.updateTask, responseUtil)
  .delete(taskController.deleteTask, responseUtil);



module.exports = router;

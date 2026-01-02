const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  try {
    const {taskId} = req.params; 
    const updateObj = req.body; 

    const updatedTask = await taskService.updateTask(taskId, updateObj);

    next({
      status: 200,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (err) {
    next({
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong',
      data: null,
    });
  }
};

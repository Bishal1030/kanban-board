const deleteTaskService = require('../../service/task');

module.exports = async (req, res, next) => {
  try {

    const {taskId} = req.params;
    const result = await deleteTaskService.deleteTask(taskId);

    next({
      status: 200,
      message: 'Task deleted successfully',
      data: result,
    });
  } catch (err) {
    next({
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong',
      data: null,
    });
  }
};

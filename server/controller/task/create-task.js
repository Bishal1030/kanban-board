const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
    });

    next({
      status: 200,
      message: 'Task created successfully',
      data: task,
    });
  } catch (err) {
    next({
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong',
      data: null,
    });
  }
};

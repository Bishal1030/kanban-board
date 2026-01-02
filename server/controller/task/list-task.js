const taskService = require('../../service/task');

module.exports = async (req, res, next) => {
  try {
    const tasks = await taskService.listTask(); 

    next({
      status: 200,
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  } catch (err) {
    next({
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong',
      data: null,
    });
  }
};

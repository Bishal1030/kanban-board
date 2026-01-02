const { Task } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async () => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'DESC']], 
    });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  } catch (error) {
    throw new ValidationError(
      error.message || 'Could not fetch tasks',
      error.statusCode || 500
    );
  }
};

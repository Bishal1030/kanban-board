const { Task, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async (taskId) => {
  const transaction = await sequelize.transaction();

  try {
    const task = await Task.findByPk(taskId, { transaction });

    if (!task) {
      throw new ValidationError('Task not found', 404);
    }

    await task.destroy({ transaction });

    await transaction.commit();

    return { message: 'Task deleted successfully', id: taskId };
  } catch (error) {
    await transaction.rollback();
    throw new ValidationError(
      error.message || 'Could not delete task',
      error.statusCode || 500
    );
  }
};

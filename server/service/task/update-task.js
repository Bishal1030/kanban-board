const { Task, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async (taskId, updateObj) => {
  const transaction = await sequelize.transaction();
  try {
    const task = await Task.findByPk(taskId, { transaction });

    if (!task) {
      throw new ValidationError('Task not found', 404);
    }

    if (updateObj.title !== undefined) task.title = updateObj.title;
    if (updateObj.description !== undefined) task.description = updateObj.description;
    if (updateObj.status !== undefined) task.status = updateObj.status;

    await task.save({ transaction });
    await transaction.commit();

    return task;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

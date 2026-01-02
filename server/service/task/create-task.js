
const { Task, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

module.exports = async (createObj) => {

  const transaction = await sequelize.transaction(); // I'm initializing transaction here to commit this or not

  try {

    if (!createObj.title) {
      throw new ValidationError('Title is required', 422);
    }

    const newTask = await Task.create(
      {
        title: createObj.title,
        description: createObj.description,
        status: createObj.status || 'todo', 
      },
      { transaction }
    );

    if (!newTask) {
      throw new ValidationError('Task could not be created', 500);
    }

    await transaction.commit();

    return {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

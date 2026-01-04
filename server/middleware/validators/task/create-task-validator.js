const schema = require('../../../schema/task/create-task-schema');

module.exports = (req, res, next) => {
  try {
    const result = schema.validate(req.body);
    const { error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(422).json({
        message: 'Create Task failed',
        data: error.details,
      });
    } else next();
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: null,
    });
  }
};
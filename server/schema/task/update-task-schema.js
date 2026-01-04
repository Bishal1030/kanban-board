const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('todo', 'in-progress', 'done').optional(),
}).min(1);

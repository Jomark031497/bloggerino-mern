const Joi = require('@hapi/joi');

const createBlogValidation = (data) => {
  const schema = Joi.object({
    postedBy: Joi.string().required(),
    title: Joi.string().min(6).required(),
    body: Joi.string().min(20).required(),
  });

  const error = schema.validate(data);

  return error;
};

module.exports = {
  createBlogValidation,
};

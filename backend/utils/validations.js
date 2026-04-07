const Joi = require('joi');

const createProjectSchema = Joi.object({
  title: Joi.string().min(3).max(120).required(),
  projectType: Joi.string().valid('saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other').required(),
  wizardAnswers: Joi.object({
    problemStatement: Joi.string().required(),
    targetAudience: Joi.string().required(),
    coreFeatures: Joi.array().items(Joi.string()).required(),
    techPreferences: Joi.string().required(),
    monetizationModel: Joi.string().required(),
    scaleExpectation: Joi.string().required(),
    additionalContext: Joi.string().allow('', null)
  }).required()
});

module.exports = { createProjectSchema };

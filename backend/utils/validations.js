const Joi = require('joi');

const createProjectSchema = Joi.object({
  title: Joi.string().min(1).max(120).required(),
  projectType: Joi.string().valid('saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other').default('saas'),
  wizardAnswers: Joi.object({
    problemStatement: Joi.string().allow('', null).optional(),
    targetAudience: Joi.string().allow('', null).optional(),
    coreFeatures: Joi.array().items(Joi.string().allow('')).optional().default([]),
    techPreferences: Joi.string().allow('', null).optional(),
    monetizationModel: Joi.string().allow('', null).optional(),
    scaleExpectation: Joi.string().allow('', null).optional(),
    additionalContext: Joi.string().allow('', null).optional()
  }).unknown(true).optional().default({}),
  designSystem: Joi.object({
    id: Joi.string().allow('', null).optional(),
    name: Joi.string().allow('', null).optional(),
    prompt: Joi.string().allow('', null).optional(),
    tokens: Joi.object().unknown(true).optional()
  }).unknown(true).optional()
}).unknown(true);

module.exports = { createProjectSchema };

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

const updateProjectSchema = Joi.object({
  title: Joi.string().min(1).max(120).optional(),
  projectType: Joi.string().valid('saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other').optional(),
  isArchived: Joi.boolean().optional(),
  kanbanColumns: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      title: Joi.string().max(80).required(),
      featureIds: Joi.array().items(Joi.string().allow('')).optional(),
      tasks: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          text: Joi.string().required(),
          completed: Joi.boolean().optional()
        }).unknown(true)
      ).optional()
    }).unknown(true)
  ).unique((a, b) => a.id === b.id).optional(),
  milestones: Joi.array().items(
    Joi.object({
      id: Joi.string().optional(),
      title: Joi.string().min(1).max(150).required(),
      dueDate: Joi.date().iso().allow(null, '').optional(),
      isComplete: Joi.boolean().optional()
    }).unknown(true)
  ).optional(),
  designSystem: Joi.object({
    id: Joi.string().allow('', null).optional(),
    name: Joi.string().allow('', null).optional(),
    prompt: Joi.string().allow('', null).optional(),
    tokens: Joi.object().unknown(true).optional()
  }).unknown(true).optional()
}).unknown(true);

module.exports = { createProjectSchema, updateProjectSchema };

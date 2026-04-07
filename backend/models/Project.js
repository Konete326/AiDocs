const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, minlength: 3, maxlength: 120, required: true },
    projectType: { type: String, enum: ['saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other'] },
    status: { type: String, enum: ['draft', 'generating', 'complete', 'error'], default: 'draft' },
    wizardAnswers: {
      problemStatement: { type: String },
      targetAudience: { type: String },
      coreFeatures: [{ type: String }],
      techPreferences: { type: String },
      monetizationModel: { type: String },
      scaleExpectation: { type: String },
      additionalContext: { type: String }
    },
    docsGenerated: [{ type: String }],
    kanbanColumns: [{ type: Object }], // Columns with task arrays
    milestones: [{
      title: { type: String },
      dueDate: { type: Date },
      isComplete: { type: Boolean, default: false }
    }],
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

projectSchema.index({ userId: 1, createdAt: -1 });
projectSchema.index({ userId: 1, status: 1 });
projectSchema.index({ userId: 1, isArchived: 1 });

module.exports = mongoose.model('Project', projectSchema);

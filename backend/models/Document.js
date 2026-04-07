const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    docType: { 
      type: String, 
      enum: ['prd','srd','techStack','dbSchema','userFlows','mvpPlan','folderStructure','claudeContext','agentSystemPrompt'],
      required: true
    },
    version: { type: Number, default: 1 },
    content: { type: String },
    contentTokenCount: { type: Number },
    modelUsed: { type: String },
    generationTimeMs: { type: Number }
  },
  { timestamps: true }
);

documentSchema.index({ projectId: 1, docType: 1 }, { unique: true });
documentSchema.index({ userId: 1, projectId: 1 });

module.exports = mongoose.model('Document', documentSchema);

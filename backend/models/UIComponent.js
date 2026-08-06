const mongoose = require('mongoose');

const uiComponentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Buttons',
        'Checkboxes',
        'Toggle switches',
        'Cards',
        'Loaders',
        'Inputs',
        'Radio buttons',
        'Forms',
        'Patterns',
        'Tooltips',
        'UI Kits',
        'Themes'
      ]
    },
    code: {
      html: { type: String, default: '' },
      css: { type: String, default: '' },
      tailwind: { type: String, default: '' },
      react: { type: String, default: '' }
    },
    aiPrompt: { type: String, required: true },
    framework: {
      type: String,
      enum: ['CSS', 'Tailwind', 'React', 'Vue', 'Svelte'],
      default: 'React'
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    thumbnail: { type: String, default: '' },
    viewsCount: { type: Number, default: 0 },
    embedViewsCount: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

uiComponentSchema.index({ category: 1, framework: 1, viewsCount: -1 });
uiComponentSchema.index({ title: 'text', tags: 'text', aiPrompt: 'text' });

module.exports = mongoose.model('UIComponent', uiComponentSchema);

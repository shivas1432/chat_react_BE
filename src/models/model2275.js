// Model 2275 - chat_react_BE
const mongoose = require('mongoose');

const schema2275 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  },
  
  metadata: {
    type: Map,
    of: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

schema2275.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Model2275', schema2275);

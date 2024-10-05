// models/AuditTrail.js
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

const auditTrailSchema = new mongoose.Schema({
  action: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date,
  previousHash: String,
  hash: String,
}, { timestamps: true });

auditTrailSchema.pre('save', function(next) {
  const audit = this;
  
  // Create hash
  audit.hash = CryptoJS.SHA256(audit.action + audit.timestamp.toString()).toString(CryptoJS.enc.Hex);
  
  next();
});

export default mongoose.model('AuditTrail', auditTrailSchema);

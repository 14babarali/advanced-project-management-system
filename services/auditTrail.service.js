// services/auditTrail.service.js
import AuditTrail from '../models/AuditTrail.js';

class AuditTrailService {
  static async logAction(action, userId) {
    const latestEntry = await AuditTrail.findOne().sort('-createdAt').limit(1);
    
    const newEntry = new AuditTrail({
      action,
      userId,
      previousHash: latestEntry ? latestEntry.hash : '',
    });
    
    await newEntry.save();
    
    return newEntry;
  }

  static async verifyIntegrity() {
    const entries = await AuditTrail.find().sort('createdAt');
    
    for (let i = 1; i < entries.length; i++) {
      const current = entries[i];
      const previous = entries[i - 1];
      
      if (current.previousHash !== previous.hash) {
        return false;
      }
    }
    
    return true;
  }
}

export default AuditTrailService;

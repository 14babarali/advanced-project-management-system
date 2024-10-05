// // models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: {
//     mainRole: String,
//     subCategory: String,
//     level: String,
//   },
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);


// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    mainRole: String,
    subCategory: String,
    level: String,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);

// models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: {
//     mainRole: String,
//     subCategory: String,
//     level: String,
//   },
//   tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);

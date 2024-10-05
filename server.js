// // server.js
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Import routes
// import userRoutes from './routes/user.routes.js';
// import authRoutes from './routes/auth.routes.js';
// import taskRoutes from './routes/task.routes.js';

// // Use routes
// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import teamRoutes from './routes/team.routes.js';
import projectRoutes from './routes/project.routes.js';

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();



app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Import routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import teamRoutes from './routes/team.routes.js';
import projectRoutes from './routes/project.routes.js';
import timeEntryRoutes from './routes/timeEntry.routes.js';
import reportRoutes from './routes/report.routes.js';

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/time-entries', timeEntryRoutes);
app.use('/api/reports', reportRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



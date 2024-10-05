// routes/user.routes.js


// routes/user.routes.js
import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, assignTask, updateTaskStatus } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', checkRole(['Admin', 'Manager']), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', checkRole(['Admin', 'Manager']), deleteUser);
router.post('/assign-task', checkRole(['Admin', 'Manager']), assignTask);
router.patch('/update-task-status/:taskId', updateTaskStatus);

export default router;

// import express from 'express';
// import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
// import { authenticate } from '../middleware/auth.middleware.js';
// import { checkRole } from '../middleware/role.middleware.js';

// const router = express.Router();

// router.use(authenticate);

// router.post('/', checkRole(['Admin', 'Manager']), createUser);
// router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.patch('/:id', authenticate, updateUser);
// router.delete('/:id', checkRole(['Admin', 'Manager']), deleteUser);

// export default router;


// // routes/user.routes.js
// import express from 'express';
// import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

// const router = express.Router();

// router.post('/', createUser);
// router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);

// export default router;

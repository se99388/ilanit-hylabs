import express from 'express';
import api from './api';
import auth from './auth';

const router = express.Router();

router.use('/api', api);

// i define route only for the login - i want to login will be /auth/login and not under /api - its not api!
router.use('/auth', auth);

export default router;

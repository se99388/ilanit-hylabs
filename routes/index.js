import express from 'express';
import api from './api';
import admin from './admin';
import login from './login';

const router = express.Router();

router.use('/api', api);
router.use('/admin', admin);
router.use('/login', login);

export default router;

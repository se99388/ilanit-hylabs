import express from 'express';
import users from './users';
import interests from './interests';
import rewards from './rewards';
import auth from './auth';

const router = express.Router();

router.use('/users', users);
router.use('/interests', interests);
router.use('/rewards', rewards);
router.use('/auth', auth);

export default router;

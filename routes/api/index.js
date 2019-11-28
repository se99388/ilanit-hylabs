import express from 'express';
import users from './users';
import interests from './interests';

const router = express.Router();

router.use('/users', users);
router.use('/interests', interests);

export default router;

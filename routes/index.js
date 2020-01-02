import path from 'path';
import express from 'express';
import api from './api';
import auth from './auth';

const router = express.Router();

router.use((req, res, next) => {
    if (req.session.isAuth) {
        res.cookie('isa', new Date().getTime());
    }
    next();
});

router.use('/api', api);

// i define route only for the login - i want to login will be /auth/login and not under /api - its not api!
router.use('/auth', auth);

// router.use('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

export default router;

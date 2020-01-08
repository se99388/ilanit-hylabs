import path from 'path';
import express from 'express';
import api from './api';
import auth from './auth';

const router = express.Router();

//Adiel, why you write it here? the problem is that in the first login it will not created because it fires BEFORE isAuth creates. Only in the second login the coockie will create
// router.use((req, res, next) => {
//     if (req.session.isAuth) {
//         res.cookie('isa', new Date().getTime());
//     }
//     next();
// });

//in case of the server side fall down,  without logout - req.session.isAuth will be removed but the req.cookies['isa'] will be still exist. In this case I need to delete it. I'm not it is must
router.use((req, res, next) => {
    if (!req.session.isAuth && req.cookies['isa']) {
        console.log("isa:", req.cookies['isa']);
        res.clearCookie('isa');
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

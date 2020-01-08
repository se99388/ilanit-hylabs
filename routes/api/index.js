import express from 'express';
import users from './users';
import interests from './interests';
import rewards from './rewards';
import sendEmail from './send-email';

const router = express.Router();

// const protect = (req, res, next) => {
//     if (!req.session.isAuth) {
//         return res.status(500).json({ authorize: false });
//     }

//     next();
// };

router.use('/users', users);
router.use('/interests', interests);
router.use('/send-email', sendEmail)

// i want to protect on rewards so i set before it middleware that block the request if ths user did not authorized
// look at "protect" function in this file!
// router.use('/rewards', protect, rewards);
router.use('/rewards', rewards);

export default router;

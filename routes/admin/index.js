import express from 'express';

const db = {
    ofirtoken: 1
};

const getUserId = req => {
    const token = req.cookies.c;
    const userId = db[token];
    return userId;
};

const router = express.Router();

router.use((req, res, next) => {
    // if (req.session.userId) {
    //     next();
    // } else {
    //     res.redirect('/login');
    // }

    const userId = getUserId(req);
    if (userId) {
        next();
    } else {
        res.redirect('/login');
    }
});

router.get('/', (req, res) => {
    const userId = getUserId(req);
    console.log(userId);
    res.send('This is Secure content');
});

export default router;

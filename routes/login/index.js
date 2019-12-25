import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Here will be a form login with email and password inputs');
});

router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (email === 'adieloz@gmail.com' && password === 'tralala') {
        res.cookie('c', 'ofirtoken');
        // res.session.userId = userId
        return res.redirect('/admin');
    }

    res.json({ error: 'auth error!' });
});

export default router;

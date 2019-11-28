import express from 'express';

const router = express.Router();

router.get('/oz', (req, res) => {
    res.json({ adiel: 'oz' });
});

export default router;

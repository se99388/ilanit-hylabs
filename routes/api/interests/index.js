import express from 'express';
import { getInterest, getInterests } from '../../../db/interests';

const router = express.Router();

router.get('/', async (req, res) => {
    const interests = await getInterests();
    res.json(interests);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const int = await getInterest(id);
    res.json(int);
});

export default router;

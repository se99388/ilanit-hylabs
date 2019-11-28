import express from 'express';
import { getInterest } from '../../../db/interests';

const router = express.Router();

// router.get('/', async (req, res) => {
//     const users = await getUsers();
//     res.json(users);
// });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const int = await getInterest(id);
    res.json(int);
});

export default router;

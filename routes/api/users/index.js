import express from 'express';
import { getUsers, getUser } from '../../../db/users';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
    res.json(user);
});

export default router;

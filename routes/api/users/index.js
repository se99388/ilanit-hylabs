import express from 'express';
import { getUsers, getUser, addUser } from '../../../db/users';
import { isValidate } from '../../../src/utils/validation-form';

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

router.post('/', async (req, res) => {
    const userDetails = req.body;
    const { firstName, lastName, email, phone, institute, lab } = userDetails;

    try {
        await isValidate(userDetails);

        const response = await addUser(firstName, lastName, email, phone, institute, lab);

        res.json(response);
    } catch (e) {
        let error = 'Server Error! please try again later';

        if (e.name === 'ValidationError') {
            error = e.message;
        } else if (e.constraint) {
            error = `Email ${email} already exists`;
        }
        res.json({ error });
    }
});

export default router;

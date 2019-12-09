import express from 'express';
import { getUsers, getUser, addUser } from '../../../db/users';
import { isValidate } from '../../../src/utils/validationForm'

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
    try {
        const userDetails = req.body;
        //first option:
        await isValidate(userDetails);

        //second option:
        // await isValidate(userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.phone, userDetails.institute, userDetails.lab);

        const response = await addUser(userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.phone, userDetails.institute, userDetails.lab);

        res.json(response)
    }
    catch (e) {
        console.log("I catch the error", e)
        let errorMessage = { error: null };
        if (e.name === 'ValidationError') {
            errorMessage.error = e.message;
        } if (e.name === 'error') {
            errorMessage.error = e.detail.replace(/[\(\)]|Key/g, '').replace(/=/g, ' ');
        }
        res.json(errorMessage)
    }



});

export default router;

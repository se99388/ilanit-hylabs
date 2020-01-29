import express from 'express';
import { getUsers, getUser, addUser, updateRewardUser } from '../../../db/users';
import { isValidate } from '../../../src/utils/validation-form';
import {formData} from '../../../src/components/home/form-data';

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
    console.log(userDetails)
    const { firstName, lastName, email, phone, institute, lab, interests, hylabsJob } = userDetails;

    try {
        await isValidate(userDetails, formData);

        const response = await addUser(firstName, lastName, email, phone, institute, lab, interests, hylabsJob);

        res.json(response);
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        if (e.name === 'ValidationError') {
            error = e.message;
        } else if (e.constraint) {
            error = `Email ${email} already exists`;
        }
        res.json({ error });
    }
});

router.put("/", async (req, res) => {
    try {
        console.log("req.body: ", req.body)
        const { id, reward} = req.body;
        // await isValidate({ reward, quantity, image, size }, rewardData);
        const responseReward = await updateRewardUser(id, reward)
        console.log(responseReward);
        res.json(responseReward);

    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        if (e.name === 'ValidationError') {
            error = e.message;
        }
        res.json({ error });
    }

});

export default router;

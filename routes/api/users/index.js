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
    try{
        // console.log(req.body)
        await isValidate(req.body);
        const response = await addUser(req.body);
        res.json(response)
    }
    catch(e){
        res.json(e)
    }
    

    
});

export default router;

import { getRewards, removeReward, updateReward, addReward } from '../../../db/rewards';
import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const rewards = await getRewards();
        return res.json(rewards);
    }
    catch (e) {
        console.log(e);
    }

});

router.delete("/:id", async (req, res) => {

    const deleteRow = await removeReward(req.params.id);
    console.log(deleteRow)
    res.json(deleteRow).status(204);
});

router.put("/", async (req, res) => {
    try {
        const { id, reward, quantity, image } = req.body;
        const responseReward = await updateReward(id, reward, quantity, image)
        console.log(responseReward);
        res.json(req.body);

    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        if (e.name === 'ValidationError') {
            error = e.message;
        }
        res.json({ error });
    }

});

router.post("/", async (req, res) => {
    try {
        const { reward, quantity, image } = req.body;
        const newReward = await addReward(reward, quantity, image);
        res.json(newReward);
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
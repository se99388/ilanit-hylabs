import { getRewards, removeReward, updateReward, addReward } from '../../../db/rewards';
import { isValidate } from '../../../src/utils/validation-form';
import {rewardData} from '../../../src/components/admin/set-rewards/reward-data';
import express from 'express';
import rewardsImages from './rewards-images';


const router = express.Router();

router.use("/rewards-images", rewardsImages);

const protect = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.status(500).json({ authorize: false });
    }

    next();
};
router.get("/", async (req, res) => {
    try {
        const rewards = await getRewards();
        return res.json(rewards);
    }
    catch (e) {
        console.log(e);
    }

});

router.delete("/:id", protect, async (req, res) => {
    const deleteRow = await removeReward(req.params.id);
    console.log(deleteRow)
    res.json(deleteRow).status(204);
});

router.put("/", protect, async (req, res) => {
    try {
        
        const { id, reward, quantity, image, size } = req.body;
        await isValidate({ reward, quantity, image, size },rewardData);
        const responseReward = await updateReward(id, reward, quantity, image, size)
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

router.post("/", protect, async (req, res) => {
    try {
        const { reward, quantity, image, size } = req.body;
        await isValidate({ reward, quantity, image, size }, rewardData);
        const newReward = await addReward(reward, quantity, image, size);
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
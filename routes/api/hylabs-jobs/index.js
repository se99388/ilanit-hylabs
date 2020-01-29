import express from 'express';
import { addHylabsJobCandidate} from '../../../db/hylabs-jobs';

const router = express.Router();

router.post("/", async(req, res)=>{
    try{
        console.log("hylabs-job:", req.body)
        const response = await addHylabsJobCandidate(req.body)
        res.json(response);
    }catch (e) {
        let error = 'Server Error! please try again later';
        console.log("ofirError:", e)
        if (e.name === 'ValidationError') {
            error = e.message;
        } else if (e.constraint) {
            error = `Email ${req.body.email} already exists`;
        }
        res.json({ error });
    }
});

export default router;
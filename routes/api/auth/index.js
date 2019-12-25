import express from 'express';

const router = express.Router()

router.post("/", async (req, res)=>{
    try{
        console.log(req.body);
       res.json()
    }catch(e){
        console.log('err-Ofir', e)
        res.json(e)
    }
    
});

export default router;
import express from 'express';
import fs from 'fs';
import path from 'path';
import { readDir} from '../../../../src/utils/fs-utils'


const router = express.Router();
const url = '../../../../public/images/fwd'


router.get("/", async (req,res)=>{
   const response =  await readDir(path.join(__dirname, url))
    console.log(response)
    res.json(response)
});

export default router;
var nodemailer = require('nodemailer');
import express from 'express';
import {updateReward} from '../../../db/rewards'
const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const emailDetails = req.body;
        console.log("email", req.body);
        const { id, reward, quantity, image, size } = emailDetails.reward;
        const responseReward = await updateReward(id, reward, quantity, image, size)
        console.log(responseReward);
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'hylabs.mail@gmail.com',
                pass: '089366475'
            }
        });

        var mailOptions = {
            from: 'hylabs.mail@gmail.com',
            to: emailDetails.email,
            subject: emailDetails.title,
            text: emailDetails.message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json({ sucess: true })
    }catch(e){
        console.log("errorMail",e)
        res.json({error:e})
    }
    
})


export default router

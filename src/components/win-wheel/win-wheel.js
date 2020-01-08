import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
// import './main.css'
import { ColwheelBack, Canvas, MyButton } from './win-wheel.style';
import { sendEmail } from '../../utils/api';
import {initalWheelData} from './win-wheel-data'

const COLORS = ['#f6989d', ' #a186be', '#00aef0', '#f26522', 'yellow', '#e70697', '#fff200', '#ee1c24', '#3cb878']


const WinWheel = ({ initalRewards }) => {
    let theWheel;
    const [displayWheelBtn, setDisplayWheelBtn] = useState(true);
  
    
    
    useEffect(() => {
//filter only rewards with more then 0 quantity
        const allInstockRewords = initalRewards.filter(reward => reward.quantity > 0);
        if (allInstockRewords.length) {
            const segmentsWithImages = allInstockRewords.map((reward, index) => {
                return ({
                    'fillStyle': COLORS[index],
                    'text': reward.reward,
                    'image':`images/${reward.image}`,
                    'size': reward.size
                })
            })
              // theWheel = initalWheelData([
    //     { 'image': 'images/jane.png', 'text': 'Jane' },
    //     { 'image': 'images/jane.png', 'text': 'Jane' },
    //     { 'image': 'images/jane.png', 'text': 'Jane' },
    //     { 'image': 'images/jane.png', 'text' : 'Jane' }

    // ], alertPrize)
            theWheel =  initalWheelData(segmentsWithImages,alertPrize)
        }

    }, [initalRewards])


   

    // -------------------------------------------------------
    // Click handler for spin button.
    // -------------------------------------------------------
    function startSpin() {

        theWheel.startAnimation();
        setDisplayWheelBtn(false)

    }

    // -------------------------------------------------------
    // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
    // note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
    // -------------------------------------------------------
    async function alertPrize(indicatedSegment) {
        // Do basic alert of the segment text. You would probably want to do something more interesting with this information.

        const rewardObject = initalRewards.find(reward => reward.reward === indicatedSegment.text);
        rewardObject.quantity-=1
        const emailDetails = {
            email: 'houbara0@gmail.com', 
            title: 'You won - in hylabs lotto', 
            message: `You won in ${indicatedSegment.text}.\r\n we are waiting you in hylabs booth.`,
            reward: rewardObject
        }
        alert('You won in:' + indicatedSegment.text );
        const response = await sendEmail(emailDetails)
        console.log(response)
    }

   

    return (
        <>
            {!!initalRewards.length && <Container >
                <Row className="justify-content-md-center">
                    <ColwheelBack md="auto">
                        <Canvas id="canvas"
                            width="434" height="434"
                        >
                            <p align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                        </Canvas>

                    </ColwheelBack>
                </Row>

                <Row className="justify-content-md-center">
                    <Col className='text-center' xs={6} md={4} >
                        {displayWheelBtn && <MyButton
                            onClick={startSpin}
                        >Spin </MyButton>}
                    </Col>
                </Row>
            </Container>}
        </>
    )
}

export default WinWheel;
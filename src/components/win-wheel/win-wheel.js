import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import RewardImages from './rewards-images';
import { ColwheelBack, Canvas, MyButton, MyDiv } from './win-wheel.style';
import { initalWheelData } from './win-wheel-data'

// const COLORS = ['#FF9AA2', ' #FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2', ' #FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA']

// const COLORS = ['#FBBCCD',
//  ' #FFFEC3', 
//  '#E2BEF1',
//   '#AAE9A4',
//    '#FFDC97', 
//     '#A7F0FA', '#FBBCCD',
//     ' #FFFEC3',
//     '#E2BEF1',
//     '#AAE9A4',
//     '#FFDC97',
//     '#A7F0FA']

const COLORS = ['#F5CDDE',
    ' #C6F8E5',
    '#E4DECB',
    '#E2BEF1',
    '#F9DED7',
    '#CCE1F2',
    '#FBF7D5', 
    '#F5CDDE',
    ' #C6F8E5',
    '#E2BEF1',
    '#F9DED7',
    '#CCE1F2',
    '#FBF7D5', '#E4DECB',]


const WinWheel = ({ initalRewards, alertPrize }) => {
    let theWheel;
    const [displayWheelBtn, setDisplayWheelBtn] = useState(true);
    const [dataWheel, setDataWheel] = useState([]);

    useEffect(() => {
        //filter only rewards with more then 0 quantity
        const instockRewords = initalRewards.filter(reward => reward.quantity > 0);

        if (instockRewords.length) {
            const segmentsWithImages = instockRewords.map((reward, index) => {
                return ({
                    'fillStyle': COLORS[index],
                    'text': reward.reward,
                    'image': `${process.env.REACT_APP_IMAGES_DIR}${reward.image}`,
                    'size': reward.size
                })
            })
            setDataWheel(segmentsWithImages)
        }

    }, [initalRewards])


    theWheel = initalWheelData(dataWheel, alertPrize);

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
    // async function alertPrize(indicatedSegment) {
    //     // Do basic alert of the segment text. You would probably want to do something more interesting with this information.

    //     const rewardObject = initalRewards.find(reward => reward.reward === indicatedSegment.text);
    //     rewardObject.quantity-=1
    //     const emailDetails = {
    //         email: emailUser || 'houbara0@gmail.com', 
    //         title: 'You won - in hylabs lotto', 
    //         message: `You won in ${indicatedSegment.text}.\r\n we are waiting you in hylabs booth.`,
    //         reward: rewardObject
    //     }
    //     alert('You won in:' + indicatedSegment.text );
    //     const responseUser = await updateRewardUser(userId, indicatedSegment.text)
    //     const response = await sendEmail(emailDetails);
    //     console.log(response, responseUser)
    // }



    return (
        <>
            {!!initalRewards.length && < >
             

                <Row className="justify-content-center">
                    <ColwheelBack
                        md="auto"
                    >
                        <Canvas id="canvas"
                            width="434" height="434"
                        >
                            <p align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                        </Canvas>
                        {displayWheelBtn &&
                            <MyDiv>
                                <MyButton
                                    xs={10} md={4}
                                    variant="outline-success"
                                    size="lg"
                                    onClick={startSpin}
                                >SPIN </MyButton>
                            </MyDiv>}
                    </ColwheelBack>
                </Row>
                <br/>
                <RewardImages imagesData={dataWheel} />
            </>}
        </>
    )
}

export default WinWheel;
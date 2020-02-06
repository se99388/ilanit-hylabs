import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import RewardImages from './rewards-images';
import { ColwheelBack, Canvas, ColwheelBack2, Canvas2, MyButton, MyDiv } from './win-wheel.style';
import { initalWheelData } from './win-wheel-data';

const COLORS = [
    '#F5CDDE',
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
    '#FBF7D5',
    '#E4DECB'
];

const WinWheel = ({ initalRewards, alertPrize }) => {
    let theWheel;
    const [displayWheelBtn, setDisplayWheelBtn] = useState(true);
    const [dataWheel, setDataWheel] = useState([]);

    useEffect(() => {
        //filter only rewards with more then 0 quantity
        const instockRewords = initalRewards.filter(reward => reward.quantity > 0);

        if (instockRewords.length) {
            const segmentsWithImages = instockRewords.map((reward, index) => {
                return {
                    fillStyle: COLORS[index],
                    text: reward.reward,
                    // 'image': `${process.env.REACT_APP_IMAGES_DIR}${reward.image}`,
                    image: `/images/fwd/${reward.image}`,
                    size: reward.size
                };
            });
            setDataWheel(segmentsWithImages);
        }
    }, [initalRewards]);

    theWheel = initalWheelData(dataWheel, alertPrize);

    // -------------------------------------------------------
    // Click handler for spin button.
    // -------------------------------------------------------
    function startSpin() {
        theWheel.startAnimation();
        setDisplayWheelBtn(false);
    }

    return (
        <>
            {/* Why can I put here 'dataWheel.length' */}
            {!!initalRewards.length && (
                <>
                    <Row className="justify-content-center">
                        <ColwheelBack md="auto" align="center">
                            <Canvas id="canvas" width="370" height="370">
                                <p align="center">
                                    Sorry, your browser doesn't support canvas. Please try another.
                                </p>
                            </Canvas>
                            {displayWheelBtn && (
                                <MyDiv>
                                    <MyButton
                                        xs={10}
                                        md={4}
                                        variant="outline-success"
                                        size="lg"
                                        onClick={startSpin}
                                    >
                                        SPIN{' '}
                                    </MyButton>
                                </MyDiv>
                            )}
                        </ColwheelBack>

                        {/* <ColwheelBack2
                        md="auto"
                    >
                        <Canvas2 id="canvas"
                            width="434" height="434"
                        >
                            <p align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                        </Canvas2>
                        {displayWheelBtn &&
                            <MyDiv>
                                <MyButton
                                    xs={10} md={4}
                                    variant="outline-success"
                                    size="lg"
                                    onClick={startSpin}
                                >SPIN </MyButton>
                            </MyDiv>}
                    </ColwheelBack2> */}
                    </Row>
                    <br />
                    <RewardImages imagesData={dataWheel} />
                </>
            )}
        </>
    );
};

export default WinWheel;

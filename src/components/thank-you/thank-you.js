import React, { useEffect, useState } from 'react';
import { ContainerMessage } from './thank-you.style';
import { useLocation, useHistory, Link } from 'react-router-dom';
import useHTMLTitle from '../../hooks/use-html-title';
import { getRewards, getUserById, updateRewardUser, sendEmail } from '../../utils/api';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import WinWheel from '../win-wheel';
import RewardImages from '../win-wheel/rewards-images';
import Modal from '../UI/modal';
import Backdrop from '../UI/backdrop';

const ThankYou = () => {
    useHTMLTitle('HyLabs - Thank You');

    const [fullName, setFullName] = useState({});
    const [emailUser, setEmailUser] = useState({});
    const [userID, setUserID] = useState({});
    const [rewards, setRewards] = useState([]);
    const [isWon, setIsWon] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [rewardWinMsg, setRewardWinMsg] = useState({
        msg: '',
        img: []
    })
    const [error, setError] = useState(null);
    const location = useLocation();
    const history = useHistory();


    const isUserAlreadyWon = async (id) => {
        const userDetails = await getUserById(id);
        console.log("userDetails", userDetails)
        if (userDetails.reward) {
            return true;
        } else {
            return false;
        }
    }
    useEffect(() => {
        (async () => {
            const { first_name, last_name, email, id } = location.state ?.detail || {};
            if (!first_name) {
                history.replace('/');
                //should remove it later
                // allRewards();
            } else {
                if (await isUserAlreadyWon(id)) {
                    history.replace('/');
                } else {
                    allRewards();
                    setFullName({ first_name, last_name });
                    setEmailUser(email);
                    setUserID(id);
                }
            }
        })();

    }, [history, location.state, isWon]);

    const allRewards = async () => {
        try {
            const responseRewards = await getRewards();
            console.log("responseRewards", responseRewards)
            setRewards(responseRewards)
        } catch (e) {
            setError(e.message);
        }

    }
    const winPrizeMsg = async (indicatedSegment) => {
        // Do basic alert of the segment text. You would probably want to do something more interesting with this information.

        const rewardObject = rewards.find(reward => reward.reward === indicatedSegment.text);
        rewardObject.quantity -= 1
        const emailDetails = {
            email: emailUser || 'houbara0@gmail.com',
            title: 'Welcome to hylabs booth',
            message: `Congratulations! \r\n You won: \r\n ${rewardObject.reward}.\r\n Come to claim your prize`,
            reward: rewardObject
        }
        setShowModal(true);
        setRewardWinMsg({
            msg: <div>
                <p>You won: </p>
                <h4>{rewardObject.reward}</h4>
                <p>We are waiting you at hylabs booth</p>
            </div>,
            img: [{
                image: `/images/fwd/${rewardObject.image}`,
                text: rewardObject.reward
            }]
        })

        const responseUser = await updateRewardUser(userID, indicatedSegment.text)
        const response = await sendEmail(emailDetails);
        console.log(response, responseUser)
    }


    return (
        <Container >
            <Backdrop
                show={showModal}
            />
            <Modal
                show={showModal}
            >
                <h3>Congratulations!</h3>
                {rewardWinMsg.msg}
                <RewardImages
                    imagesData={rewardWinMsg.img}
                    ColDivImageSize={5}
                />
                <Link to="/">Navigate to Home page</Link>
            </Modal>
            <Row>
                <ContainerMessage>
                    <h2>
                        Thank you {fullName.first_name} {fullName.last_name} for your participation
            </h2>
                    <h3>Click on the button to spin the wheel</h3>

                </ContainerMessage>
            </Row>
            <Row className="justify-content-center">

                <WinWheel
                    initalRewards={rewards}
                    alertPrize={winPrizeMsg}
                />
                {error && <Alert variant="danger">{error}</Alert>}

            </Row>
        </Container>
    );
};

export default ThankYou;

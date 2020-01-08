import React, { useEffect, useState } from 'react';
import { ContainerMessage } from './thank-you.style';
import { useLocation, useHistory, Link } from 'react-router-dom';
import useHTMLTitle from '../../hooks/use-html-title';
import { getRewards, getUserById, updateRewardUser, sendEmail } from '../../utils/api';
import { Button, Alert } from 'react-bootstrap';
import WinWheel from '../win-wheel';

const ThankYou = () => {
    useHTMLTitle('HyLabs - Thank You');

    const [fullName, setFullName] = useState({});
    const [emailUser, setEmailUser] = useState({});
    const [userID, setUserID] = useState({});
    const [rewards, setRewards] = useState([]);
    const [isWon, setIsWon] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const history = useHistory();


    useEffect(() => {
        allRewards()
        return () => {
            allRewards()
        }
    }, []);
    const isUserAlreadyWon = async (id) => {
        const userDetails = await getUserById(id);
        console.log("userDetails", userDetails)
        if (userDetails.reward) {
            setIsWon(true);
        } else {
            setIsWon(false);
        }
    }
    useEffect(() => {
        const { first_name, last_name, email, id } = location.state ?.detail || {};
        if (!first_name) {
            history.replace('/');
        } else {
            isUserAlreadyWon(id)
            console.log(isWon)
            if (isWon) {
                history.replace('/');
                console.log("yes - isWon")
            }
            else {
                console.log("no - isWon")
                setFullName({ first_name, last_name });
                setEmailUser(email);
                setUserID(id);
            }
        }
        return () => {
            isUserAlreadyWon(id)
        }
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
            title: 'You won - in hylabs lotto',
            message: `You won in ${indicatedSegment.text}.\r\n we are waiting you in hylabs booth.`,
            reward: rewardObject
        }
        alert('You won in:' + indicatedSegment.text);
        const responseUser = await updateRewardUser(userID, indicatedSegment.text)
        const response = await sendEmail(emailDetails);
        console.log(response, responseUser)
    }
    return (
        <>
            <ContainerMessage>
                <div id="test" style={{ margin: '0 auto', width: '100%', border: '1px solid blue' }}></div>
                <h2>
                    Thank you {fullName.first_name} {fullName.last_name} for your participation in
                    hylabs lotto
            </h2>
                <h3>Click on the button to spin the wheel</h3>
                <Link to="/">Home page</Link>
            </ContainerMessage>
            <WinWheel
                initalRewards={rewards}
                // emailUser={emailUser}
                // userId={userID}
                alertPrize={winPrizeMsg}
            />
            {error && <Alert variant="danger">{error}</Alert>}
        </>
    );
};

export default ThankYou;

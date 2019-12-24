import React, { useEffect, useState } from 'react';
import { getRewards, removeReward, updateReward, addReward } from '../../utils/api';
import { Button, Form, Table, Col } from 'react-bootstrap';
import MyForm, { MyAlert } from '../my-form';
import { rewardData } from './reward-data';
import FormReward from './form-reward'

const SetRewards = () => {
    const [rewards, setRewards] = useState([]);
    const [rewardUpdateState, setRewardUpdateState] = useState([]);
    const [newRewardForm, setNewRewardForm] = useState([]);
    const [addRewardBtn, setAddRewardBtn] = useState('Add new reward');
    const [error, setError] = useState(null);
    const [idReward, setIdReward] = useState({ id: null })

    const allRewards = async () => {
        try {
            const responseRewards = await getRewards();
            console.log("responseRewards", responseRewards)
            setRewards(responseRewards)
        } catch (e) {
            setError(e.message);
        }

    }
    useEffect(() => {
        allRewards()
    }, [])

    const handleSubmit = async (state) => {
        try {
            await addReward(state);
            resetStates();
            allRewards();
        } catch (e) {
            setError(e.message)
        }

    }
    const handleSubmitUpdate = async (state) => {
        try {
            state.id = idReward.id;
            console.log(state)
            await updateReward(state);
            resetStates();
            allRewards();
        } catch (e) {
            setError(e.message)
        }
    }

    const resetStates = () => {
        setRewardUpdateState([]);
        setNewRewardForm([]);
        setAddRewardBtn('Add new reward');
    }
    const handleRemoveReward = async (id) => {
        try {
            await removeReward(id);
            resetStates();
            allRewards();
        } catch (e) {
            setError(e.message)
        }


    }


    const handleNewReward = () => {
        setNewRewardForm((prevState) => {
            if (prevState.length) {
                setAddRewardBtn('Add new reward')
                return []
            }
            else {
                setAddRewardBtn('Cancel new reward');
                return rewardData;
            }
        })
    }

    const initalUpdateForm = (currentReward) => {
        //i'm not happy with this solution.
        console.log(currentReward)
        const rewardArr = Object.entries(currentReward);
        console.log(rewardArr)
        const rewardDataWithValue = rewardData.map((item, index) => {
            item.value = rewardArr[index + 1][1]
            return item;
        })
        setRewardUpdateState(rewardDataWithValue);
        setIdReward({ id: currentReward.id });
    }
    const rewardsTitle = rewards.length ? (
        <tr>
            <th>#</th>
            {Object.keys(rewards[0]).map((reward, index) =>
                <th key={index}>{reward.toUpperCase()}</th>
            )}
            <th >UPDATE</th>
            <th>REMOVE</th>
        </tr>
    ) : null

    let rowNum = 1;

    const rewardsTableContent = (<>
        {rewards.map((reward) =>
            <tr key={reward.id} id={reward.id}>
                <td>{rowNum++}</td>
                {Object.entries(reward).map((item, ind) =>
                    <td key={ind} name={item[0]}>
                        {item[1] || "Empty"}
                    </td>
                )}
                <td >
                    <Button variant="success" onClick={() => initalUpdateForm(reward)}>Update</Button>
                </td>
                <td >
                    <Button variant="danger" onClick={() => handleRemoveReward(reward.id)}>Remove</Button>
                </td>
            </tr>)
        }
    </>)

    return (
        <>
            < Table striped bordered hover size="sm" >
                <thead>
                    {rewardsTitle}
                </thead>
                <tbody>
                    {rewardsTableContent}
                </tbody>
            </Table >

           
            <Button variant="dark" onClick={handleNewReward}>{addRewardBtn}</Button>
            {newRewardForm.length ? <FormReward 
                formData={newRewardForm}
                handleCurrentSubmit={handleSubmit}
                submitText="Save new reward"
                error={error}
            /> :null}

            {rewardUpdateState.length ? <FormReward
                formData={rewardUpdateState}
                handleCurrentSubmit={handleSubmitUpdate}
                submitText="Save updated reward"
                error={error}
            /> : null}

            {error && <MyAlert variant="danger">{error}</MyAlert>}
        </>
    )
}

export default SetRewards;

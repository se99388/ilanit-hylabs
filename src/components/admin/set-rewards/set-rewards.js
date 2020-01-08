import React, { useEffect, useState } from 'react';
import { getRewards, removeReward, updateReward, addReward } from '../../../utils/api';
import { Button, Form, Table, Col } from 'react-bootstrap';
import MyForm, { MyAlert } from '../../my-form';
import { rewardData } from './reward-data';
import FormReward from './form-reward';
import WinWheel from '../../win-wheel';

const SetRewards = () => {
    const [rewards, setRewards] = useState([]);
    const [rewardUpdateState, setRewardUpdateState] = useState([]);
    const [newRewardForm, setNewRewardForm] = useState([]);
    const [addRewardBtn, setAddRewardBtn] = useState('Add new reward');
    const [error, setError] = useState(null);
    const [idReward, setIdReward] = useState({ id: null })

    const allRewards = async () => {
        console.log("start", rewardData)
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
            state.size = state.size || null;
            const response = await addReward(state);
            if (response.error) {
                setError(response.error)
            }
            else {
                setError(null);
                resetStates();
                allRewards();
            }

        }catch (e) {
            setError(e.message)
        }

    }
    const handleSubmitUpdate = async (state) => {
        try {
            state.id = idReward.id;
            state.size = state.size || null;
            const response = await updateReward(state);
            if (response.error){
                setError(response.error)
            }
            else{
                setError(null);
                resetStates();
                allRewards();
            }
            
        } catch (e) {
            console.log(e)
            setError(e.message)
        }
    }

    const resetStates = () => {
        setRewardUpdateState([]);
        setNewRewardForm([]);
        setError(null);
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
                resetStates()
                // setAddRewardBtn('Add new reward');
                // return []
            }
            else {
                setAddRewardBtn('Cancel new reward');
                return rewardData;
            }
        })
    }

    const initalUpdateForm = (currentReward) => {
        //i'm not happy with this solution.
        const rewardArr = Object.values(currentReward);
        let rewardDataWithValue = rewardData.map(obj => ({ ...obj }));
        
         rewardDataWithValue = rewardDataWithValue.map((item, index) => {
            item.value = rewardArr[index + 1]
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
                    <Button disabled={newRewardForm.length} variant="success" onClick={() => initalUpdateForm(reward)}>Update</Button>
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

           
            <Button disabled={rewardUpdateState.length} variant="dark" onClick={handleNewReward}>{addRewardBtn}</Button>

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

            {(!rewardUpdateState.length && !newRewardForm.length) && (error && <MyAlert variant="danger">{error}</MyAlert>)}

            <WinWheel initalRewards={rewards} />
        </>
    )
}

export default SetRewards;

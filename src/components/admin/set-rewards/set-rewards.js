import React, { useEffect, useState } from 'react';
import { getRewards, removeReward, updateReward, addReward } from '../../../utils/api';
import { Button,Table} from 'react-bootstrap';
import { MyAlert } from '../../my-form';
import { rewardData } from './reward-data';
import FormReward from './form-reward';
import WinWheel from '../../win-wheel';
import { getRewardsImages } from '../../../utils/api';
import {RewardsTable} from './set-rewards.styled';

const SetRewards = () => {
    const [rewards, setRewards] = useState([]);
    const [rewardUpdateState, setRewardUpdateState] = useState([]);
    const [newRewardForm, setNewRewardForm] = useState([]);
    const [addRewardBtn, setAddRewardBtn] = useState('Add new reward');
    const [error, setError] = useState(null);
    const [idReward, setIdReward] = useState(null);
    const [rewardImage, setRewardImage] = useState(null);
    const [rewardsImages,setRewardsImages] = useState([])
    const [obj,setObj] = useState({
        drones: [
            { a: 1, b: 2, lat: 3 },
            { a: 4, b: 5, lat: 6 },
            { a: 7, b: 8, lat: 9 }
        ],
        num2: null,
        num3: null 
    })
    

    const allRewards = async () => {
        console.log(obj);
        setObj((useThisState)=>{
            const newArr = useThisState.drones;
            newArr[0].lat = 10;
            // return {drones: newArr};
            return useThisState;
        })
        

        
        console.log(obj);


        try {
            const responseRewards = await getRewards();
            setRewards(responseRewards)
        } catch (e) {
            setError(e.message);
        }

    }
    useEffect(() => {
        allRewards()
    }, [])

    const allRewardsImages = async()=>{
        try{
            const responseImages = await getRewardsImages();
            setRewardsImages(responseImages);
        }catch(e){
            setError(e.message);
        }
      
    }
    const handleSubmit = (apiFunc, id = null) => async ({...newState}) => {

        try {
            newState.id = id;
            newState.size = newState.size === '' ? null : newState.size;
            const response = await apiFunc(newState);
            if (response.error) {
                setError(response.error)
            }
            else {
                setError(null);
                resetStates();
                allRewards();
            }

        } catch (e) {
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
                return [];
            }
            else {
                setAddRewardBtn('Cancel new reward');
                return rewardData;
            }
        });
        allRewardsImages();
    }

    const initalUpdateForm = (currentReward) => {
        let rewardDataWithValue = rewardData.map(obj=>{return{...obj}});
         rewardDataWithValue = rewardDataWithValue.map((item) => {
             item.value = currentReward[item.name];
            return item;
        });
        setRewardUpdateState(rewardDataWithValue);
        setIdReward(currentReward.id);
        setRewardImage(currentReward.image);
        allRewardsImages();
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
                {Object.entries(reward).map((item, index) =>
                    <td key={index} name={item[0]}>
                        {item[1] || "Empty"}
                    </td>
                )}
                <td >
                    <Button disabled={newRewardForm.length} variant="success" 
                    onClick={() => initalUpdateForm(reward)}
                    
                    >Update</Button>
                </td>
                <td >
                    <Button variant="danger" onClick={() => handleRemoveReward(reward.id)}>Remove</Button>
                </td>
            </tr>)
        }
    </>)

    return (
        <>
            < RewardsTable striped bordered hover size="sm" className='rewardsTable' responsive="sm">
                <thead>
                    {rewardsTitle}
                </thead>
                <tbody>
                    {rewardsTableContent}
                </tbody>
            </RewardsTable >

           
            <Button disabled={rewardUpdateState.length} variant="dark" onClick={handleNewReward}>{addRewardBtn}</Button>

            {newRewardForm.length ? <FormReward 
                formData={newRewardForm}
                rewardsImages={rewardsImages}
                handleCurrentSubmit={handleSubmit(addReward)}
                submitText="Save new reward"
                error={error}
            /> :null}

            {rewardUpdateState.length ? <FormReward
                formData={rewardUpdateState}
                rewardsImages={rewardsImages}
                handleCurrentSubmit={handleSubmit(updateReward,idReward)}
                submitText="Save updated reward"
                rewardImageSelected={rewardImage}
                error={error}
            /> : null}

            {(!rewardUpdateState.length && !newRewardForm.length) && (error && <MyAlert variant="danger">{error}</MyAlert>)}

            <WinWheel initalRewards={rewards} />
        </>
    )
}

export default SetRewards;

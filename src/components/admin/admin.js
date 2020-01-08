import React from 'react';
import SetRewards from './set-rewards';
import { Button } from 'react-bootstrap';
import {logout} from '../../utils/api';
import { useHistory } from 'react-router-dom';


const Admin = () => {
    const history = useHistory()
    const logoutHandle = async()=>{
        const response = await logout();
        console.log(response);
        if (response.success){
            history.push('/login')
        }else{
            alert ('Error')
        }
    }
    return(  <>
        <Button onClick={logoutHandle}>Log out </Button>
        <div>
    <SetRewards />
    </div>
      
    </>)
};

export default Admin;

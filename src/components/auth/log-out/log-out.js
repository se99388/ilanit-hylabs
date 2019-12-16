import React from 'react';
import {Redirect} from 'react-router-dom';
import { removeFromLocalStorage, STORAGE_TOKEN_NAME} from '../../../utils/storage';

const LogOut = ({ isAuth}) =>{
    
    removeFromLocalStorage(STORAGE_TOKEN_NAME);
    isAuth(false);
    //How can I delete the Lotto state? if i go back the Lotto cmponent will show up because the "useLocation().state" has a value
    return (<Redirect to='./auth' />)
}

export default LogOut;
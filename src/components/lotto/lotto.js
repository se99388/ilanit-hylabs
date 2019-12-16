import React, { useEffect} from 'react';
import useTitle from '../../hooks/use-html-title';
import { useLocation,useHistory } from 'react-router-dom';
import { STORAGE_TOKEN_NAME, getFromLocalStorage } from '../../utils/storage';
const Lotto = ({ isAuth})=>{
    useTitle('lotto');
    const token = useLocation().state;
    const history = useHistory();
    const tokenFromStorage = getFromLocalStorage(STORAGE_TOKEN_NAME)
    useEffect(() => {
      
            if(tokenFromStorage || token) {
                isAuth(true)
            } 
            else{
                isAuth(false) 
                history.replace('./auth');
            } 
    }, [])
    console.log("useLocation().state", useLocation().state)
    

    
    return(
        <div>Lotto page</div>
    )
}

export default Lotto;
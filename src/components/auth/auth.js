import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { loginData } from '../../utils/form-data';
import { useHistory } from 'react-router-dom'
import { tokenExample, getOrdersSample } from '../../utils/api';
import Spinner from '../../utils/spinner/Spinner';
import useTitle from '../../hooks/use-html-title';
import useFormTemplate from '../../hooks/use-form-template';
import {CentralItem} from './auth.style';
import {setToLocalStorage, STORAGE_TOKEN_NAME, getFromLocalStorage} from '../../utils/storage';



const Auth = () => {

    const [isSignin, setIsSignin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [signinToken, setSigninToken] = useState({
        tokenId: ''
    });

    useEffect(()=>{
        const tokenFromStorage = getFromLocalStorage(STORAGE_TOKEN_NAME)
        if (tokenFromStorage){
            setSigninToken({ tokenId: tokenFromStorage})
        }
    },[])

    const handleMySubmit = async (e) => {
        try {
            setIsLoading(true)
            const response = await tokenExample({
                email: e.email,
                password: e.password,
                returnSecureToken: true
            }, isSignin);
            console.log(response)

            setSigninToken({
                tokenId: response.idToken
            });

            setError(null);
        } catch (e) {
            console.log(e);
            setError(e.response.data.error.message);
            setIsLoading(false)
        }

    }
    const [form, setError] = useFormTemplate(loginData, handleMySubmit);

    let formType = {};

    if (isSignin) {
        formType.title = 'Sign-in';
        formType.button = 'Sign-up'
    }
    else {
        formType.title = 'Sign-up';
        formType.button = 'Sign-in'
    }

    useTitle(formType.title)


    const isInitialMount = useRef(true);
    const history = useHistory();
    console.log(history)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setToLocalStorage(STORAGE_TOKEN_NAME , signinToken.tokenId)
            getOrders();

        }
    }, [signinToken]);


    const getOrders = async () => {
        const orders = await getOrdersSample(signinToken.tokenId)
        console.log(orders)
        setIsLoading(false)
        history.push('./lotto', signinToken.tokenId)

    }
    

    const swithAuthModeHandler = () => {
        setIsSignin(prevIsSignin => !prevIsSignin)
    }

    return (
        <>
            {isLoading ? <Spinner /> :
                <div>
                    <h2>{formType.title}</h2>
                    {form}
                    <br />
                    <CentralItem>
                    < Button variant="danger"
                        onClick={swithAuthModeHandler}
                    >
                        Switch to {formType.button}
                    </Button>
                        </ CentralItem>
                </div>
            }
        </>
    )
}

export default Auth;
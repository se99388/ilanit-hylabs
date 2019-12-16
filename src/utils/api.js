import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
});

const handler = async options => {
    try {
        const result = await instance(options);
        return result.data;
    } catch (ex) {
        console.log('Ofir', ex.message);
        throw ex;
        // log error
    }
};

export const getUsers = () => {
    return handler({
        url: '/users'
    });
};

export const getInterests = () => {
    return handler({
        url: '/interests'
    });
};

export const addUser = value => {
    return handler({
        url: '/users',
        method: 'post',
        data: value
    });
};

export const tokenExample = (data, isSignup)=>{
   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB43pcbc6rvUWBlh65vsnuxVvE4uNYhn7Q';
    if (isSignup){
        console.log('i am sign in ')
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB43pcbc6rvUWBlh65vsnuxVvE4uNYhn7Q'  
    }
    return handler({
        baseURL: url,
        method:'POST',
        data: data
    })
}


export const getOrdersSample = (token) => {
console.log("token",token)
    return handler({
        baseURL: `https://react-my-burger-6e473.firebaseio.com/orders.json?auth=${token}`,
        method: 'GET',
    })
}

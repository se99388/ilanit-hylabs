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

export const addUser = (value)=>{
    // axios.post("/api/users", value)
    //  .then(res => console.log(res.data));
    return handler({
        url:'/users',
        method:'post',
        data: value
    })
}

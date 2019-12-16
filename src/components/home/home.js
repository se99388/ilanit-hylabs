import React, { useEffect, useState } from 'react';
import { addUser, getInterests } from '../../utils/api';
import { withRouter } from 'react-router-dom';
import useHTMLTitle from '../../hooks/use-html-title';
import formData, { allData, getInitialFormValues } from '../../utils/form-data';
import useFormTemplate from '../../hooks/use-form-template';

const Home = () => {
    useHTMLTitle('HyLabs - Home');
    const [formData, setFormData] = useState([]);
    
    useEffect(() => {    
      
            (async () => {
                const data = await allData()
                setFormData(data)
            })()

    }, [])



    const handleMySubmit = async values => {
        try {
            console.log('values', values);
            // const response = await addUser(values);
            // console.log('response', response);
            // //validation error
            // if (response.error) {
            //     setError(response.error);
            // } else {
            //     setError(null);
            //     props.history.push({
            //         pathname: '/thankyou',
            //         state: { detail: response }
            //     });
            // }
        } catch (e) {
            // console.log("e", e)
            setError(e.message);
        }
    };

    const [form, setError] = useFormTemplate(formData, handleMySubmit);
    return (
        <>
            {form}
        </>
    );
};

export default withRouter(Home);

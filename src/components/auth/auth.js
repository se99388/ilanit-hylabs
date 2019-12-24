import React, { useState } from 'react';
import MyForm, { MyAlert } from '../my-form';
import { Form } from 'react-bootstrap';
import { authData } from './auth-data';
import useTitle from '../../hooks/use-html-title';



const Auth = () => {

    useTitle('Authorization');
    const [error, setError] = useState(null);


    const handleMySubmit = async (e) => {
        console.log(e)
    }

    return (
        <>
            <MyForm
                formData={authData}
                handleCurrentSubmit={handleMySubmit}
                submitText="Log-in"
                error={error}
                renderFormControls={(errors, touched, handleChange, handleBlur) => {
                    const allFormData = authData.map((item, key) => (
                        <Form.Group key={key}>
                            <Form.Label>{item.label}</Form.Label>

                            <Form.Control
                                type={item.type}
                                name={item.name}
                                placeholder={item.placeholder}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors[item.name] && touched[item.name] && (
                                <MyAlert variant="danger">{errors[item.name]}</MyAlert>
                            )}
                        </Form.Group>
                    ));
                    return allFormData;
                }}
            />
        </>
    )
}

export default Auth;
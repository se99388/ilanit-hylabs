import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addUser } from '../../utils/api';
import { MyForm, MyAlert } from './home.style';
import { Formik } from 'formik';
import schemaYup from '../../utils/validation-form';
import { withRouter } from 'react-router-dom';
import useHTMLTitle from '../../hooks/use-html-title';
import formData, { getInitialFormValues } from '../../utils/form-data';

const Home = props => {
    useHTMLTitle('HyLabs - Home');

    const [error, setError] = useState(null);

    const handleMySubmit = async values => {
        try {
            const response = await addUser(values);
            console.log('response', response);
            //validation error
            if (response.error) {
                setError(response.error);
            } else {
                setError(null);
                props.history.push({
                    pathname: '/thankyou',
                    state: { detail: response }
                });
            }
        } catch (e) {
            // console.log("e", e)
            setError(e.message);
        }
    };

    const isValuesExist = values => {
        for (let key in values) {
            if (values[key] !== '') {
                return true;
            }
        }
        return false;
    };

    return (
        <Formik
            validationSchema={schemaYup()}
            initialValues={getInitialFormValues()}
            onSubmit={handleMySubmit}
        >
            {({ handleSubmit, errors, touched, values, handleBlur, handleChange }) => {
                return (
                    <MyForm onSubmit={handleSubmit}>
                        {formData.map((item, key) => {
                            return (
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
                            );
                        })}
                        {error && <MyAlert variant="danger">{error}</MyAlert>}
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!isValuesExist(values) || Object.keys(errors).length}
                        >
                            Submit
                        </Button>
                    </MyForm>
                );
            }}
        </Formik>
    );
};

export default withRouter(Home);

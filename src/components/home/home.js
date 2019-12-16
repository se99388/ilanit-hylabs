import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { getInterests } from '../../utils/api';
import useHTMLTitle from '../../hooks/use-html-title';
import { formData } from './form-data';
import MyForm, { MyAlert } from '../my-form';

const Home = () => {
    useHTMLTitle('HyLabs - Home');
    const [interests, setInterests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const interests = await getInterests();
            const allInt = interests.map(item => {
                return {
                    type: 'checkbox',
                    label: item.name,
                    name: item.name,
                    id: item.id
                };
            });

            setInterests(allInt);
        })();
    }, []);

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

    return (
        <MyForm
            formData={formData}
            handleCurrentSubmit={handleMySubmit}
            submitText="Submit"
            error={error}
            renderFormControls={(errors, touched, handleChange, handleBlur) => {
                const allFormData = formData.map((item, key) => (
                    <>
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
                    </>
                ));

                if (interests.length) {
                    allFormData.push(
                        <>
                            <Form.Label>Interested in:</Form.Label>
                            {interests.map((interest, interestKey) => (
                                <div key={interestKey} className="mb-3">
                                    <Form.Check
                                        type={interest.type}
                                        id={interest.id}
                                        label={interest.label}
                                        name="interests"
                                        onChange={handleChange}
                                        value={interest.id}
                                    />
                                </div>
                            ))}
                        </>
                    );
                }

                return allFormData;
            }}
        />
    );
};

export default withRouter(Home);

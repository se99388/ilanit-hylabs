import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { getInterests, addUser } from '../../utils/api';
import useHTMLTitle from '../../hooks/use-html-title';
import { formData } from './form-data';
import MyForm, { MyAlert } from '../my-form';
import { InterestCol,color } from './home.styled'

const Home = (props) => {
    useHTMLTitle('HyLabs - Home');
    const [interests, setInterests] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
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
            } catch (e) {
                setError(e.message);
            }

        })();
    }, []);

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
    const handleChecked = (e) => {
        const idItem = parseInt(e.target.id);
        const isChecked = e.target.checked;
        setCheckedItems(new Map(checkedItems.set(idItem, isChecked)))
    }
    
    return (
        <MyForm
            formData={formData}
            handleCurrentSubmit={handleMySubmit}
            submitText="Submit"
            error={error}
            renderFormControls={(errors, touched, handleChange, handleBlur) => {
                const allFormData = formData.map((item, key) => (
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

                if (interests.length) {
                    allFormData.push(
                        <Form.Group key={allFormData.length}>
                            <Form.Label >Field of interests:</Form.Label>
                            <Row className='mb-3'>
                                {interests.map((interest) => (
                                    <InterestCol key={interest.id} xs='auto'
                                        backgroundcolor={checkedItems.get(interest.id) == true ? color : null}
                                    >
                                        <Form.Check
                                            checked={checkedItems.get(interest.id)}
                                            type={interest.type}
                                            id={interest.id}
                                            label={interest.label}
                                            name="interests"
                                            onChange={handleChange}
                                            value={interest.id}
                                            onClick={handleChecked}
                                        />
                                    </InterestCol>
                                ))}
                            </Row>
                        </Form.Group>
                    );
                }

                return allFormData;
            }}
        />
    );
};

export default withRouter(Home);

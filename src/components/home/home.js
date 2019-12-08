import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addUser } from '../../utils/api';
import { MyForm, MyAlert } from './home.style';
import { Formik } from 'formik';
import userDetailsArr from '../../models/userDetails';
import schemaYup from '../../utils/validationForm';
import { withRouter } from 'react-router-dom';


const Home = (props) => {
    const [error, setError] = useState(null);
    const createInitailVaules = () => {
        return userDetailsArr.reduce((accum, cuurentVal) => {
            accum[cuurentVal] = '';
            return accum;
        }, {})
    }

    const createFormData = () => {
        const formData = [
            { type: 'text', label: 'First name:', placeholder: "Enter first name" },
            { type: 'text', label: 'Last name:', placeholder: "Enter last name" },
            { type: 'text', label: 'Email:', placeholder: "Enter email" },
            { type: 'text', label: 'Phone:', placeholder: "Enter phone No." },
            { type: 'text', label: 'Institute/Company', placeholder: "Enter Institute/Company" },
            { type: 'text', label: 'Lab', placeholder: "Enter lab" },
        ]
        for (let i = 0; i < userDetailsArr.length; i++) {
            formData[i].name = userDetailsArr[i]
        }
        return formData;
    }

    const handleMySubmit = async (values) => {
        try {
            const response = await addUser(values);
            if (response.errors) {
                setError(response.errors)
            }
            else if (response.name === 'error') {
                if (response.code === "23505") {
                    response.detail = response.detail.replace(/[\(\)]|Key/g, '').replace(/=/g, ' ');
                }
                setError(response.detail)
            }
            else {
                setError(null);
                props.history.push({
                    pathname: '/thankYou',
                    state: { detail: response }
                })

            }
            console.log(response)
        }
        catch (e) {
            setError(e.message);
        }
    }

    const isValuesExist = (values) => {
        for (let key in values) {
            if (values[key] !== '') {
                return true;
            }
        }
        return false;
    }
    return (
        <Formik
            validationSchema={schemaYup(...userDetailsArr)}
            initialValues={createInitailVaules()}
            onSubmit={handleMySubmit}
        >
            {({ handleSubmit,
                errors,
                touched,
                values,
                handleBlur,
                handleChange }) => {

                return (
                    <MyForm onSubmit={handleSubmit}>

                        {createFormData().map((item, key) => {
                            return (<Form.Group key={key}>
                                <Form.Label>{item.label}</Form.Label>
                                <Form.Control
                                    type={item.type}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(errors[item.name]) && touched[item.name] && <MyAlert variant='danger'>
                                    {errors[item.name]}
                                </MyAlert>}
                            </Form.Group>
                            )
                        })}
                        {error && <MyAlert variant='danger'>
                            {error}
                        </MyAlert>}
                        <Button variant="primary" type="submit"
                            disabled={(!isValuesExist(values) || Object.keys(errors).length)}
                        >
                            Submit
                            </Button>
                    </MyForm>
                )
            }}
        </Formik>
    );
};

export default withRouter(Home);


// const [users, setUsers] = useState([]);
// const [interests, setInterests] = useState([]);

// const clickTest = async () => {
//     try {
//         const users = await getUsers();
//         setUsers(users);
//     } catch (ex) {
//         console.log('error with users');
//     }
// };

// const clickTest2 = async () => {
//     try {
//         const interests = await getInterests();
//         setInterests(interests);
//     } catch (ex) { }
// };

/* {users.map(user => (
                <UserBox key={user.id}>{`${user.first_name} ${user.last_name}`}</UserBox>
            ))}
            {interests.map(int => (
                <UserBox key={int.id}>{int.name}</UserBox>
            ))} */
/* <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" name={FIRST_NAME} placeholder="Enter first name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors[FIRST_NAME] && <Alert variant='danger'>
                                {errors[FIRST_NAME]}
                            </Alert>}

                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" name={LAST_NAME} placeholder="Enter last name"
                                    onChange={handleChange}
                                />

                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name={EMAIL}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control type="text" name={PHONE} placeholder="Enter phone number"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Institute/Company</Form.Label>
                                <Form.Control type="text" name={[INSTITUTE]} placeholder="Enter Institute/Company"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Lab</Form.Label>
                                <Form.Control type="text" name={LAB} placeholder="Enter lab"
                                    onChange={handleChange}
                                />
                            </Form.Group> */
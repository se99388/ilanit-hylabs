import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../utils/api';
import { useHistory } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onChangeInput = setValue => e => setValue(e.target.value);

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={onChangeInput(setEmail)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangeInput(setPassword)}
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                onClick={async e => {
                    e.preventDefault();
                    const res = await login(email, password);
                    if (res.success) {
                        setIsAuth(true);
                        history.push('/admin');
                    } else {
                        alert('No');
                    }
                }}
            >
                Submit
            </Button>
        </Form>
    );
};

export default Login;

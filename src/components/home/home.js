import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getUsers, getInterests } from '../../utils/api';
import { Container, UserBox } from './home.style';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [interests, setInterests] = useState([]);

    const clickTest = async () => {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (ex) {
            console.log('error with users');
        }
    };

    const clickTest2 = async () => {
        try {
            const interests = await getInterests();
            setInterests(interests);
        } catch (ex) {}
    };

    return (
        <Container>
            {users.map(user => (
                <UserBox key={user.id}>{`${user.first_name} ${user.last_name}`}</UserBox>
            ))}
            {interests.map(int => (
                <UserBox key={int.id}>{int.name}</UserBox>
            ))}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" onClick={clickTest}>
                    Show users
                </Button>
                <Button variant="primary" onClick={clickTest2}>
                    Show users
                </Button>
            </Form>
        </Container>
    );
};

export default Home;

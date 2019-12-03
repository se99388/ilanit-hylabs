import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Home from './home';

const App = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src="/images/hylabs-logo-s.png" />
                </Col>
            </Row>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Container>
    );
};

export default App;

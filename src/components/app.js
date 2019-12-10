import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ThankYou from './thank-you';
import Home from './home';

const App = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src="/images/hylabs-logo-s.png" />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/thankyou">
                            <ThankYou />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default App;

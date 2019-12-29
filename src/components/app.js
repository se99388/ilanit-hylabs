import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ThankYou from './thank-you';
import Lotto from './lotto';
import Home from './home';
import Login from './login';
import Admin from './admin';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

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
                        <Route exact path="/lotto">
                            <Lotto />
                        </Route>
                        <Route exact path="/login">
                            <Login setIsAuth={setIsAuth} />
                        </Route>
                        <Route
                            exact
                            path="/admin"
                            render={props => {
                                if (isAuth) {
                                    return <Admin />;
                                } else {
                                    return <Redirect to="/login" />;
                                }
                            }}
                        />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default App;

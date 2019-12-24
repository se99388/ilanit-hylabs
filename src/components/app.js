import React, { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ThankYou from './thank-you';
import Auth from './auth';
import Lotto from './lotto';
import LogOut from './auth/log-out';
import Home from './home';
import SetRewards from './set-rewards';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <Container>
            <Row>
                <Col>
                    <Image src="/images/hylabs-logo-s.png" />
                </Col>
                {isAuth && (
                    <Col>
                        <Link to="./log-out">
                            <h4>Log out</h4>{' '}
                        </Link>
                    </Col>
                )}
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/auth">
                            <Auth />
                        </Route>
                        <Route exact path="/thankyou">
                          <ThankYou />
                        </Route>
                        <Route exact path="/lotto">
                            <Lotto isAuth={setIsAuth} />
                        </Route>
                        <Route exact path="/set-rewards">
                            <SetRewards />
                        </Route>
                        <Route exact path="/log-out">
                            <LogOut isAuth={setIsAuth} />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default App;

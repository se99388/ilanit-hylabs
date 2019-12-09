import React,{useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ThankYou from './thankYou/thankYou';
import Home from './home';

const App = () => {
    const [auth,setAuth] = useState(false);
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
                            <Home authCb={setAuth} />
                        </Route>
                        {auth &&<Route exact path="/thankYou">
                            <ThankYou />
                        </Route>}
                        <Redirect to="/" />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default App;

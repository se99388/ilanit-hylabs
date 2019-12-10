import React, { useEffect, useState } from 'react';
import { ContainerMessage } from './thank-you.style';
import { useLocation, useHistory, Link } from 'react-router-dom';
import useHTMLTitle from '../../hooks/use-html-title';

const ThankYou = () => {
    useHTMLTitle('HyLabs - Thank You');

    const [fullName, setFullName] = useState({});

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const { first_name, last_name } = location.state?.detail || {};
        if (!first_name) {
            history.replace('/');
        } else {
            setFullName({ first_name, last_name });
        }
    }, [history, location.state]);

    return (
        <ContainerMessage>
            <h2>
                Thank you {fullName.first_name} {fullName.last_name} for your participation in
                hylabs lotto
            </h2>
            <h3>Don't forget visiting our booth in Ilanit conference</h3>
            <Link to="/">Home page</Link>
        </ContainerMessage>
    );
};

export default ThankYou;

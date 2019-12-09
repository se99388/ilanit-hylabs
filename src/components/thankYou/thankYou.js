import React from 'react';
import { ContainerMessage } from './thankYou.style';
import { withRouter, Link } from 'react-router-dom';


const ThankYou = ({location}) => {
    console.log(location)
    let first_name, last_name = null;
    if (location.state.detail) {
      ({ first_name,last_name} = location.state.detail);
    }
    console.log(first_name, last_name)
    return (
        <ContainerMessage >
            <h2>Thank you {first_name} {last_name} for your participation in hylabs lotto</h2>
            <h3>Don't forget visiting our booth in Ilanit conference</h3>
            <Link to="/">Home page</Link>
        </ ContainerMessage>
    );
};

export default withRouter(ThankYou);

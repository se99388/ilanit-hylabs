import React from 'react';
import { withRouter, Link } from 'react-router-dom';


const ThankYou = (props) => {

    let details = {
        firstName: '',
        lastName: ''
    }
    if (props.location.state.detail) {
        details.firstName = props.location.state.detail[0].first_name;
        details.lastName = props.location.state.detail[0].last_name;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Thank you {details.firstName} {details.lastName} for your participation in hylabs lotto</h2>
            <h3>Don't forget visiting our booth in Ilanit conference</h3>
            <Link to="/">Home page</Link>
        </div>
    );
};

export default withRouter(ThankYou);

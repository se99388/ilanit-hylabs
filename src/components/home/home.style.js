import styled from 'styled-components';
import { Form,Alert } from 'react-bootstrap';

export const UserBox = styled.div`
    border: 1px solid black;
    padding: 5px;
    font-size: 18px;
    color: red;
`;

export const MyForm = styled(Form)({
    padding: '10px 20px',
    border: '1px solid grey',
    borderRadius: '10px'
});

export const MyAlert = styled(Alert)({
    marginTop:'5px'
})

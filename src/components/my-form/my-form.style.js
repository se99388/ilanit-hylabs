import styled from 'styled-components';
import { Form, Alert, Container, Button } from 'react-bootstrap';

export const ContainerForm = styled(Form)({
    padding: '10px 20px',
    border: '1px solid grey',
    borderRadius: '10px'
});

export const MyAlert = styled(Alert)({
    marginTop: '5px'
});

export const MyButton = styled(Button)`
&:disabled{
background-color: grey;
border-color: grey;
}
`

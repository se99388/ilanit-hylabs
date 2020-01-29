import styled from 'styled-components';
import { Form, Col } from 'react-bootstrap';


export const color = 'blue';
export const fontWeight = 'bold';

export const InterestCol = styled(Col)((props)=>`
background-color: ${props.backgroundcolor};
font-weight: ${props.fontWeight};
margin-right:2px;
border-radius:5px;
margin: 1px;

`)
import styled from 'styled-components';
import {Col, Button} from 'react-bootstrap';
import wheel_back from './wheel_back_1.png';

export const Canvas = styled('canvas')`
width:434px;
height:434px;
margin-top:74px;
`

export const ColwheelBack = styled(Col)`
width:438px;
height:570px
margin: 0px;
padding: 0px;
background-image: url(${wheel_back});
    background-position: 'center';
    background-repeat: 'none';

    vertical-align:"center"
`
export const MyButton = styled(Button)`
width:100%;
`



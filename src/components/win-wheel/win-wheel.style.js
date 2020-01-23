import styled from 'styled-components';
import {Col, Button} from 'react-bootstrap';
import wheel_back from './wheel_back_1.png';

export const Canvas = styled.canvas`
width:434px;
height:434px;
margin-top:74px;
margin-left:1px;
`

export const ColwheelBack = styled(Col)`
width:434px;
height:570px
margin: 0px;
padding: 0px;
background-image: url(${wheel_back});
    background-position: 'center';
    background-repeat: 'none';

    vertical-align:"center";
`
export const MyDiv = styled('div')`
height: 20%;
position: absolute;
width: 50%;
left: calc(50% - 25%);
top: calc(50% - 10%);
z-index:100;   
`

export const MyButton = styled(Button)`
width: 100%;
height: 100%
 font-weight: bold;
 font-size:50px;
 border: 3px solid black;
 border-radius: 100px;
   background: rgba(133, 168, 186, 0.8);
   color: white;

`



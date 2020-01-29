import styled from 'styled-components';
import {Col, Button} from 'react-bootstrap';
import wheel_back from './wheel_back_1.png';


export const Canvas = styled.canvas`
/* width:380px;
height:380px;  */
margin-top:65px;
`
export const ColwheelBack = styled(Col)`
width:375px;
height:500px
margin: 0px;
padding: 0px;
background-image: url(${wheel_back});
/* background-size: contain; */
background-size: cover;
    /* background-position: 'center';
    background-repeat: 'none';

    vertical-align:"center"; */
`

export const Canvas2 = styled.canvas`
width:430px;
height:430px; 
margin-top:75px;
margin-left:2.5px;
`

export const ColwheelBack2 = styled(Col)`
width:434px;
height:580px
margin: 0px;
padding: 0px;
background-image: url(${wheel_back});
background-size: cover;
    /* background-position: 'center';
    background-repeat: 'none';
    vertical-align:"center"; */
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



import styled from 'styled-components';



export const ModalDiv = styled.div(props=>(`
position:fixed;
width:80%;
left:10%;
top:30%;
border: 1px solid #ccc;
background-color: #ffe6ff;
padding: 16px;
box-shadow: 5px 5px 5px black;
z-index:500;
transition: all 0.5s ease-out;
transform: ${props.transform};
opacity:${props.opacity};
text-align:center;
`))




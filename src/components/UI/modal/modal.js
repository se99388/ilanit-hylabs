import React from 'react';
import { ModalDiv} from './modal.style.js';

const Modal = ({ show, children})=>{

    return (
        <ModalDiv 
        transform ={show ? 'translateY(0)' :'translateY(-100vh)'}
            opacity={show ? 1 : 0}
        >
           {children}
        </ModalDiv>
    )
}

export default Modal;
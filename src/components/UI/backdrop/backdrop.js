import React from 'react';
import { BackdropDiv} from './backdrop.style';

const Backdrop = ({ show})=>{

    return (
        show && <BackdropDiv />
    )
}

export default Backdrop;
import React from 'react';
import { Row } from 'react-bootstrap';
import { ColDivImage, MyImage} from './rewards-images.style';
const RewardsImages = ({imagesData}) =>{
    console.log("imagesData", imagesData)

    const imagesDisplay = imagesData.map((image, index)=>{
        return (
            <ColDivImage key={index} 
                xs={3} 
             >
                <MyImage src={image.image} 
                thumbnail
                />
                {/* <p>{image.text}</p> */}
            </ColDivImage>

        )
    })
    return(
        <Row className="justify-content-center">
            {imagesDisplay}
        </Row>
    )
} 

export default RewardsImages;
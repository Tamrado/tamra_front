import React from 'react';
import ImageBox from './ImageBox';
import ImageContent from './ImageContent';
const ImageList = ({image,cancel,change,handlePhotoDelete}) => {
    const imageList = image.map(
        (item)=>(
        <ImageBox key = {item.get('url')} image={item} cancel = {cancel} handlePhotoDelete={handlePhotoDelete} />
        )
    )
    return(
        <ImageContent change = {change}>
            {imageList}
        </ImageContent>
    );
}
export default ImageList;
import React from 'react';
import ImageBox from './ImageBox';
import ImageContent from './ImageContent';
const ImageList = ({image,cancel,change}) => {
    const imageList = image.map(
        (item)=>(
        <ImageBox key = {item.get('url')} image={item} cancel = {cancel} />
        )
    )
    return(
        <ImageContent change = {change}>
            {imageList}
        </ImageContent>
    );
}
export default ImageList;
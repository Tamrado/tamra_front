import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';
import deleteImage from '../../build/static/images/iconmonstr-x-mark-1-240.png';
const PhotoBox = styled.div`
position: relative;
width : 200px;
height: 200px;
margin-bottom : 10px;
background-image: url(${props => props.image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover{
    background-image: url(${deleteImage});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
}
`;

const ImageBox = ({image,handlePhotoDelete}) => {
    const {
        url
    } = image.toJS();
    return(
    <PhotoBox id = {url} image = {url} onClick = {handlePhotoDelete}/>
    )
};
export default scuize(ImageBox, function(nextProps, nextState){
    return this.props.image !== nextProps.image;
});
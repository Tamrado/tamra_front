import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';

const PhotoBox = styled.img`
position: relative;
width : 200px;
height: 200px;
margin-bottom : 10px;
`;

const ImageBox = ({image}) => {
    const {
        url
    } = image.toJS();
    return(
    <PhotoBox src = {url}/>
    )
};
export default scuize(ImageBox, function(nextProps, nextState){
    return this.props.image !== nextProps.image;
});
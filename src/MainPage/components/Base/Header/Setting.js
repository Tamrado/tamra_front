import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SettingImage = styled(Link)`
width : ${props => props.size};
height : ${props => props.size};
margin-right : 10px;
background-image: url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${props => props.hoverimg});
}
`;
const Setting = ({image,onclick,size,hoverimg}) => (
    <SettingImage src = {image} size = {size} onClick = {onclick} hoverimg={hoverimg} />
);

export default Setting;
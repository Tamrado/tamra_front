import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SettingImage = styled(Link)`
width : ${props => props.size};
left : 0;
float : left;
height : ${props => props.size};
margin-right : 0.5rem;
background-image: url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${props => props.hoverimg});
    width : ${props => props.size};
    height : ${props => props.size};
    background-size: cover;
background-position: center;
background-repeat: no-repeat;
}
`;
const Setting = ({image,onclick,size,hoverimg}) => (
    <SettingImage src = {image} size = {size} onClick = {onclick} hoverimg={hoverimg} />
);

export default Setting;
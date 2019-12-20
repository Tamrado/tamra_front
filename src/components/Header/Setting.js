import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SettingImage = styled.a`
width : ${props => props.size};
height : ${props => props.size};
margin-right: 20px;
left : 0;
cursor: pointer;
float : left;
background: #ffffff;

background-image: url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:active {
    background-image: url(${props => props.hoverimg});
}


`;
const Setting = ({image,onclick,size,hoverimg}) => (
    <div>
    <SettingImage src = {image} size = {size} onClick = {onclick} hoverimg={hoverimg} />
    </div>
);

export default Setting;
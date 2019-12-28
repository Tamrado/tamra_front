import React from 'react';
import styled from 'styled-components';


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
const AlarmNum = styled.div`
position: absolute;
    width: 15px;
    align-items: center;
    text-align: center;
    height: 15px;
    top: 7px;
    border-radius: 50%;
    background: #FF0404;
    line-height: 15px;
    margin-left : 15px;
    display : ${props => props.visible};
`;
const Setting = ({image,onclick,size,hoverimg,alarmNum,resultvisible}) => (
    <div>
    <SettingImage src = {image} size = {size} onClick = {onclick} hoverimg={hoverimg}/>
    <AlarmNum visible = {resultvisible}>{alarmNum}</AlarmNum>
    </div>
);

export default Setting;
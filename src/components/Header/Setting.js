import React from 'react';
import styled from 'styled-components';


const SettingImage = styled.a`
width : ${props => props.size};
height : ${props => props.size};
margin-right: 20px;
margin-left : ${props => props.left};
left : 0;
cursor: pointer;
float : left;
background: #ffffff;

background-image: url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${props => props.hoverimg});
}
`;
const Triangle = styled.div`
max-width: 16px;
position: absolute;
    top: 45px;
    margin-left: 5px;
height: 12px;
z-index: 30;
display : ${props => props.visible};
border-bottom: solid 12px rgba(18,184,134,0.7);
border-left: solid 12px transparent;
border-right: solid 12px transparent;
}
`;
const AlarmNum = styled.div`
position: absolute;
    width: 16px;
    align-items: center;
    text-align: center;
    height: 16px;
    font-weight: bold;
    top: 7px;
    border-radius: 50%;
    background: #FF0404;
    font-size: 13px;
    line-height: 15px;
    margin-left : 15px;
    display : ${props => props.visible};
`;
const Setting = ({image,onclick,size,hoverimg,alarmNum,resultvisible,tvisible,left}) => {
    let aNum = alarmNum;
    if(alarmNum > 99) aNum = '99+';
    return(
        <div>
        <SettingImage src = {image} size = {size} onClick = {onclick} hoverimg={hoverimg} left={left}/>
        <AlarmNum visible = {resultvisible}>{aNum}</AlarmNum>
        <Triangle visible = {tvisible}></Triangle>
        </div>
    );
}
export default Setting;
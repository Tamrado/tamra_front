import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';
import { Link } from 'react-router-dom';
const Box = styled.div`
position: relative;
width: 100%;
height: 100px;
left: 0px;

background: ${props => props.color};
border-bottom: 1px solid rgba(196, 196, 196, 0.75);
}
`;

const Thumbnail = styled.div`
position: absolute;
left: 5.63%;
right: 87.98%;
top: 17%;
bottom: 33%;
width: 50px;
height : 50px;
border-radius: 50%;
background-image: url(${props => props.image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const Name = styled.div`

position: absolute;
left: 12.02%;
right: 77.24%;
top: 30%;
bottom: 68%;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 17px;
line-height: 20px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const Content = styled.div`
font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 60px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    letter-spacing: 2px;
    position: absolute;
    height: 70px;
    top: 10%;
    right: 25%;
`;
const Time = styled.div`
position: absolute;
top: 30%;
right : 10%;
font-family: Noto Sans KR;
font-style: normal;
font-size: 16px;
`;

const AlarmBox = ({alarm,handleAlarmInfoClick}) => {
    const {
        message,
        timestamp,
        read,
        link,
        dateString,
        sender
    } = alarm.toJS();
    var color = '#ffffff';
    if(!read) color = 'rgba(222, 226, 230, 0.3)';
    return(
        <Box color={color} id = {sender.id} onClick = {handleAlarmInfoClick}>
            <Name id = {sender.id}>{sender.name}</Name>
            <Thumbnail id = {sender.id} image = {sender.profile}/>
            <Content id = {sender.id}>{message}</Content>
            <Time id = {sender.id}>{dateString}</Time>
        </Box>
    )
}
export default AlarmBox;
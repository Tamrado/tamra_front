import React from 'react';
import styled from 'styled-components';
import { shadow } from '../../lib/styleUtils';
const Box = styled.div`
position: absolute;
width: 782px;
height: 430px;
right: 16%;
top: 59px;
display : ${props => props.visible};
background: #FFFFFF;
${shadow(1)};
`;

const Title = styled.div`
position: absolute;
width: 134px;
height: 45px;
left: 19px;

font-family: Rajdhani;
font-style: normal;
font-weight: bold;
font-size: 20.4px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const Line = styled.div`
position: absolute;
width: 782px;
height: 0px;
left: 0px;
top: 44px;
border: 1px solid #0ca678;
`;
const Alarm = styled.div`
position: absolute;
width: 100px;
height: 45px;
left: 670px;

text-decoration:none;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const FriendBox = styled.div`
position: absolute;
width: 100%;
max-height: 354px;
height : 354px;
left: 0px;
top: 62px;
overflow-y: auto;
&::-webkit-scrollbar-track
{
	border-radius: 20px;
	background-color: #FFFFFF;
}
&::-webkit-scrollbar
{
	width: 10px;
	background-color: #FFFFFF;
}

&::-webkit-scrollbar-thumb
{
	border-radius: 20px;
	background-color : rgba(18, 184, 134, 0.1);
}
background: #FFFFFF;
`;
const NonFriendText = styled.div`
position: absolute;
width: 329px;
height: 45px;
left: 226px;
top: 145px;
display : ${props=>props.result};
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 22.4px;
line-height: 32px;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;

const FollowMenuBox = ({alarm,children,visible,result,fvisible}) => (
    <div>
    <Box visible = {visible}>
        <Line/>
        <Title>FRIEND</Title>
        <Alarm>알람끄기</Alarm>
        <FriendBox>
        {children}
        <NonFriendText result={fvisible}>새로운 친구 요청이 없습니다.</NonFriendText>
        </FriendBox>
    </Box>
    </div>
);
export default FollowMenuBox;
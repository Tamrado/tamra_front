import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Box = styled.div`
position: absolute;
width: 932px;
height: 500px;
right: 16%;
top: 70px;
display : ${props => props.visible};
background: #FFFFFF;
`;
const Triangle = styled.div`
max-width: 16px;
position: absolute;
right: 17%;
height: 12px;
top: 57px;
z-index: 30;
display : ${props => props.visible};
border-bottom: solid 12px #ffffff;
border-left: solid 12px transparent;
border-right: solid 12px transparent;
}
`;
const Title = styled.div`
position: absolute;
width: 134px;
height: 45px;
left: 19px;
top: 14px;

font-family: Rajdhani;
font-style: normal;
font-weight: bold;
font-size: 22.4px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const Line = styled.div`
position: absolute;
width: 932px;
height: 0px;
left: 0px;
top: 64px;
border: 1px solid #12B886;
`;
const Alarm = styled(Link)`
position: absolute;
width: 100px;
height: 45px;
left: 706px;
top: 15px;
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
const Setting = styled(Link)`
position: absolute;
width: 100px;
height: 45px;
left: 854px;
top: 15px;
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
top: 82px;
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
left: 327px;
top: 132px;
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
    <Triangle visible = {visible}/>
    <Box visible = {visible}>
        <Line/>
        <Title>FRIEND</Title>
        <Alarm>알람끄기</Alarm>
        <Setting>설정</Setting>
        <FriendBox>
        {children}
        <NonFriendText result={fvisible}>새로운 친구 요청이 없습니다.</NonFriendText>
        </FriendBox>
    </Box>
    </div>
);
export default FollowMenuBox;
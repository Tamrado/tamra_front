import React from 'react';
import styled from 'styled-components';
import cancel from '../../build/static/images/iconmonstr-x-mark-4-24.png';
import hoverCancel from '../../build/static/images/iconmonstr-x-mark-4-24 (1).png';
import scuize from '../../lib/scuize';

const Box = styled.div`
position: relative;
width: 275px;
height: 54px;
left: 46px;
cursor: pointer;
margin-bottom : 28px;
`;
const Thumbnail = styled.img`
position: absolute;
width: 50px;
height: 50px;
left : 0;
border-radius: 50%;
cursor: pointer;
&:hover {
    filter: brightness(105%);
}
`;
const Nickname = styled.div`
position: absolute;
width: 111px;
right: 50px;


font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 25px;
line-height: 50px;
align-items: center;
text-align: center;
letter-spacing: 0.05em;

color: #000000;
`;
const FriendCancel = styled.div`
position : absolute;
width : 19px;
height : 19px;
right : 0;
top : 15px;
margin-right : 5%;
background-image : url(${cancel});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image : url(${hoverCancel});
}
`;

const WithBox = ({cancel,friend})=>{
    const {
        username,
        nickname,
        thumbnail
    } = friend.toJS();
    return(
        <Box id = {username}>
            <Thumbnail id = {username} src = {thumbnail}/>
            <Nickname id = {username}>  {nickname}</Nickname>
            <FriendCancel id = {username} onClick={cancel}/>
        </Box>
    )
};
export default scuize(WithBox, function(nextProps, nextState){
    return this.props.friend !== nextProps.friend;
});
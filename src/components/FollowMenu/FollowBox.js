import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';
import { Link } from 'react-router-dom';
const Box = styled.div`
position: relative;
width: 100%;
height: 100px;
left: 0px;

background: #FFFFFF;

}
`;
const Button = styled(Link)`
position: absolute;
left: 54.35%;
right: 28.01%;
top: 28%;
bottom: 34%;
width : 138px;
text-decoration:none;
background: rgba(18, 184, 134, 0.1);
border-radius: 10px;

& + & {
    margin-left: 170px;
}
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 40px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
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
top: 5%;
bottom: 68%;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const Comment = styled.div`

position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    left: 14.71%;
    right: 60.61%;
    top: 32%;
    bottom: 25%;
    word-wrap: break-word;
    background: rgba(241,241,245,0.5);
    white-space: nowrap;
    border-radius: 30px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 36px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    letter-spacing: 2px;
    color: #000000;
`;
const FollowBox = ({friend,deleteclick,follow}) => {
    const {
        thumbnail,
        comment,
        nickname,
        username
    } = friend.toJS();
    return(
        <Box>
            <Button onClick = {follow} id = {username}>팔로우</Button>
            <Button onClick = {deleteclick} id = {username}>삭제</Button>
            <Name>{nickname}</Name>
            <Thumbnail image = {thumbnail}/>
            <Comment>{comment}</Comment>
        </Box>
    )
}
export default scuize(FollowBox, function(nextProps, nextState){
    return this.props.friend !== nextProps.friend;
});
import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';
import { Link } from 'react-router-dom';
const Box = styled.div`
position: relative;
width: 100%;
height: 100px;
left: 0px;
top: 4px;
background: #FFFFFF;
}
`;
const Button = styled(Link)`
position: absolute;
width: 138px;
height: 38px;
left: 491px;
top: 27px;
text-decoration:none;
background: rgba(18, 184, 134, 0.1);
border-radius: 10px;
& + & {
    margin-left: 200px;
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
left: 9.16%;
right: 84.73%;
top: 15%;
bottom: 25%;
border-radius: 50%;
background-image: url(${props => props.image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const Name = styled.div`

position: absolute;
left: 15.27%;
right: 76.17%;
top: 4%;
bottom: 69%;

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
min-width: 193px;
text-overflow: ellipsis;
height: 43px;
left: 163px;
top: 36px;

background: rgba(241, 241, 245, 0.5);
border-radius: 30px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 36px;

align-items: center;
text-align: center;
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
            <Button onClick = {deleteclick}>삭제</Button>
            <Button onClick = {follow} id = {username}>팔로우</Button>
            <Name>{nickname}</Name>
            <Thumbnail image = {thumbnail}/>
            <Comment>{comment}</Comment>
        </Box>
    )
}
export default scuize(FollowBox, function(nextProps, nextState){
    return this.props.friend !== nextProps.friend;
});
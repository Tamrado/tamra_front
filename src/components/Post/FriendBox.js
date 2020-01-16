import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';

const Box = styled.div`
position : relative;
width: 100%;
height: 63px;
top : 0px;
flexDirection : column;
margin-bottom : 1rem;
cursor: pointer;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
&:hover{
    background:rgba(196, 196, 196,0.8);
}
`;
const Nickname =styled.div`
position : absolute;
width : 50%;
height : 40px;
right : 0;
margin-right : 1rem;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 21px;
margin-top : 7px;
text-align: center;
letter-spacing: 0.05em;

color: #000000;
`;
const UserImage = styled.div`
position : absolute;
width: 40px;
height: 40px;
left : 20px;
border-radius: 50%;
cursor: pointer;
margin-left : 2rem;
margin-right : 10%;
margin-top : 7px;
float: left;

background-image: url(${props => props.image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    filter: brightness(105%);
}
`; 
const FriendBox = ({friend,onclick}) => {
    const {
        username,
        nickname,
        thumbnail
    } = friend.toJS();

    return (
        <Box onClick={onclick} data-thumbnail = {thumbnail} data-nickname={nickname} id ={username} >
        <UserImage  id ={username} data-thumbnail = {thumbnail} data-nickname={nickname} image = {thumbnail}/>
        <Nickname  id ={username} data-thumbnail = {thumbnail} data-nickname={nickname}>{nickname}</Nickname>
    </Box> 
    )
}
export default scuize(FriendBox, function(nextProps, nextState){
    return this.props.friend !== nextProps.friend;
});
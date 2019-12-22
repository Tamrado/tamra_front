import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import scuize from '../../lib/scuize';

const Box = styled.div`
position: relative;
height: 60px;
top : 60px;
width: 100%;
flexDirection : column;
background: #ffffff;
margin-bottom : 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
&:hover{
    background:rgba(196, 196, 196,0.8);
}

`;
const Nickname = styled.div`
position : absolute;
width: 50%;
height: 40px;
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
left : 0;
border-radius: 50%;
cursor: pointer;
margin-left : 2rem;
margin-right : 10%;
margin-top : 7px;
float: left;
background: ${oc.cyan[5]};
background-image: url(${props => props.image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    filter: brightness(105%);
}
`; 


const NicknameBox = ({friend,onclick}) => {
    const {
        username,
        nickname,
        thumbnail
    } = friend.toJS();

return(
    <Box onClick = {onclick} id = {username} >
        <UserImage id = {username} image = {thumbnail}/>
        <Nickname id = {username}>{nickname}</Nickname>
    </Box>
    )
}
export default scuize(NicknameBox, function(nextProps, nextState){
    return this.props.friend !== nextProps.friend;
});
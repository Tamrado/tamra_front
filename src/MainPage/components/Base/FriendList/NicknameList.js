import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const NicknameBox = styled.div`
position: absolute;
overflow: auto;
width: 197.46px;
flexDirection : column;
background: #ffffff;
right : 0;
left : 0;
margin-left:auto;
margin-right:auto;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
`;
const Nickname = styled.div`
width: 106.46px;
height: 80px;
left : 0;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 21px;
line-height: 25px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.05em;

color: #000000;
`;
const UserImage = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
cursor: pointer;
margin-right : 20px;
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

const NicknameList = ({image,name}) => (
    <NicknameBox>
        <UserImage image = {image}/>
        <Nickname>{name}</Nickname>
    </NicknameBox>
);

export default NicknameList;
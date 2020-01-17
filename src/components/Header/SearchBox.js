import React from 'react';
import styled from 'styled-components';
import scuize from '../../lib/scuize';
const Content = styled.div`
position : relative;
width: 100%;
display: flex;
flex: 1;
flex-direction: row;
min-width : 150px;
height : 55px;
display : block;
cursor: pointer;
background : #ffffff;
&:hover{
    background:rgba(196, 196, 196,0.8);
}

`;
const Nickname =styled.div`
position : absolute;
max-width : 50%;
height : 40px;
left : 0;
margin-left : 7rem;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 21px;

margin-top : 7px;
letter-spacing: 0.05em;

color: #000000;
`;
const Image = styled.div`
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

background-image: url(${props => props.thumbnail});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    filter: brightness(105%);
}
`;

const SearchBox = ({user,visible,onclick}) => {
    const {
        username,
        nickname,
        thumbnail
    } = user.toJS();

    return (
        <Content onClick = {onclick} id = {username} visible = {visible}>
            <Nickname id = {username}>{nickname}</Nickname>
            <Image id = {username} thumbnail ={thumbnail}></Image>
        </Content>
    )
}


export default scuize(SearchBox, function(nextProps, nextState){
    return this.props.user !== nextProps.user;
});
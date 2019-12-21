import React from 'react';
import styled from 'styled-components';

const FriendListBox = styled.div`
position : fixed;
width: 180px;
margin-right : 10px;
top: 74.112px;
right : 0;
height : 88%;
background: #FFFFFF;

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
`;
const FriendListHead = styled.div`
position: fixed;
z-index : 10;
width: 180px;
margin-right : 10px;
height: 53px;
background: #12B886;
`;
const FriendListHeaderLogo = styled.div`
font-family: Noto Sans KR;
width: 180px;
margin-right : 10px;
position: fixed;
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 35px;
align-items: center;
text-align: center;
letter-spacing: 0.1em;
color: #FFFFFF;
padding-right: 1rem;
padding-left: 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
`;
const FriendList = ({children}) => (
<FriendListBox>
    <FriendListHead>
            <FriendListHeaderLogo>친구 리스트</FriendListHeaderLogo>
            </FriendListHead>
        {children}
    </FriendListBox>
);
export default FriendList;
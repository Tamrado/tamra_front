import React from 'react';
import styled from 'styled-components';

const FriendListBox = styled.div`
position : fixed;
width: 200px;
margin-right : 10px;
top: 74.112px;
left : 71%;
height : 55%;

background: #FFFFFF;

overflow-y: auto;
overflow-x : none;
&::-webkit-scrollbar-track
{
	border-radius: 20px;
	
}
&::-webkit-scrollbar
{
	width: 10px;
  background-color: rgba(fff,fff,fff,0.1);
}

&::-webkit-scrollbar-thumb
{
	border-radius: 20px;
  background-color : rgb(172, 228, 212);
  
}
`;

const FriendListHeaderLogo = styled.div`

font-family: 'Rajdhani';
width: 200px;
background : #ffffff;
z-index: 1;
height: 53px;
margin-right : 10px;
position: fixed;
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 35px;
align-items: center;
text-align: center;
letter-spacing: 0.1em;

padding-right: 1rem;
padding-left: 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
border-bottom: 1px solid #0ca678;

`;
const FriendList = ({children}) => (
<FriendListBox>
    
            <FriendListHeaderLogo>FRIEND
            
            </FriendListHeaderLogo>
            
        {children}
    </FriendListBox>
);
export default FriendList;
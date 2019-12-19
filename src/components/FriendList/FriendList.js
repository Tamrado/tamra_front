import React from 'react';
import styled from 'styled-components';

const FriendListBox = styled.div`
position : fixed;
width: 180px;
margin-right : 10px;
right : 0;
height : 100%;
background: #FFFFFF;
overflow : auto;
-ms-overflow-style: none; // IE에서 스크롤바 감춤
  &::-webkit-scrollbar { 
    display: none !important; // 윈도우 크롬 등
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
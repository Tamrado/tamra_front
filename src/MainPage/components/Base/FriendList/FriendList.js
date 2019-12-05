import React from 'react';
import styled from 'styled-components';

const FriendListBox = styled.div`
position: absolute;
width: 18%;
height : 89%;
right : 0;
flexDirection : column;
background: #FFFFFF;
`;
const FriendListHead = styled.div`
position: absolute;
width: 100%;
height: 53px;
background: #12B886;
`;
const FriendListHeaderLogo = styled.div`
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 24px;
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
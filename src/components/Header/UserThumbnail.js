import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 40px;
    height: 40px;
    left : 0;
    border-radius: 50%;
    cursor: pointer;
    margin-left : 20px;
    margin-right : 20px;
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
const MenuLine = styled.div`
height: 55px;
border-right: 2px solid rgba(18, 184, 134, 0.1);
margin-right : 12px;
`;

const UserThumbnail = ({thumbnail,profileClick}) => (
    <div>
    <Wrapper onClick={profileClick} thumbnail={thumbnail}/>
    <MenuLine/>
    </div>
);

export default UserThumbnail;
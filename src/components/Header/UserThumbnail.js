import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    width: 40px;
    height: 40px;
    left : 0;
    border-radius: 50%;
    cursor: pointer;
    margin-right : 20px;
    margin-top : 7px;
    float: left;
    background: ${oc.cyan[5]};
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

const UserThumbnail = ({thumbnail, onClick}) => (
    <div>
    <Wrapper thumbnail={thumbnail} onClick={onClick}/>
    <MenuLine/>
    </div>
);

export default UserThumbnail;
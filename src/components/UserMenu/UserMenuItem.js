import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const MenuItem = styled.div`
    & + & {
        border-top: 1px solid ${oc.gray[3]};
    }
    font-family: Noto Sans KR;
font-style: normal;
text-align: center;
    
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: ${oc.gray[7]};
    cursor: pointer;
    &:hover {
        background: ${oc.gray[0]};
        font-weight: 500;
        color: ${oc.cyan[6]};
    }
`;

const UserMenuItem = ({onClick, children,item}) => (
    <MenuItem id={item} onClick={onClick}>
        {children}
    </MenuItem>
);

export default UserMenuItem;
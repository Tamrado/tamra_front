import React from 'react';
import styled from 'styled-components';

// 유저 메뉴를 우측 상단에 위치시킵니다
const Positioner = styled.div`
position: absolute;
right: 11.3%;
top: 69.5px;

    
`;
const Triangle = styled.div`
max-width: 16px;
position: absolute;
right: 11.3%;
height: 12px;
top: 57px;
z-index: 30;
border-bottom: solid 12px #ffffff;
border-left: solid 12px transparent;
border-right: solid 12px transparent;
}
`;
// 흰색 메뉴박스 
const MenuWrapper = styled.div`
    background: white;
    min-width: 140px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const UserMenu = ({children}) => (
   <div>
    <Triangle/>
    <Positioner>
        <MenuWrapper>
            {children}
        </MenuWrapper>
    </Positioner>
    </div>
);

export default UserMenu;
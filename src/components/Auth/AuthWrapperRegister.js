import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';
import { Link } from 'react-router-dom';


const ShadowedBox = styled.div`
    width: 500px;
    margin : 0 auto;
    ${shadow(2)}
`;

// 로고
const LogoWrapper = styled.div`
    background:white;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom : 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
    color:  ${oc.teal[7]};
    font-family: 'Rajdhani';
    font-size: 2.4rem;
    letter-spacing: 5px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;

const AuthWrapperRegister = ({children}) => (
     <ShadowedBox>
            <LogoWrapper>
                <Logo to="/">TAMRA</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    
);

export default AuthWrapperRegister;
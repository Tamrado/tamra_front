import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from '../../lib/styleUtils';
import searchButtonImage from '../../build/static/images/iconmonstr-magnifier-1-32.png';
import hoversearchButtonImage from '../../build/static/images/iconmonstr-magnifier-1-32 (1).png';
// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    top: 0px;
    ${shadow(1)}
    z-index: 5;
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    position: relative;
    padding-right: 10%;
    padding-left: 10%;
    ${media.wide`
        width: 992px;
    `}
    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled.div`
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
    text-decoration: none;
`;

export const SearchButton = styled.div`
    position: relative;
    float: left;
    cursor: pointer;
   
    width: 32px;
    padding-left: 15px;
    height: 33px;
    margin-left : 1%;
    margin-right : 10%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-right: 17px;
background-image: url(${searchButtonImage});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${hoversearchButtonImage});
}
&:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;

// 중간 여백


// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

export const Header = ({children,home}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Logo onClick={home}>TAMRA</Logo>
                    {children}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>
        </Positioner>
    );
};

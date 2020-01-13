import React from 'react';
import styled, { keyframes,css } from 'styled-components';

const ErrorPage = css`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
height: 100%;
font-family: Arial, Noto Sans KR, Helvetica, sans-serif;
position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`; 
const animateTextBackground = keyframes`
0%{
background-position: 0 0;
}
25%{
background-position: 100% 0;
}
50%{
background-position: 100% 100%;
}
75%{
background-position: 0 100%;
}
100%{
background-position: 0 0;
}
`;
const Wrapper = styled.div`

  height: 100%;
  overflow: hidden;
  background: #ffffff;
${ErrorPage}
`;
const H1 = styled.h1`
font-size: 30vh;
    font-weight: bold;
    position: relative;
    margin: -8vh 0 0;
    padding: 0;
    &:after{
      content: attr(data-h1);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: transparent;
      /* webkit only for graceful degradation to IE */
      background: -webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 400%;
      text-shadow: 1px 1px 2px transparentize(#fff, .75);
      animation: ${animateTextBackground} 10s ease-in-out infinite;
    }
`;
const Message = styled.div`
color: #d6d6d6;
      font-size: 8vh;
      font-weight: bold;
      line-height: 10vh;
      max-width: 700px;
      position: absolute;
      top : 450px;
      
      &:after{
        content: attr(data-p);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        color: transparent;
        text-shadow: 1px 1px 2px transparentize(#fff, .5);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
      }
`;

const fadeIn = keyframes`
0%{
    opacity: 0
}
100%{
    opacity: 1
}
`;




const PageNotFound = () => (
    <Wrapper>
        <H1 data-h1="404">404</H1>
        <Message data-p = "페이지를 찾을 수 없습니다.">페이지를 찾을 수 없습니다.</Message>
    </Wrapper>
);
export default PageNotFound;
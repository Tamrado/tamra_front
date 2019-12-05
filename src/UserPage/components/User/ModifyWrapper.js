import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
position: relative;
margin-top: 5rem;
width : 70%;
height : 100%;
padding-left : 15rem;
padding-right : 15rem;

`;
const ModifyWrapper = ({children}) =>(

    <Wrapper>
        {children}
        </Wrapper>
);
export default ModifyWrapper;
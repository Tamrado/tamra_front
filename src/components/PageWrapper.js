import React from 'react';
import styled from 'styled-components';

// 헤더 아래에 위치하도록 상단 패딩
const Wrapper = styled.div`
    margin-top: 58px;
    padding: 1rem;
    width: 100%;
    height : 100%;
    position : relative;
    flex-direction: row;

    
`;

const PageWrapper = ({responsive, children}) => (
    <Wrapper responsive={responsive}>
        {children}
    </Wrapper>
);

export default PageWrapper;

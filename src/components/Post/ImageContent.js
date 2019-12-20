import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
position: absolute;
    top: 80px;
    left: 100px;
    width: 215px;
    height: 300px;
    max-height: 300px;
    overflow-y: auto;
overflow-y: auto;
&::-webkit-scrollbar-track
{
	border-radius: 20px;
	background-color: #FFFFFF;
}
&::-webkit-scrollbar
{
	width: 10px;
	background-color: #FFFFFF;
}

&::-webkit-scrollbar-thumb
{
	border-radius: 20px;
	background-color : rgba(18, 184, 134, 0.1);
}

`;
const PhotoBox = styled.div`
position: absolute;
width : 200px;
height: 200px;
background: rgba(18, 184, 134, 0.05);
`;
const PhotoText = styled.div`
position: absolute;
width : 100%;
height: 100%;
 text-align:center;
 line-height: 6.3;
 margin : auto;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 24px;
align-items: center;
color: #000000;
`;
const Photo = styled.input`
position: absolute;
overflow: hidden;
top: 0;
left: 0;
width : 100%;
height: 100%;
opacity : 0;
`;
const ImageContent = ({children,change}) =>(

    <Wrapper>
        {children}
        <PhotoBox>
            <PhotoText>
                +
            </PhotoText>
            <Photo type='file' onChange={change}/>
        </PhotoBox>
    </Wrapper>
);
export default ImageContent;
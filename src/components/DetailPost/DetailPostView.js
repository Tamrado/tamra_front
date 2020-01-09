import React from 'react';
import styled from 'styled-components';
import leftArrow from '../../build/static/images/iconmonstr-arrow-64-48.png';
import rightArrow from '../../build/static/images/iconmonstr-arrow-25-48.png';
import exit from '../../build/static/images/iconmonstr-x-mark-1-48.png';
import publicImage from '../../build/static/images/public.png';
import friendImage from '../../build/static/images/friend.png';
import privateImage from '../../build/static/images/private.png';

const Wrapper = styled.div`
position: fixed;
width: 100%;
min-height: 100%;
z-index: 10;
top: 0;
left: 0;
background: #000000;
`;
const FeedBox = styled.div`
position: absolute;
width: 1146px;
height: 90%;
left: 147px;
top: 41px;
background: #FFFFFF;
`;
const ImageBox = styled.div`

width : 800px;
height : 680px;
left : 0px;
top : 0px;
display: table;
flex-direction : column;
background : #000000;
`;
const ImageWrapper = styled.div`
display: table-cell;
  vertical-align: middle;
  text-align: center;
`;
const Image = styled.div`
width : ${props => props.width};
height : ${props => props.height};
max-width : 800px;
max-height : 800px; 
position: relative;
  display: inline-block;
background-image: url(${props => props.image});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;

const LeftArrowBox = styled.div`
position: absolute;
width: 86px;
height: 86px;
left: 0px;
top: 357px;
`;
const LeftArrow = styled.div`
position: absolute;
width: 48px;
height: 48px;
left: 19px;
top: 19px;
background-image: url(${leftArrow});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const RightArrowBox = styled.div`
position: absolute;
width: 86px;
height: 86px;
left: 714px;
top: 357px;
`;
const RightArrow = styled.div`
position: absolute;
width: 48px;
height: 48px;
left: 19px;
top: 19px;
background-image: url(${rightArrow});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const NicknameBox = styled.div`
position: absolute;
width: 228px;
height: 72px;
left: 861px;
top: 28px;
`;
const Thumbnail = styled.div`
position: absolute;
width: 55px;
height: 55px;
left: 0px;
float : left;
margin-right : 10px;
top: 2px;
border-radius: 50%;
background-image: url(${props => props.thumbnail});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const Name = styled.div`
position: absolute;
max-width: 91px;
height: 48px;
left: 55px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.05em;

color: #000000;
`;
const Time = styled.div`
max-width: 111px;
height: 32px;
left: 0;
float : left;
margin-right : 10px;
top: 40px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.05em;

color: #515250;
`;
const ShowLevel = styled.div`
position : absolute;
    width: 24px;
    height: 24px;
    display: flex;
    left :0 ;
    top : 5px;
    float : left;
    background-image: url(${props => props.showLevel});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;

const Exit = styled.div`
position: absolute;
width: 48px;
height: 48px;
left: 1374px;
top: 18px;
background-image : url(${exit});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;
const CommentView = styled.div`
position: absolute;
width: 346px;
height: 680px;
left: 800px;
top: 120px;
border-top : 1px solid #0CA678;
`;

const DetailPostView = ({mainfeed,children,thumbnail,userId,name,fileSize}) => { 
    const{
        feed,
        category,
        sender,
        message,
        profileId
    } = mainfeed;
    const {
        width,
        height
    } = fileSize;
    if(!feed) return null;
    console.log(width);
    return(
        <Wrapper>
            <FeedBox >
                <ImageBox>
                    <ImageWrapper>
                    <Image image = {feed.files[0].original} id = {'^^image'} width = {String(width)+'px'}
                height = {String(height)+'px'}/>
                </ImageWrapper>
                    <LeftArrowBox><LeftArrow/></LeftArrowBox>
                    <RightArrowBox><RightArrow/></RightArrowBox>
                </ImageBox>
                <NicknameBox>
                    <Thumbnail thumbnail={thumbnail}/>
                    <Name>{name}</Name>
                    <Time>{feed.dateString}</Time>
                { `${feed.showLevel}` === 'private' && <ShowLevel showLevel ={privateImage} />}
           { `${feed.showLevel}` === 'public' && <ShowLevel showLevel ={publicImage} />}
           { `${feed.showLevel}` === 'followers' && <ShowLevel showLevel ={friendImage} />}
                </NicknameBox>
                <CommentView>{children}</CommentView>
            </FeedBox>
            <Exit/>
        </Wrapper>
    );
}
export default DetailPostView;
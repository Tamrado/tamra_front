import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import like from '../../../../build/static/images/iconmonstr-smiley-thin-32.png';
import clickLike from '../../../../build/static/images/iconmonstr-smiley-8-32.png';
import scuize from '../../../../CommonFolder/lib/scuize';

import publicImage from '../../../../build/static/images/public.png';
import friendImage from '../../../../build/static/images/friend.png';
import privateImage from '../../../../build/static/images/private.png';
const Box = styled.div`
width: 100%;
height: 500px;
background : #ffffff;
position: relative;
top : 180px;
margin-bottom : 1rem;
`;
const NickNameBox = styled.div`
width: 356px;
height: 72px;
position : absolute;
margin-left : 70px;
top: 5px; 
`;
const NickName = styled.div`
position : absolute;
width: 91px;
height: 48px;
left: 60px;
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
const ViewBox = styled.div`
position : absolute;
width : 150px;
height: 32px;
left : 60px;
top : 42px;
`;
const Time = styled.div`
position : absolute;
width: 104px;
height: 32px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.05em;

color: #515250;
`;
const ViewPhase = styled.div`
position : absolute;
    width: 24px;
    height: 24px;
    right : 0;
    top : 5px;
    
    background-image: url(${props => props.showLevel});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;
const Profile = styled.div`
position : absolute;

    background-image: url(${props => props.thumbnail});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
    float : left;
    width: 55px;
    height: 55px;
    top: 15px;
    
`;
const FeedLine = styled.div`
position : absolute;
width: 100%;
top: 91px;

border: 2px solid #12B886;
`;

const Feed = styled.div`
position : absolute;
width: 100%;
padding-left : 5rem;
padding-right : 5rem;
height: 330px;
top : 120px;
word-break: normal;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
`;
const FeedSubMenu = styled.div`
position : absolute;
width: 300px;
height: 32px;
right: 0;
top: 460px;
`;
const LikeNumber = styled.div`
position : absolute;
width: 74px;
height: 25px;
left : 35px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 28px;
display: flex;
align-items: center;

color: #000000;
`;
const LikeImage = styled.div`
position : absolute;
width: 32px;
height: 32px;
left : 0;
background-image : url(${like});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${clickLike});
    background-size: cover;
background-position: center;
background-repeat: no-repeat;
}
`;
const Comment = styled.div`
position : absolute;
width: 160px;
height: 25px;
right : 0;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
align-items: center;
text-align: center;

color: #000000;
&:hover {
    text-decoration-line: underline;
}
`;
const FeedBox = ({feed}) => {
    const {
        postId,
        thumbnail,
        author,
        lastUpdate,
        showLevel,
        content,
        comment,
        number
    } = feed.toJS();
  
    /*const toggleLike = () => onToggleLike({
        feedId : postId,
        liked
    });
    const commentClick = () => onCommentClick(postId);*/
 
return(
    <Box>
        <NickNameBox>
            <Profile thumbnail = {thumbnail}/>
            <NickName>{author}</NickName>
            <ViewBox>
            <Time>{lastUpdate}</Time>
            <ViewPhase showLevel = {`${showLevel}Image`} />
            </ViewBox>
        </NickNameBox>
        <FeedLine/>
        <Feed>{content}
        </Feed>
        <FeedSubMenu>
            <LikeImage/><LikeNumber> {number}</LikeNumber>
            <Comment>댓글 {comment}</Comment>
        </FeedSubMenu>
    </Box>
    )
}
export default scuize(FeedBox, function(nextProps, nextState){
    return this.props.feed !== nextProps.feed;
});
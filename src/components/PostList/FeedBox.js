import React from 'react';
import styled from 'styled-components';
import like from '../../build/static/images/iconmonstr-smiley-thin-32.png';
import clickLike from '../../build/static/images/iconmonstr-smiley-8-32.png';
import hash from '../../build/static/images/iconmonstr-hashtag-1-24.png';
import clickhash from '../../build/static/images/iconmonstr-hashtag-1-24 (1).png'
import publicImage from '../../build/static/images/public.png';
import friendImage from '../../build/static/images/friend.png';
import privateImage from '../../build/static/images/private.png';
import scuize from '../../lib/scuize';
const Box = styled.div`
width: 70%;
left : 15%;
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
const FeedImage = styled.div`
position : absolute;
width: 100%;
display : flex;
flex-direction: row;
padding-left : 3rem;
padding-right : 3rem;
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
const Feed = styled.div`
position : absolute;
width: 100%;
padding-left : 5rem;
padding-right : 5rem;
height: 330px;
white-space:normal;
top : 120px;
white-space:normal;
word-break: break-all;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
`;
const Image = styled.div`
position: relative;
overflow: hidden;
width : 250px;
height : 250px;
display : block;
background-image : url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
& + & {
    margin-left: 10px;
}
&:hover {
    filter: brightness(105%);
}
`;
const ImageCount = styled.div`
position : absolute;
overflow: hidden;
width : 330px;
height : 330px;
display : block;
background: rgba(196, 196, 196, 0.75);
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 96px;
line-height: 310px;

align-items: center;
text-align: center;

color: #FFFFFF;
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
width: 30px;
height: 25px;
left : 140px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
align-items: center;
text-align: center;

color: #000000;
&:hover {
    color : #FF0404;
}
`;
const LikeImage = styled.div`
position : absolute;
width: 32px;
height: 32px;
left : 105px;
background-image : url(${like});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${clickLike});
}
`;
const HashImage = styled.div`

position : absolute;
width: 24px;
height: 24px;
top : 3px;
left : 0;
background-image : url(${hash});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover{
    background-image: url(${clickhash});

}
`;
const HashNum = styled.div`
display : ${props=> props.display};
    position: absolute;
    width: 100px;
    padding: 8px;
    right: 230px;
    bottom: 10%;
    align-items: center;
text-align: center;
    font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #333;
    color: #fff;
    font-size: 14px;
  &:after{
    position: absolute;
    top : 100%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51,51,51,0);
    border-top: solid 7.5px #333;
    border-left: solid 7.5px transparent;
    border-right: solid 7.5px transparent;
    content: " ";
    width: 15px;
    height: 15px;
  }
`;
const Comment = styled.div`
position : absolute;
width: 100px;
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
const FeedBox = ({feed,count,children,hover,nothover,hashdisplay}) => {
    
    const {
        postId,
        profile,
        totalLike,
        timestamp,
        showLevel,
        content,
        totalComment,
        files,
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
            <Profile thumbnail = {profile.profile}/>
            <NickName>{profile.name}</NickName>
            <ViewBox>
            <Time>{timestamp}</Time>
           { `${showLevel}` === 'private' && <ViewPhase showLevel ={privateImage} />}
           { `${showLevel}` === 'public' && <ViewPhase showLevel ={publicImage} />}
           { `${showLevel}` === 'followers' && <ViewPhase showLevel ={friendImage} />}
            </ViewBox>
        </NickNameBox>
        <FeedLine/>
        { !`${files}` &&<Feed>{content}</Feed>}
        {`${files}` && count > 3 && <FeedImage>
            <Image src={files[0].thumbnail}/><Image src={files[1].thumbnail}/><Image src={files[2].thumbnail}>
                <ImageCount>
                   +{`${count}` - 3}
                </ImageCount></Image>
            </FeedImage>}
        {`${files}` && count == 3 && <FeedImage>
            <Image src={files[0].thumbnail}/><Image src={files[1].thumbnail}/><Image src={files[2].thumbnail}/>
            </FeedImage>}
            {`${files}` && count === 2 && <FeedImage>
            <Image src={files[0].thumbnail}/><Image src={files[1].thumbnail}/>
            </FeedImage>}
            {`${files}` && count === 1 && <FeedImage>
            <Image src={files[0].thumbnail}/>
            </FeedImage>}
            <HashNum id={postId} display={hashdisplay}>{children}</HashNum>
        <FeedSubMenu>
            <HashImage id={postId} onMouseOver={hover} onMouseOut={nothover}/>
            <LikeImage/><LikeNumber>{totalLike}</LikeNumber>
            <Comment>댓글 {totalComment}</Comment>
        </FeedSubMenu>
    </Box>
    )
}
export default scuize(FeedBox, function(nextProps, nextState){
    return this.props.feed !== nextProps.feed || this.props.hashdisplay !== nextProps.hashdisplay;
});
import React from 'react';
import styled from 'styled-components';
import like from '../../build/static/images/iconmonstr-smiley-thin-32.png';
import clickLike from '../../build/static/images/iconmonstr-smiley-8-32.png';
import hash from '../../build/static/images/iconmonstr-hashtag-1-24.png';
import clickhash from '../../build/static/images/iconmonstr-hashtag-1-24 (1).png'
import publicImage from '../../build/static/images/public.png';
import friendImage from '../../build/static/images/friend.png';
import privateImage from '../../build/static/images/private.png';
import menuImage from '../../build/static/images/iconmonstr-menu-7-24.png';
import hoverMenuImage from '../../build/static/images/iconmonstr-menu-7-24 (1).png';
import showmenuImage from '../../build/static/images/iconmonstr-arrow-80-24.png';
import { shadow } from '../../lib/styleUtils';
import oc from 'open-color';

const Box = styled.div`
width: 60%;
left : 20%;
min-height: 500px;
background : #ffffff;
position: relative;
display : block;
padding-bottom : 170px;
margin-top : 0.8rem;
`;

const NickNameBox = styled.div`
width:90%;
height: 72px;
position : absolute;
margin-left : 70px;
margin-right : 10px;
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
position : relative;
width : 150px;
height: 32px;
left : 60px;
top : 42px;
display : flex;
flex: 1;
    flex-direction: row;
`;
const Time = styled.div`

max-width: 120px;
height: 32px;
left : 0;
float : left;
margin-right : 10px;
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
position : relative;
    width: 24px;
    height: 24px;
    display: flex;
    margin-right : 5px;
    left :0 ;
    top : 5px;
    float : left;
    background-image: url(${props => props.showLevel});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const ViewChangeButton = styled.div`
position : relative;
cursor : pointer;
    width: 13px;
    height: 13px;
    left :0 ;
    top : 10px;
    float : left;
    display : ${props=>props.display};
    background-image: url(${showmenuImage});
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
const WriteBox = styled.div`
position : relative;
width : 100%;
min-height : 200px;
max-height : 500px; 
border-radius : 10px;
top : 40px;
z-index : 1;
display : ${props=>props.visible};
padding-left : 1rem;
padding-right : 1rem;
padding-top : 2rem;
padding-bottom : 4rem;
background : #ffffff;
${shadow(1)};


`;
const WriteContext = styled.div`
position : relative;
width: 90%;
left : 5%;
top : 0;
border-radius : 10px;
background : rgba(18,184,134,0.05);
min-height : 100px;
max-height : 400px; 
word-break: break-all;
font-family: Noto Sans KR;
border : none;
outline: none;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 28px;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
color : black;

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
const WriteButton = styled.div`
position: absolute;
width: 12%;
height: 30px;
cursor : pointer;
right : ${props => props.right};
bottom : 15px;
border-radius: 10px;
font-size: 18px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
align-items: center;
text-align: center;
background: #FFFFFF;
border: 1px solid #0CA678;
box-sizing: border-box;
&:hover {
    color: ${oc.teal[5]};
    ${shadow(0)};
}

&:active {
    color: ${oc.teal[7]};
}
`;
const FeedImage = styled.div`
position : relative;
width: 100%;
display : flex;
flex-direction: row;

height: 330px;
`;
const Feed = styled.div`
position : relative;
width: 100%;
display : inline-block;
padding-left : 5rem;
padding-right : 5rem;
white-space:normal;
z-index : 1;
top : 110px;
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
margin : ${props=>props.margin} ;
overflow: hidden;
width : ${props => props.size};
height : ${props => props.size};
display : block;
cursor : pointer;
background-image : url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
& + & {
    margin-left: ${props=>props.left};
}
&:hover {
    filter: brightness(105%);
}
`;
const ImageCount = styled.div`
overflow: hidden;
width : 250px;
height : 250px;
display : block;
cursor : pointer;
background: rgba(196, 196, 196, 0.75);
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 96px;
line-height: 250px;

align-items: center;
text-align: center;

color: #FFFFFF;
`;
const FeedSubMenu = styled.div`
position : absolute;
width: 300px;
height: 32px;
right: 5%;
bottom : 10px;
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
cursor : pointer;
width: 32px;
height: 32px;
left : 105px;
display : ${props => props.like};
background-image : url(${like});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${clickLike});
}
`;
const LikedImage = styled.div`
position : absolute;
width: 32px;
height: 32px;
cursor : pointer;
left : 105px;
background-image : url(${clickLike});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const HashImage = styled.div`

position : absolute;
width: 24px;
height: 24px;
bottom : 4px;
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
    right: 275px;
    z-index : 1;
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
cursor : pointer;
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
const MenuButton = styled.div`
position: absolute;
width : 24px;
height : 24px;
    right: 20px;
    cursor : pointer;
    overflow : hidden;
    top: 10px;
    display : ${props=>props.display};
background: url(${menuImage});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
background: url(${hoverMenuImage});
}
`;

const FeedBox = ({mainfeed,count,children,hover,nothover,hashdisplay,username,like,cancel,handleComment,
    childrenTwo,handleMenu,menu,handleImage,handleWrite,handleCancel,handleWriteInput,showList,hostUser,
handleViewChange}) => {
    
    const {
        postId,
        content,
        showLevel,
        totalTag,
        totalComment,
        totalLike,
        profile,
        files,
        islike,
        dateString,
        modifyVisible
    } = mainfeed.toJS();
    if(!profile || !postId) return null;
    const style = {
        lineHeight: '160%'
    };
       const contents=content.split('\n').map( (line,index) => {
        return (<div key={line + index} style={style} >{line}<br/></div>)
      }); 
      let hostDisplay = 'none';

    if(profile.id === hostUser) hostDisplay='flex';
return(

    <div>
    <Box>
        <NickNameBox>
            <Profile id = {profile.id} thumbnail = {profile.profile}/>
            <NickName id = {profile.id}>{profile.name}</NickName>
            <ViewBox>
            <Time>{dateString}</Time>
           { `${showLevel}` === 'private' && <ViewPhase showLevel ={privateImage} />}
           { `${showLevel}` === 'public' && <ViewPhase showLevel ={publicImage} />}
           { `${showLevel}` === 'followers' && <ViewPhase showLevel ={friendImage} />}
           <ViewChangeButton display={hostDisplay} id = {postId} onClick={handleViewChange}/>
           {showList}
            </ViewBox>
            <MenuButton display={hostDisplay} id = {postId} onClick={handleMenu}/>
            {menu}
        </NickNameBox>
        <FeedLine/>
         <Feed>
             <WriteBox visible = {modifyVisible}>
                 <WriteContext id = {postId} name={'^^content'} role = "textbox" spellcheck = "true" 
                  aria-autocomplete="list" data-content = "true" contentEditable = "true" aria-label = {content} suppressContentEditableWarning={true}
                  aria-multiline="true" onInput={handleWriteInput}>{content}</WriteContext>
                 <WriteButton id = {postId} data-category = {'modify'} onClick = {handleWrite} right={'23%'}>수정</WriteButton>
                 <WriteButton id = {postId} data-category = {'cancel'} onClick = {handleCancel} right={'5%'}>취소</WriteButton>
             </WriteBox>
         {contents}<br/>
        {`${files}` && count > 3 && <FeedImage>
            <Image id = {postId} data-imageid = {0} onClick={handleImage} src={files[0].original} size ={'250px'} left={'10px'} />
            <Image id = {postId} data-imageid = {1} onClick={handleImage} src={files[1].original} size ={'250px'}left={'10px'}/>
            <Image id = {postId} data-imageid = {2} onClick={handleImage} src={files[2].original} size ={'250px'}left={'10px'}>
                <ImageCount id = {postId} data-imageid = {2} size ={'250px'} >
                   +{`${count}` - 3}
                </ImageCount></Image>
            </FeedImage>}
        {`${files}` && count === 3 && <FeedImage>
        <Image id = {postId} data-imageid = {0} onClick={handleImage} src={files[0].original} size ={'250px'} left={'10px'} />
            <Image id = {postId} data-imageid = {1} onClick={handleImage} src={files[1].original} size ={'250px'}left={'10px'}/>
            <Image id = {postId} data-imageid = {2} onClick={handleImage} src={files[2].original} size ={'250px'}left={'10px'}/>
            </FeedImage>}
            {`${files}` && count === 2 && <FeedImage>
            <Image id = {postId} data-imageid = {0} onClick={handleImage} left = {`5%`} size ={'320px'} src={files[0].original}/>
            <Image id = {postId} data-imageid = {1} onClick={handleImage} left = {`5%`} size ={'320px'} src={files[1].original}/>
            </FeedImage>}
            {`${files}` && count === 1 && <FeedImage>
            <Image id = {postId} data-imageid = {0} onClick={handleImage} left={`26%`} size ={'320px'} margin = {'0 auto'}src={files[0].original}/>
            </FeedImage>}
            </Feed>
            <HashNum id={postId} display={hashdisplay}>{totalTag}명<br/>{children}</HashNum>
        <FeedSubMenu>
            <HashImage id={postId} onMouseOver={hover} onMouseOut={nothover}/>
            <LikeImage id = {postId} onClick = {like} like = {islike}/>
            <LikeNumber>{totalLike}</LikeNumber>
            {islike === 'none' &&<LikedImage id = {postId} onClick = {cancel} />}
            <Comment id ={postId} onClick={handleComment} >댓글 {totalComment}</Comment>
        </FeedSubMenu>
    </Box>
    {childrenTwo}
    </div>
    )
}
export default FeedBox;
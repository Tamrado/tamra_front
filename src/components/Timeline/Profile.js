import React from 'react';
import styled from 'styled-components';
const Box = styled.div`

position: relative;
width: 60%;
height: 150px;
left: 20%;
background: #FFFFFF;
border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;
const FollowBox = styled.div`
position : relative;
width : 60%;
height : 100px;
left : 20%;

background: #FFFFFF;
border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;
const ProfileBox = styled.div`
margin : ${props=>props.margin};
width: 300px;
height: 150px;

position : ${props=>props.position};
right : ${props=>props.right};

`;

const UserThumbnail = styled.div`
position: absolute;
width: 100px;
top : 15%;
height: 100px;
border-radius: 50%;
    cursor: pointer;
background-image: url(${props => props.thumbnail});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    filter: brightness(150%);
}
`;
const Nickname = styled.div`

position : relative;
    width: 30%;
    max-width: 35%;
    height: 29px;
    left: 130px;
    top: 40px;
    margin-right: 10px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 29px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-letter-spacing: 0.05em;
    -moz-letter-spacing: 0.05em;
    -ms-letter-spacing: 0.05em;
    letter-spacing: 0.05em;
    color: #000000;

`;

const Comment = styled.div`
position : relative;
    max-width: 200px;
    max-height: 80px;
    left: 130px;
    top: 43px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 1.3rem;
    -webkit-letter-spacing: 0.05em;
    -moz-letter-spacing: 0.05em;
    -ms-letter-spacing: 0.05em;
    letter-spacing: 0.05em;
    color: #000000;
    white-space:normal;
word-break: break-all;

`;

const Column = styled.div`
position: absolute;
width: 50%;
min-height : 37px;
max-height: 37px;

left: 25%;
top: 10px;

background: #FFFFFF;
`;
const NumColumn = styled.div`
position: absolute;
width: 50%;
min-height : 37px;
max-height: 37px;

left: 25%;
top: 50px;

background: #FFFFFF;
`;
const Following = styled.div`
position: absolute;
width: 30%;
height: 37px;
right: 0;
top: 0px;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 32px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;

const Follower = styled.div`
position: absolute;
width: 30%;
max-height: 37px;
left: 34%;
top: 0px;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 32px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;

const Posting = styled.div`
position: absolute;
width: 30%;
max-height: 37px;
left: 0;
top: 0px;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 32px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;

const FollowerNum = styled.div`
position: absolute;
width: 30%;
height: 37px;
left: 34%;
top: 0px;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 30px;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const FollowingNum = styled.div`
position: absolute;
width: 30%;
height: 37px;
right: 0;
top: 0px;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 30px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const PostingNum = styled.div`
position: absolute;
width: 30%;
height: 37px;
left: 0px;
top: 0px;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 30px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const FollowButton = styled.div`
display : ${props=>props.display};
position: absolute;
width: 13%;
height: 45px;
right: 20%;
top: 50px;
color : #515250;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 1.3rem;
line-height: 40px;

align-items: center;
text-align: center;
letter-spacing: 2px;
background: rgba(18, 184, 134, 0.1);
border-radius: 10px;
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
const Profile = ({followclick,postNum,followerNum,followNum,comment,nickname,username,thumbnail
    ,followdisplay,isfollow,change}) => (
    <div>
    <Box>
        {followdisplay === 'none' &&<ProfileBox margin = {'0 auto'}>
            <UserThumbnail id = {username} thumbnail ={thumbnail}>
                <Photo type='file' onChange={change}/>
                </UserThumbnail>
            <Nickname>{nickname}</Nickname>
            <Comment>{comment}</Comment>
        </ProfileBox>}
        {followdisplay === 'block' &&<ProfileBox right = {'49%'} position = {'absolute'}>
            <UserThumbnail id = {username} thumbnail ={thumbnail}/>
            <Nickname>{nickname}</Nickname>
            <Comment>{comment}</Comment>
        </ProfileBox>}
        <FollowButton onClick={followclick} display={followdisplay}>{isfollow}</FollowButton>
    </Box>
    <FollowBox>
    <Column>
            <Following>팔로잉</Following>
            <Follower>팔로워</Follower>
            <Posting>포스팅</Posting>
        </Column>
        <NumColumn>
            <FollowerNum>{followerNum}</FollowerNum>
            <FollowingNum>{followNum}</FollowingNum>
            <PostingNum>{postNum}</PostingNum>
        </NumColumn>
    </FollowBox>
    </div>
);
export default Profile;
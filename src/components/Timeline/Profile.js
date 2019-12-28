import React from 'react';
import styled from 'styled-components';

const Box = styled.div`

position: absolute;
width: 1008px;
height: 183px;
left: 215px;

background: #FFFFFF;
border-bottom: 1px solid #515250;
`;

const ProfileBox = styled.div`
position: absolute;
width: 347px;
height: 93px;
left: 60px;
top: 20px;

`;

const UserThumbnail = styled.div`
position: absolute;
width: 80px;
height: 80px;
left: 60px;
top: 24px;
border-radius: 50%;
    cursor: pointer;
background-image: url(${props => props.thumbnail});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    filter: brightness(105%);
}
`;
const Nickname = styled.div`

position: absolute;
width: 92px;
height: 29px;
left: 170px;
top: 20px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 29px;
/* identical to box height */

display: flex;
align-items: center;
letter-spacing: 0.05em;

color: #000000;
`;

const Comment = styled.div`
position: absolute;
width: 237px;
height: 50px;
left: 170px;
top: 63px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 29px;
display: flex;
align-items: center;
letter-spacing: 0.05em;

color: #000000;
`;

const Column = styled.div`
position: absolute;
width: 306px;
height: 37px;
left: 407px;
top: 36px;

background: #FFFFFF;
`;
const NumColumn = styled.div`
position: absolute;
width: 306px;
height: 37px;
left: 407px;
top: 91px;

background: #FFFFFF;
`;
const Following = styled.div`
position: absolute;
width: 77px;
height: 37px;
left: 229px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const Follower = styled.div`
position: absolute;
width: 77px;
height: 37px;
left: 115px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;

const Posting = styled.div`
position: absolute;
width: 77px;
height: 37px;
left: 0px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 32px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;

const FollowerNum = styled.div`
position: absolute;
width: 77px;
height: 37px;
left: 115px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 21px;
line-height: 30px;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const FollowingNum = styled.div`
position: absolute;
width: 77px;
height: 37px;
left: 229px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 21px;
line-height: 30px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const PostingNum = styled.div`
position: absolute;
width: 77px;
height: 37px;
left: 0px;
top: 0px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 21px;
line-height: 30px;

align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
`;
const FollowButton = styled.div`
display : ${props=>props.display};
position: absolute;
width: 154px;
height: 45px;
left: calc(50% - 154px/2 + 339px);
top: 59px;

background: rgba(18, 184, 134, 0.1);
border-radius: 10px;
`;

const Profile = ({followclick,postingNum,followerNum,followNum,comment,nickname,username,thumbnail,followdisplay}) => (
    <Box>
        <ProfileBox>
            <UserThumbnail id = {username} thumbnail ={thumbnail}/>
            <Nickname>{nickname}</Nickname>
            <Comment>{comment}</Comment>
        </ProfileBox>
        <Column>
            <Following>팔로잉</Following>
            <Follower>팔로워</Follower>
            <Posting>포스팅</Posting>
        </Column>
        <NumColumn>
            <FollowerNum>{followerNum}</FollowerNum>
            <FollowingNum>{followNum}</FollowingNum>
            <PostingNum>{postingNum}</PostingNum>
        </NumColumn>
        <FollowButton onClick={followclick} display={followdisplay}/>
    </Box>

);
export default Profile;
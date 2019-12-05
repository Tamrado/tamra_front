import React from 'react';
import styled from 'styled-components';
import searchButtonImage from '../../../../build/static/images/iconmonstr-magnifier-6-32.png';

const FriendBox = styled.div`
min-width: 150px;
width : 80%;
height: 49px;
padding-left : 5rem;
padding-right : 5rem;
float:left;
`;
const SearchBox = styled.div`
min-width: 150px;
height: 49px;
position : relative;
float:left;
padding-top : 5px;
width : 90%;

`;
const SearchButton = styled.img`
margin-top : 10px;
position : absolute;
width: 32px;
hieght: 32px;
`;
const SearchlineRectangle = styled.div`
min-width: 144px;
width : 100%;
position : relative;
height: 49px;
margin-right : 10px;
background: rgba(18, 184, 134, 0.05);
border-radius: 23px;
`;
const SearchLine = styled.hr`
min-width: 144px;
width : 100%;
height: 1.5px;
background : rgba(0,0,0);
border : 0;
position : absolute;
display : inline;
top: 30px;
`;

const FriendSearch = () => (
    <FriendBox>
        <SearchBox>
            <SearchlineRectangle>
                <SearchLine/>
                </SearchlineRectangle>
        </SearchBox>
        <SearchButton src = {searchButtonImage}/>
    </FriendBox>
);
export default FriendSearch;
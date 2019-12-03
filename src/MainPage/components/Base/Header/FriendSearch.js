import React from 'react';
import styled from 'styled-components';
import searchButtonImage from '../../../../build/static/images/iconmonstr-magnifier-6-32.png';

const FriendBox = styled.div`
width: 700px;
height: 49px;
`;
const SearchBox = styled.div`
width: 504px;
height: 49px;
margin-right : 30px;
float:left;
`;
const SearchButton = styled.img`
margin-top : 10px;
width: 32px;
hieght: 32px;
`;
const SearchlineRectangle = styled.div`
width: 504px;
height: 49px;
top: 2px;
background: rgba(18, 184, 134, 0.05);
border-radius: 23px;
`;
const SearchLine = styled.hr`
width: 504px;
height: 1.5px;
background : rgba(0,0,0);
border : 0;
position:absolute;
display : inline;
top: 34px;
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
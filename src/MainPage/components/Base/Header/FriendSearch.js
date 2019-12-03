import React from 'react';
import styled from 'styled-components';
import {media} from '../../../../CommonFolder/lib/styleUtils';

const FriendBox = styled.div`
position: absolute;
width: 560px;
height: 49px;
left: 489px;
top: 2px;
`;
const SearchBox = styled.div`
width: 504px;
height: 49px;
`;
const SearchButton = styled.div`

width: 32px;
height: 32px;

`;
const SearchlineRectangle = styled.div`
position: absolute;
width: 504px;
height: 49px;
top: 2px;
background: rgba(18, 184, 134, 0.05);
border-radius: 23px;
`;
const SearchLine = styled.div`
position: absolute;
width: 504px;
height: 0px;
top: 34px;
border: 2px solid #000000;
`;

const FriendSearch = () => (
    <FriendBox>
        <SearchBox>
            <SearchlineRectangle>
                <SearchLine/>
                </SearchlineRectangle>
        </SearchBox>
        <SearchButton/>
    </FriendBox>
);
export default FriendSearch;
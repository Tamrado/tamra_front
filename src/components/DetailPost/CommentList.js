import React from 'react';
import CommentBox from './CommentBox';
import CommentView from './CommentView';

const CommentList = ({enterComment,comments,mainfeed,handleCommentAdd,addDisplay,commentThumbnail})=>{
    console.log(comments);
    const commentList = comments&& comments.size > 0 &&comments.map(
            (comment) => {
                 
                return <CommentBox comment={comment} />
            }
        )
        return(
            <CommentView handleCommentAdd={handleCommentAdd} commentThumbnail = {commentThumbnail}
             enterComment={enterComment} mainfeed={mainfeed} addDisplay={addDisplay}>
                {commentList}
            </CommentView>
        );
    }
    export default CommentList;
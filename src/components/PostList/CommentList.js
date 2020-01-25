import React from 'react';
import CommentBox from './CommentBox';
import CommentView from './CommentView';

const CommentList = ({thumbnail,enterComment,comments,mainfeed,handleCommentAdd,addDisplay,postId})=>{
    const commentList = comments.size > 0 &&comments.map(
            (comment) => {
                 
                return <CommentBox key = {comment.commentId} comment={comment} />
            }
        )
        return(
            <CommentView key = {postId} thumbnail = {thumbnail} handleCommentAdd={handleCommentAdd} 
             enterComment={enterComment} mainfeed={mainfeed} addDisplay={addDisplay}>
                {commentList}
            </CommentView>
        );
    }
    export default CommentList;
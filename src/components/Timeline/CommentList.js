import React from 'react';
import CommentBox from './CommentBox';
import CommentView from './CommentView';

const CommentList = ({enterComment,comments,mainfeed,handleCommentAdd,addDisplay,commentThumbnail,postId})=>{
    const commentList = comments.size > 0 &&comments.map(
            (comment) => {
                 
                return <CommentBox key = {comment.commentId} comment={comment} />
            }
        )
        return(
            <CommentView key = {postId} handleCommentAdd={handleCommentAdd} commentThumbnail = {commentThumbnail}
             enterComment={enterComment} mainfeed={mainfeed} addDisplay={addDisplay}>
                {commentList}
            </CommentView>
        );
    }
    export default CommentList;
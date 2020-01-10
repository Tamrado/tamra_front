import React from 'react';
import CommentBox from './CommentBox';
import CommentView from './CommentView';

const CommentList = ({comments,mainfeed,addDisplay,commentThumbnail,enterComment,postId,like,cancel,
    handleCommentAdd,trueComment})=>{
    const commentList = comments&& comments.size > 0 &&comments.map(
            (comment) => {
                 
                return <CommentBox comment={comment} />
            }
        )
        return(
            <CommentView handleCommentAdd={handleCommentAdd} userThumbnail = {commentThumbnail} postId={postId}
             enterComment={enterComment} mainfeed={mainfeed} addDisplay={addDisplay} enterComment={enterComment}
             handleCommentAdd = {handleCommentAdd} trueComment={trueComment} like={like} cancel={cancel}>
                {commentList}
            </CommentView>
        );
    }
    export default CommentList;
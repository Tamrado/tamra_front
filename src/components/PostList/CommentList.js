import React from 'react';
import CommentBox from './CommentBox';
import CommentView from './CommentView';

const CommentList = ({thumbnail,enterComment,comments,mainfeed,handleCommentAdd,addDisplay})=>{
    const commentList = comments.size > 0 &&comments.map(
            (comment) => {
                 
                return <CommentBox comment={comment} />
            }
        )
        return(
            <CommentView thumbnail = {thumbnail} handleCommentAdd={handleCommentAdd} 
             enterComment={enterComment} mainfeed={mainfeed} addDisplay={addDisplay}>
                {commentList}
            </CommentView>
        );
    }
    export default CommentList;
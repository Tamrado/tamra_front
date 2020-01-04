import React from 'react';
import CommentBox from './CommentBox';
import CommentView from './CommentView';

const CommentList = ({thumbnail,handleCommentInput,enterComment,comments,mainfeed})=>{
        const commentList = comments.map(
            (comment) => {
                return <CommentBox comment={comment} />
            }
        )
        return(
            <CommentView thumbnail = {thumbnail} handleCommentInput={handleCommentInput}
             enterComment={enterComment} mainfeed={mainfeed}>
                {commentList}
            </CommentView>
        );
    }
    export default CommentList;
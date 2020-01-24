import {dateTimeToFormatted} from './dateTimeModule';
import {TimelineActions,CommentActions} from './setActionModule';

const returnObjecttoFindIndex= (category,item)=>{
    return category === 'postList' ? item.getIn(['feed','postId']) : item.get('postId');
}
const returnCommentObject = (index,category,data,object)=>{
    return category === 'postList' ? data.getIn([index,'feed',object]) : data.getIn([index,object]);
}


const setCommentTime = async(commentList,category,data,id) => {
    let index,comments;
    if(category === 'detail' || category === 'postList')
        index = data.findIndex(item => returnObjecttoFindIndex('postList',item)===parseInt(id));
    else
        index = data.findIndex(item => returnObjecttoFindIndex('timeline',item)===parseInt(id));
    if(commentList !== null) 
        comments = commentList;
    else 
        comments = returnCommentObject(index,category,data,'commentList');
    console.log(comments.toJS());
        await Promise.all(
                comments.map(
                    async(comment,commentIndex) => {
                        let time = comment.timestamp;
                        let timestring = dateTimeToFormatted(time);
                        if(category === 'postList' )
                            await TimelineActions.setCommentTime({timestring:timestring,index : index,commentIndex:commentIndex});
                        else if(category === 'timeline')
                            await TimelineActions.setTimelineCommentTime({timestring:timestring,index : index,commentIndex:commentIndex});
                        else
                            await TimelineActions.setDetailCommentTime({timestring:timestring,commentIndex:commentIndex});
                        
                    }
                )
            );
}
export{setCommentTime};
//detail
export const clickDetailCommentAdd = async(postid,presentPost)=>{
    const id = postid.substr(1);
    if(presentPost.getIn(['feed','trueComment'])){        
        const page = presentPost.getIn(['feed','commentPage']);
        try{
            await CommentActions.showPostCommentList(id,page);
            await TimelineActions.setDetailCommentPage(id);
        }catch(e){
            TimelineActions.setCommentFalse(id);
        }
    } 
}
export const renderDetailCommentListAfterCommentAdd=async(comments,lastComment,id)=>{
    if(lastComment)
        await TimelineActions.setDetailCommentList({'commentId':id,'commentList':comments,'trueComment' :false});
    else
        await TimelineActions.setDetailCommentList({'commentId':id,'commentList':comments,'trueComment' :true});
    
}
export const clickCommentAdd = async(e,data,category)=>{
    const {id} = e.target;
    const index = data.findIndex(item => returnObjecttoFindIndex(category,item) ===parseInt(id));
if(returnCommentObject(index,category,data,'trueComment')){
    const page = returnCommentObject(index,category,data,'commentPage');
    try{
        await CommentActions.showPostCommentList(id,page);
        if(category === 'postList')
        await TimelineActions.setCommentPage(id);
        else
        await TimelineActions.setTimelineCommentPage(id);
    }catch(e){
        if(category === 'postList')
        TimelineActions.setCommentFalse(id);
        else
        TimelineActions.setTimelineCommentFalse(id);
    }
}
}
export const renderCommentListAfterCommentAdd = async(category,commentList,lastComment,id)=>{
    if(lastComment){
        if(category === 'postList')
        await TimelineActions.setCommentList({'commentId':id,'commentList':commentList,'trueComment' :false});
        else
        await TimelineActions.setTimelineCommentList({'commentId':id,'commentList':commentList,'trueComment' :false});
    }
    else{
        if(category === 'postList')
        await TimelineActions.setCommentList({'commentId':id,'commentList':commentList,'trueComment' :true});
        else
        await TimelineActions.setTimelineCommentList({'commentId':id,'commentList':commentList,'trueComment' :true});
    }
}
export const setCommentListDisplay = async(e,directory)=>{
    const {id} = e.target;
    const {category} = e.target.dataset;
    await TimelineActions.setCommentCategory(category);
    if(directory === 'postList')
        await TimelineActions.setCommentDisplay(id);
    else
        await TimelineActions.setTimelineCommentDisplay(id);
}
export const initializeCommentList =async(data,directory,id)=>{
    try{
        let index = data.findIndex(item => returnObjecttoFindIndex(directory,item)===parseInt(id));
        let page = returnCommentObject(index,directory,data,'commentPage');
        await CommentActions.showPostCommentList(id,page);
        if(directory === 'postList')
        await TimelineActions.setCommentPage(id);
        else
        await TimelineActions.setTimelineCommentPage(id);
    
}catch(e){
    
}
}
export const initializeDetailCommentList = async(presentPost,postid)=>{
    const id = postid.substr(1);
    let page = presentPost.getIn(['feed','commentPage']);
        await CommentActions.showPostCommentList(id,page);
        await TimelineActions.setDetailCommentPage(id);
}
export const returnCommentContextAndInitalize = async(e,postid) =>{
        const {innerText} = e.target;
        let id;
        if(postid !== null)
            id = postid.substr(1);
        else
            id = e.target.id;
        var content = innerText;
        content = content.replace(/\r/g, "");
        content = content.replace(/\n/g, "");
        await CommentActions.writeComment({id,content});
        await CommentActions.showPostCommentList(id,1);
        for(var i = 0; i < document.getElementsByName('^^comment').length; i++){
            if(parseInt(document.getElementsByName('^^comment')[i].id) === parseInt(id)){
                document.getElementsByName('^^comment')[i].textContent = '';
                document.getElementsByName('^^comment')[i].blur();
            }
        }
        await CommentActions.getCommentNum(id);
}


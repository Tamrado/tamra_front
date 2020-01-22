export let PostActions,SearchActions,TimelineActions;
export const setPostActions=(postActions)=>{
    PostActions = postActions;
}
export const setSearchActions=(searchActions)=>{
    SearchActions = searchActions;
}
export const setTimelineActions=(timelineActions)=>{
    TimelineActions = timelineActions;
}
export const handleLevelClick = (e) => {
    const {id} = e.target;
    PostActions.setShowLevel({showLevel : id});
    PostActions.setShowLevelDisplay('none');

    return id === 'public' ? PostActions.setLevel('전체 공개') :
    id === 'private' ? PostActions.setLevel('나만 보기') :
    PostActions.setLevel('친구 공개');
}
export const uploadOnlyContent = async(friendInfo,content,filelist,showLevel) => {
    var tags = friendInfo.toJS();
        if(content.length > 1000){
            setPopupMessage('글은 1000자 이하여야 합니다. 다시 입력해주세요.');
            return;
        }
        if(filelist.size > 9){
            setPopupMessage('이미지는 9장까지 게시할 수 있습니다.');
            return;
        }
        try{
        await PostActions.uploadFeed({content,showLevel,tags});
        }catch(e){
            return e.response.status === 409 ? setPopupMessage('글은 1000자 이하여야 합니다. 다시 입력해주세요.') :0;
        }
}
export const uploadImages = async(filelist,postId) =>{
    try{
        await Promise.all(filelist.map(
            async(value,index)=>{
               var formdata = new FormData();
               formdata.set('file',value.get('file'));
               if(postId !== -1 && formdata.get('file') !== null)
                  await PostActions.uploadImage(formdata,postId);
        })
       );
       await renewMain(postId);
   }catch(e){
       await PostActions.deleteFeed(postId);
       setPopupMessage('글을 게시하는 데 실패했습니다. 다시 시도해주세요.');
       return;
       }
       initializeWriteBoxContent();
       
}

const initializeWriteBoxContent = () => {
    PostActions.setDisplay('none');
    PostActions.setWithFriendDisplay('none');
    PostActions.setWithDisplay('none');
    closeWriteModal();
    PostActions.setWrittenData('');
    document.getElementById('^^content').textContent = '';
    PostActions.initializeFilelist();
    PostActions.initializeImage();
    handleCancel();
}

const renewMain = async(postId) => {
    await TimelineActions.getFeedInformationDetail(postId);
    await TimelineActions.renewMainInformation();
};
export const makeImageThumbnailAndFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
        PostActions.setImage({'url' : reader.result});
        PostActions.updateFilelist(file);
    }
    try{
        reader.readAsDataURL(file);
    }catch(e){
        setPopupMessage('파일 등록에 실패했습니다. 다시 시도해주세요.');
    }
  }
export const handleWriteBox = (e) => {
    const {innerText} = e.target;
    PostActions.setWrittenData(innerText);
}

 const setPopupMessage = (text) => {
    handleCancel();
    PostActions.setPopupDisplay('block');
    PostActions.setPopupText(text);
}

export const handleWriteClickButton = () => {
    PostActions.setPostPopupDisplay('block');
}

export const handleCancel = () => {
    PostActions.setPostPopupDisplay('none');
}
export const handleFileDelete = async(e) =>{
    const {id} = e.target;
    await PostActions.deleteFile(id);
}
export const handlePopupOk=()=>{
    PostActions.setPopupDisplay('none');
}

export const closeWriteModal = () => {
    PostActions.setWriteDisplay('none');
  }

export const handleWithBox = () => {
    PostActions.setWithFriendDisplay('block');
}

export const handleImageCancel = (e) => {
    const {id} = e.target;
    PostActions.removeImage(id);
}



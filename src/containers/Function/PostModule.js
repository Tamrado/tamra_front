import {closeWriteModal} from './WriteModule';
import {PostActions,SearchActions} from './setActionModule';
let opacity;
export const setOpacity = (Opacity) =>{
    opacity = Opacity;
}
export const closeWithBox = () => {
    PostActions.setWithFriendDisplay('none');
    
}
export const closeModal = () => {
    PostActions.setDisplay('none');
    SearchActions.setFriendContent('');
    
}
const writeBoxWithOpacity = ()=>{
    closeWriteModal();
    PostActions.setPopupDisplay('none');
    PostActions.setPostPopupDisplay('none');
}
const withBoxWithOpacity = ()=>{
    closeWithBox();
}
const tagBoxWithOpacity = () =>{
    closeModal();
}

export const scrollingAction = (e) => {
    const scrollTop =e.srcElement.scrollingElement.scrollTop;
    PostActions.setOpacity(0.8 - scrollTop / 800);
    if(opacity < 0){
        writeBoxWithOpacity();
        withBoxWithOpacity();
        tagBoxWithOpacity();
    }
  }
 

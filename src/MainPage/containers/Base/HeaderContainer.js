import React, {Component} from 'react';
import Header, {RegisterButton,UserThumbnail,FriendSearch,Menu} from '../../components/Base/Header';
import {connect} from 'react-redux';
import * as userActions from '../../../Auth/redux/modules/user';
import * as baseActions from '../../redux/modules/base';
import {bindActionCreators} from 'redux';
import UserMenuContainer from './UserMenuContainer';

class HeaderContainer extends Component {

    handleThumbnailClick = () => {
        const {BaseActions,menuvisible} = this.props;
        if(!menuvisible)BaseActions.setUserMenuVisibility(true);
        else BaseActions.setUserMenuVisibility(false);
    }

    render(){
    const {visible, user} = this.props;
    const {handleThumbnailClick} = this;
    let content,search = null;

    if(!visible) return null;

    /*if(user.get('logged')){
        content = <UserThumbnail thumbnail={user.getIn(['loggedInfo','thumbnail'])} onClick={handleThumbnailClick}/>;
        search = <FriendSearch/>;
    }
    else{
        content = <RegisterButton/>;
    }*/
        return(
            <Header>
                <FriendSearch/>
                <UserMenuContainer eventTypes="click"/>
           </Header>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        menuvisible: state.base.getIn(['userMenu','visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch)
    })
) (HeaderContainer);
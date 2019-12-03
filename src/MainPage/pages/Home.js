import React, { Component } from 'react';
import storage from '../../CommonFolder/lib/storage';

class Home extends Component {
    componentDidMount(){
        this.initializeUserInfo();
    }
    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo){
            window.location.href = '/auth/Login'
        }
    }
    render() {
        return (
            <div>home</div>
        );
    }
}

export default Home;
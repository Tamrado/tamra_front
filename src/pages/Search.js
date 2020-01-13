import React, { Component } from 'react';
import storage from '../lib/storage';
import {Ready} from '../components/Page';
class Search extends Component {
    componentDidMount(){
        this.initializeUserInfo();
    }
    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo){
            window.location.href = '/auth/login?expired';
            return;
        }
    }
    render() {
        return (
            <Ready/>
        )
    }
}
export default Search;
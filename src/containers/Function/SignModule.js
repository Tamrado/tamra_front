import storage from '../../lib/storage';
export const handleLogout = async()=> {
    try{
        await UserActions.logout();
    }catch (e){
        console.log(e);
    }

    storage.remove('loggedInfo');
    window.location.href='/auth/Login';
}
let UserActions;
export const setUserActions = (userActions) => {
    UserActions=userActions;
}

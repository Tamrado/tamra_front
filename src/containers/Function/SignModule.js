import storage from '../../lib/storage';
import {setPassword,validate,checkEmailExists,checkPhoneExists,checkIdExists,setError} from './ValidateModule';

export const handleLogout = async()=> {
    try{
        await UserActions.logout();
    }catch (e){
        console.log(e);
    }

    storage.remove('loggedInfo');
    window.location.href='/auth/Login';
}
let UserActions,AuthActions,PostActions,id,formData = new FormData();

const setMatchId = (matchId) => {
    id = matchId;
}
export{setMatchId};

const setPostActions = (postActions)=> {
    PostActions = postActions;
}
export{setPostActions};
const setAuthAction = (authActions) => {
    AuthActions = authActions;
}
export {setAuthAction};

export const setUserActions = (userActions) => {
    UserActions=userActions;
}
const getValidation = (name,value) => {
    return validate[name](value);
}
const checkObjectExists = (name,value,username) => {
    return name.indexOf('email') > -1 ? checkEmailExists(value,username) :
    name.indexOf('phone') > -1 ?  checkPhoneExists(value,username) : 
    name.indexOf('id') > -1 ? checkIdExists(value) :
     0;       
}
const validateAndCheckExist = (name,value,username) => {
    return name.indexOf('address') > -1 || name.indexOf('birthday') > -1 ? 0 :
    !getValidation(name,value) || name.indexOf('password') > -1  ? 0 :
    checkObjectExists(name,value,username);
}
const validateBeforeModify = (name,value) => {
if(!storage.get('loggedInfo').username.includes('Kakao')&&name.indexOf('password') > -1 
&&name.indexOf('Confirm') === -1){
    setPassword(value);
}
    return validateAndCheckExist(name,value,storage.get('loggedInfo').username);
}
const validateBeforeRegister = (name,value) => {
    if(name.indexOf('password') > -1&&name.indexOf('Confirm') === -1) setPassword(value);
    return validateAndCheckExist(name,value,null);
}

export const handleChange = (e) =>{
    const {name, value} = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'register'  
    });
    return storage.get('loggedInfo') ? validateBeforeModify(name,value) :
    validateBeforeRegister(name,value); 
}


const kakaoRegisterValidate = (form)=>{
    return !getValidation('email',form.email)
    || !getValidation('comment',form.comment);
}
const modifyValidate = (form) => {
    return kakaoRegisterValidate(form) ||
    !getValidation('name',form.name)||
    !getValidation('phone',form.phone)||
    !getValidation('gender',form.gender)||
    (!form.id.includes('Kakao')&&!getValidation('password',form.password))||
    (!form.id.includes('Kakao')&&!getValidation('passwordConfirm',form.passwordConfirm));

}
const registerValidate = (form) => {
    return modifyValidate(form) ||
    !getValidation('id',form.id)
}
const validateRegister = (method,form,error) => {
   return  error ? false : 
            method === 'kakaoRegister' && kakaoRegisterValidate(form)? false :
            method === 'register' && registerValidate(form) ? false :
            method === 'modify' && modifyValidate(form) ? false : true;
}

export const handleRegister = async(method,form,error) => {
    console.log(1);
    if(!validateRegister(method,form,error)) return;
    return method === 'kakaoRegister'? await kakaoLogic(form) : 
    method === 'register' ? await registerLogic(form,formData) :
    method === 'modify' ? await modifyLogic(form) : 0;
    }
export const makeFormData = async(file,id) => {
    console.log(id);
    if(file !== null)
        formData.append('file',file);
    else
        formData.append('file',null);
        formData.append('userId',id);
}

const setErrorMessage=(status)=>{
    if(status === 411)
        setError('조건에 맞는 데이터를 입력해주세요.','main');
    if(status === 409)
        setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.','main');
}

const kakaoLogic=async(form)=>{
    const {email,comment} = form;
    try{
        await AuthActions.kakaoRegister({
           email,id,comment
       });
       
   } catch(e){
       setErrorMessage(e.response.status);
   }

}
const registerLogic= async(form,formData) =>{
    const {email,id,password, phone,name,comment,address,gender,birthday} = form;
    try{
        await AuthActions.localRegister({
            email,id,password,name,comment,phone,address,gender,birthday
        });
    } catch(e){
        setErrorMessage(e.response.status);
    }
    try{
        await AuthActions.localRegisterImage(
            formData
        );
            
    } catch(e){
        if(e.response.status === 422)
            setError('알 수 없는 에러가 발생했습니다.','main');
        if(e.response.status === 409)
            setError('다른 회원의 아이디와 동일합니다. 다시 입력해주세요.','main');
        if(e.response.status === 411)
            setError('조건에 맞는 데이터를 입력해주세요.','main');
    }
}
const modifyLogic = async (form) => {
    let {email,id,password, phone,name,comment,address,gender,birthday} = form;
    try{
        let pw = password;
        if(typeof pw === 'undefined')
            pw = null;
        await AuthActions.modifyUserInfo({
            email,id,pw,name,comment,phone,address,gender,birthday
        });
        storage.remove('passed');
        PostActions.setPopupDisplay('block');
        } catch(e){
            setErrorMessage(e.response.status);
        }
    }
    export const registerNextPhase=(result)=>{
        const loggedInfo = result.toJS();
            storage.set('loggedInfo', loggedInfo);
            UserActions.setLoggedInfo(loggedInfo);
            UserActions.setValidated(true);
            PostActions.setPopupDisplay('block');
    }
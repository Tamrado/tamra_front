import {isEmail,isAlphanumeric,isLength} from 'validator';
import debounce from 'lodash/debounce';

export let AuthActions;
export let password;
const setAuthActions = (authActions) => {
    AuthActions = authActions;
}
export {setAuthActions};
const setPassword = (Password) => {
    password = Password;
}
export {setPassword};
const setError = (message,id) => {
    AuthActions.setError({form: 'register',message});
    AuthActions.setErrorId({form: 'register',id});
};
export {setError};
export const validate = {
    email: (value) => {
        if(!isEmail(value)){
            setError('잘못된 이메일 형식 입니다.','email');
            return false;
        }
        return true;
    },
        id: (value) => {
        if(!isAlphanumeric(value) || !isLength(value, {min:9, max: 15})) {
            setError('아이디는 9~15 글자의 알파벳 혹은 숫자로 이루어져야 합니다.','id');
            return false;
        }
        return true;
    },
    password: (value) => {
        
        if(!new RegExp(/^(?=.*\d)(?=.*[~`!@#$%\\^&*()-])(?=.*[a-z])(?=.*[A-Z]).{9,12}$/).test(value)){
            setError('비밀번호는 9~12 글자의 알파벳 (대소문자 구분), 숫자, 특수문자로 이루어져야 합니다.','password');
            return false;
        }
        else if(new RegExp(/(\w)\1\1\1/).test(value)){
            setError('비밀번호는 같은 문자를 4번 이상 사용할 수 없습니다.','password');
            return false;
        }
        setError(null);
        return true;
    },
    passwordConfirm: (value) => {
        if(password !== value){
            setError('비밀번호 확인이 일치하지 않습니다.','passwordConfirm');
            return false;
        }
        setError(null);
        return true;
    },
    phone: (value)=> {
        if(!new RegExp(/^01(?:0|1|[6-9])-(\d{3}|\d{4})-(\d{4})$/).test(value)){
           setError('핸드폰 번호는 01x-xxx(x)-xxxx와 같은 형태로 입력해야 합니다.','phone');
            return false;
        }
        return true;
    },
    comment: (value)=> {
        if(!isLength(value, {min:0, max: 50})){
            setError('코멘트는 50자를 넘길 수 없습니다.','comment');
            return false;
        }
        setError(null);
        return true;
    },
    name: (value) => {
        if(!isLength(value, {min:1, max: 30})){
            setError('이름은 1자 이상 30자 이하여야 합니다.','name');
            return false;
        }
        setError(null);
        return true;
    },
    gender: (value) => {
        if(value == null){
            setError('성별은 반드시 입력해야 합니다.','gender');
            return false;
        }
        setError(null);
        return true;
    }

};

export const checkEmailExists = debounce(async (email) => {
    try{
        await AuthActions.checkEmailExists(email,'null');
        setError(null,'email');
    }catch(e){
        setError('이미 존재하는 이메일입니다.','email');
    }
},300);

export const checkIdExists = debounce(async(id)=> {
    try{
        await AuthActions.checkIdExists(id);
            setError(null,'id');
        
    } catch (e){
        setError('이미 존재하는 아이디입니다.','id');
    }
},300);

export const checkPhoneExists = debounce(async(phone) => {
    try{
        await AuthActions.checkPhoneExists(phone,'null');
            setError(null,'phone');
        
    }catch (e){
        setError('이미 존재하는 핸드폰 번호입니다.','phone');
    }
},300);

export const inputStyle = {
    width: '15%',
    left: '5%',
    position: 'relative',
outline: 'none',
borderRadius: '0px',
lineHeight: '2.5rem',
fontSize: '1.2rem',
paddingLeft: '0.5rem',
fontFamily: 'Noto Sans KR',
fontStyle: 'normal',
paddingRight: '1rem',
marginRight : '1rem'
}

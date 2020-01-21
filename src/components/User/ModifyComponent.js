import {inputStyle} from '../../containers/Function/ValidateModule';
import {AuthContent,InputWithLabel,AuthButton,AuthError,Label} from '../Auth';
import React from 'react';

const ModifyComponent = ({error,errorId,id,password,passwordConfirm,email,name,phone,birthday,comment,address,gender,
    handleChange,handleLocalRegister,enterRegister})=> {
    return(
        <AuthContent title='MY PAGE'>
                <InputWithLabel label = "아이디" name="id" placeholder="아이디" 
                value = {id}
                disabled/>
               { id&&!id.includes('Kakao') && <InputWithLabel label = "비밀번호(필수)" name="password" placeholder="비밀번호"
                type="password" enter = {enterRegister}
                defaultValue = {password} onChange={handleChange}
                />
               }
                {
                    errorId === 'password' &&error && <AuthError>{error}</AuthError>
                }
              
               { id&&!id.includes('Kakao') && <InputWithLabel label = "비밀번호 확인(필수)" name="passwordConfirm" placeholder="다시 한번 입력"
                type="password" enter = {enterRegister}
                defaultValue={passwordConfirm} onChange={handleChange}
                />
            }
                {
                    errorId === 'passwordConfirm' &&error && <AuthError>{error}</AuthError>
                } 
            
                <InputWithLabel label = "생년월일" name="birthday" 
                type="date" enter = {enterRegister}
                defaultValue = {birthday} onChange={handleChange}
                />
                {
                    errorId === 'birthday' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "이메일(필수)" name="email" placeholder="timeline@naver.com" 
                type="email" enter = {enterRegister}
                defaultValue = {email}
                onChange={handleChange}/>
                {
                    errorId === 'email' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "핸드폰 번호(필수)" name="phone" placeholder="010-1234-1234" 
                defaultValue={phone} enter = {enterRegister}
                onChange={handleChange}/>
                {
                    errorId === 'phone' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "이름" name="name" placeholder="이름" enter = {enterRegister}
                defaultValue = {name} onChange={handleChange}/>
                {
                    errorId === 'name' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "코멘트" name="comment" placeholder="반갑습니다." enter = {enterRegister}
                defaultValue = {comment} onChange={handleChange} /> <br/>
                {
                    errorId === 'comment' &&error && <AuthError>{error}</AuthError>
                } 
                <Label label = "성별(default : 여,필수)"></Label>
                <input style ={inputStyle} name= "gender" type="radio" value = {0} onKeyUp = {enterRegister} defaultChecked={gender === 0}onChange={handleChange} />여자
                <input style ={inputStyle} name="gender" type="radio" value = {1} onKeyUp = {enterRegister} defaultChecked={gender === 1} onChange={handleChange} />남자
                <input style ={inputStyle} name="gender" type="radio" value = {2} onKeyUp = {enterRegister}  defaultChecked={gender === 2} onChange={handleChange} />others
            {
                    errorId === 'gender' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label ="주소" name ="address" placeholder="서울" enter = {enterRegister} defaultValue = {address} onChange={handleChange} />
                {
                    errorId === 'address' &&error && <AuthError>{error}</AuthError>
                }              
                <AuthButton onClick={handleLocalRegister}>확인</AuthButton>
                {
                    errorId === 'main' &&error && <AuthError>{error}</AuthError>
                }  
                </AuthContent>
                );
    }
    export default ModifyComponent;
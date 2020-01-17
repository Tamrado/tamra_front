import {inputStyle} from '../../containers/Function/ValidateModule';
import {AuthContent,InputWithLabel,AuthButton,RightAlignedLink,AuthError,Label} from '.';
import React from 'react';

const RegisterComponent = ({error,errorId,id,password,passwordConfirm,email,name,phone,birthday,comment,address,gender,
    handleChange,handleLocalRegister,defaultNullChange,handleFileInput,checkedChange,enterRegister})=> {
    return(
        <AuthContent title='SIGN UP'>
            <InputWithLabel label = "아이디(필수)" name="id" placeholder="아이디" enter = {enterRegister}
            value = {id}
            onChange={handleChange}/>
             {
                errorId === 'id' &&error && <AuthError>{error}</AuthError>
            }               
            <InputWithLabel label = "비밀번호(필수)" name="password" placeholder="비밀번호" enter = {enterRegister}
            type="password"
            value={password} onChange={handleChange}
            />
            {
                errorId === 'password' &&error && <AuthError>{error}</AuthError>
            }  
            <InputWithLabel label = "비밀번호 확인(필수)" name="passwordConfirm" placeholder="다시 한번 입력"
            type="password" enter = {enterRegister}
            value={passwordConfirm} onChange={handleChange}
            />
            {
                errorId === 'passwordConfirm' &&error && <AuthError>{error}</AuthError>
            }  
            <InputWithLabel label = "생년월일(선택)" name="birthday" placeholder="****-**-**"
            type="date" enter = {enterRegister}
            value = {birthday} onChange={defaultNullChange}
            />
            {
                errorId === 'birthday' &&error && <AuthError>{error}</AuthError>
            } 
            <InputWithLabel label = "이메일(필수)" name="email" placeholder="timeline@naver.com"
            type="email" enter = {enterRegister}
            value = {email}
            onChange={handleChange}/>
            {
                errorId === 'email' &&error && <AuthError>{error}</AuthError>
            } 
            <InputWithLabel label = "핸드폰 번호(선택)" name="phone" placeholder="010-1234-1234"
            value={phone} enter = {enterRegister}
            onChange={handleChange}/>
            {
                errorId === 'phone' &&error && <AuthError>{error}</AuthError>
            } 
            <InputWithLabel label = "이름(필수)" name="name" placeholder="이름" enter = {enterRegister}
            value = {name} onChange={handleChange}/> 
            {
                errorId === 'name' &&error && <AuthError>{error}</AuthError>
            } 
            <InputWithLabel label = "코멘트(선택)" name="comment" placeholder="반갑습니다."
            value = {comment} onChange={handleChange} enter = {enterRegister}/>
            {
                errorId === 'comment' &&error && <AuthError>{error}</AuthError>
            } 
             <br/>
            <Label label = "성별(default : 여,필수)"></Label>
            <input style={inputStyle}  name= "gender" type="radio" value='0' onKeyUp = {enterRegister} onChange={checkedChange} />여성
            <input style={inputStyle} name="gender" type="radio" value ={1} onKeyUp = {enterRegister}  onChange={checkedChange}/>남성
            <input style={inputStyle} name="gender" type="radio"value={2} onKeyUp = {enterRegister} onChange={checkedChange} />others
            {
                errorId === 'gender' &&error && <AuthError>{error}</AuthError>
            } 
            <InputWithLabel enter = {enterRegister} label ="주소(선택)" name ="address" placeholder="서울" value = {address} onChange={defaultNullChange} />
            {
                errorId === 'address' &&error && <AuthError>{error}</AuthError>
            } 
            <InputWithLabel enter = {enterRegister} label = "프로필 사진(선택)" name ="image" type="file" accept=".gif, .jpg, .png" onChange={handleFileInput}></InputWithLabel>
           
            <AuthButton onClick={handleLocalRegister} enter = {enterRegister}>회원가입</AuthButton>
            {
                    errorId === 'main' &&error && <AuthError>{error}</AuthError>
                } 
            <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
        </AuthContent>
    )
}
export default RegisterComponent;
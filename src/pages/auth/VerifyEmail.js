import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import AuthApi from '../../api/auth-login';
import { Login } from './Login';

export const VerifyEmail = () => {

      const { id, hasEmail } = useParams();
      const [oneRun, setOneRun] = useState(true);
      const [email, setEmail] = useState(false);
      const verifyEmail = async (id, hasEmail, token) => {
        const response = await AuthApi.verifyEmail(id, hasEmail, token);
        if(response.success === "Email Verify Success"){
          setEmail(true)
        }
      };
      if(oneRun){
          verifyEmail(id, hasEmail, localStorage.getItem('token'));
          setOneRun(false)
        }
      // localStorage.setItem('id',id)
      // localStorage.setItem('hasEmail',hasEmail)
        
    return <Login emailVerify = {email} id={id} hasEmail={hasEmail} handleVerifyEmail={(id, email,token)=>verifyEmail(id, email,token)}/>;
}

import React, { useState } from 'react'
import {  useParams } from 'react-router-dom';
import AuthApi from '../../../Api/auth-login';
import { Login } from '../Login';

export const VerifyEmail = () => {

      const { id, hasEmail } = useParams();
      const [oneRun, setOneRun] = useState(true);
      const [emailVerify, setEmailVerify] = useState(false);

      const handleVerifyEmail = async (id, hasEmail, token) => {
        const response = await AuthApi.verifyEmail(id, hasEmail, token);
        if(response.success === "Email Verify Success"){
          setEmailVerify(true)
        }
      };
      
      if(oneRun){
          handleVerifyEmail(id, hasEmail, localStorage.getItem('token'));
          setOneRun(false)
        }
        
    return (
      <Login
        emailVerify={emailVerify}
        id={id}
        hasEmail={hasEmail}
        handleVerifyEmail={(id, email, token) => handleVerifyEmail(id, email, token)}
      />
    );
}

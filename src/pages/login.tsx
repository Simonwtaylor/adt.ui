import * as React from 'react';
import { SignIn } from '../components/sign-in/';
import { withAuth } from '../components/hoc';

export interface ILoginProps { }
 
const Login: React.FC<ILoginProps> = () => { 
  return (
    <div className='login'>
      <SignIn />
    </div>
  );
}

export default withAuth(Login);
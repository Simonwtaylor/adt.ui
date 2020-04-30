import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, UserActionTypes } from '../redux/user';
import { auth } from '../lib/utils/firebase.utils';
import { useRouter } from 'next/router';
import { Navbar } from '../components/navbar';

export interface IUserProps {
  
}
 
const User: React.FC<IUserProps> = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleItemClick = (item: string) => {
    console.log(item);
  };


  return (
    <div className={'user'}>
      <Navbar
        activeItem={''}
        handleItemClick={handleItemClick}
      />
      {
        (
          user?.displayName && 
          <h1>{user.displayName}'s Settings </h1>
        )
      }
      {
        (
          user?.photoURL &&
          <img 
            width={25} 
            height={25} 
            src={user.photoURL}
            style={{borderRadius: 50}} 
            alt="profile"
          />
        )
      }
      <br />
      <Button onClick={async () => {
        await auth.signOut();
        dispatch({ type: UserActionTypes.SET_CURRENT_USER });
        router.push('/');
      }
      }>
        Log Out 
      </Button>
    </div>
  );
}
 
export default User;
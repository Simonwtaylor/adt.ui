import * as React from 'react';
import { auth } from '../../lib/utils/firebase.utils';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { googleSignInStart } from '../../redux/user/user.action';
 
export interface ISignInProps {
  signInWithGoogle?: any;
}
 
export interface ISignInState {
}
 
class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);
    this.state = { 
    };
  }

  getUserInfo = () => {
    if(auth && auth.currentUser && auth.currentUser.photoURL) {
      return (
        <img
          width={30}
          height={30}
          src={auth.currentUser.photoURL}
          alt="profile sign in"
        />
      )
    }
    return <></>;
  }

  render() { 
    return (
      <div className="sign-in">
        <h2>
          I already have an account
        </h2>
        {this.getUserInfo()}
        <Button inverted type="button" color="blue" onClick={this.props.signInWithGoogle}>
          <Icon name="google" />
          Sign in with Google
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  signInWithGoogle: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
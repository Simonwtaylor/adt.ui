import * as React from 'react';
import { auth, createUserProfileDocument } from '../../lib/utils';
import { setCurrentUser } from '../../redux/user';
import { connect } from 'react-redux';
import { compose } from 'redux';

export interface IWithAuthentication {
  setCurrentUser: (user: any) => void;
}

const withAuthentication = <P extends IWithAuthentication> (
  Component: React.ComponentType<P>
) => {
  return class WithAuthentication extends React.Component<P> {
    constructor(props: P) {
      super(props);
    }
    private unsubscribeFromAuth: any = null;

    componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userRef = await createUserProfileDocument(user, {});
  
          if (userRef) {
            this.props.setCurrentUser({
              id: userRef.id, 
              ...userRef,
            });
          }
        }
        this.props.setCurrentUser(user);
      });
    }

    render() {
      return (
        <Component
          {...this.props as P}
        />
      )
    }
  }
};


const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
});

const composedWithAuthentication =  compose(
  connect(null, mapDispatchToProps),
  withAuthentication,
);

export default composedWithAuthentication;
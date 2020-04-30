import Head from 'next/head';
import * as React from 'react';
import { withAuth } from '../components/hoc';

interface IHomeProps {

}

const Home: React.FC<IHomeProps> = () => {
  return (
    <div>
      Hello world
    </div>
  )
};

export default withAuth(Home);

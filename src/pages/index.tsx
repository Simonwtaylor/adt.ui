import Head from 'next/head';
import * as React from 'react';
import { withAuth } from '../components/hoc';
import { Navbar } from '../components/navbar';

interface IHomeProps {

}

const Home: React.FC<IHomeProps> = () => {

  const handleItemClick = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <Navbar
        activeItem={''}
        handleItemClick={handleItemClick}
      />
      Hello world
    </div>
  )
};

export default withAuth(Home);

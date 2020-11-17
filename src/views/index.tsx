import React, { Fragment } from 'react';

interface IndexProps {
  user: any;
}

const Index = ({ user }: IndexProps) => {
  return (
    <Fragment>
      <p>Hello {user.name}!</p>
    </Fragment>
  );
};

export default Index;

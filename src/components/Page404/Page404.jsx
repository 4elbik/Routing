import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_LINK } from '../../routes/endpoints';

const Page404 = () => {
  return (
    <div className="content">
      <h1>404 Not Found</h1>
      <div>
        <Link to={HOME_LINK}>Back to Home page</Link>
      </div>
    </div>
  );
};

export default Page404;
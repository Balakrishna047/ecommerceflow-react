// import {Navigate, Route} from 'react-router-dom'
// import Cookie from 'js-cookie'

// const ProtectedRoute = props => {
//   const token = Cookie.get('jwt_token')
//   if (token === undefined) {
//     return <Navigate to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoute

import { Navigate, useLocation } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = Cookie.get('jwt_token');
  const location = useLocation();

  if (!token) {
    // Redirect to login page and preserve the current location
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

import { FC, ReactNode, useState } from "react";
import useAuth from "./Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types';
import Login from "../components/Auth/Login";

interface AuthGurdProps {
    children : ReactNode;
}

const AuthGuard: FC<AuthGurdProps> = (props) => {
    const {children} = props;
    const auth = useAuth() as any;
    const location = useLocation()
    const [requestedLocation, setRequestedLocation] = useState<string | null>();

  if (!auth.isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Login />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
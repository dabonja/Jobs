import React from 'react';
import { Route,Navigate  } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading';
import TestComponent from './TestComponent';


const PrivateRoute = ({ children, ...rest }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if(!isAuthenticated){
        return <Loading/>;
    }
    return <TestComponent/>;
};  

export default PrivateRoute
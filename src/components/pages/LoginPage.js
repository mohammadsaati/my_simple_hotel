import React, { useContext, useEffect } from 'react'

import LoginForm from '../forms/LoginForm';
import { UserContext } from '../../contexts/user/UserContext';

const LoginPage = () => {
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.state.cheeckLogedIn();
        if (userContext.state.isLogedIn) {
            window.location.replace('/panel')
        }
    }, [userContext.state]);


    return (
        <div className="container-fluid" style={style.bg}>
            <div className="row d-flex justify-content-center">
                <LoginForm />
            </div>
        </div>
    );

}

const style = {
    bg: {
        backgroundImage: 'linear-gradient(120deg,#5653ce,#44d0d766)',
        height: '100vh',
    }
}

export default LoginPage;
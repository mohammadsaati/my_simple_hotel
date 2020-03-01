import React from 'react';

import RegisterForm from '../forms/RegisterForm';

const RegisterPage = () => {

    return (
        <div className="container-fluid" style={style.bg}>
            <div className="row d-flex justify-content-center">
                    <RegisterForm />
            </div>
        </div>
    );

}

const style = {
    bg: {
        backgroundImage: 'linear-gradient(120deg,#5653ce,#44d0d766)',
        height: '100vh' ,
    }
}

export default RegisterPage;
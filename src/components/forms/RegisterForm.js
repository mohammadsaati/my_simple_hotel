import React, { useState, useContext } from 'react';

import { UserContext } from '../../contexts/user/UserContext';

const RegisterForm = () => {

    const userContext = useContext(UserContext);
    const [error, setError] = useState(false);
    const [regInfo, setRegInfo] = useState({
        'password': '',
        'confirmPassword' : '',
        'email': ''
    });

    const onChange = (e) => setRegInfo({ ...regInfo, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!regInfo.email || !regInfo.password || regInfo.confirmPassword !== regInfo.password) {
            setError(true);
            setTimeout(() => setError(false), 2000);
        } else {
           userContext.state.signUp(regInfo.email , regInfo.password)
        }
    }
    return (

        <div className="col-lg-4 col-md-12 text-center" style={style.box}>
            {
                error ? <p className="text-center text-danger">Please fill out the form carfully</p> : ''
            }
            <form onSubmit={onSubmit}>

                <div className="form-group d-flex align-items-end">
                    <i className="col-1 fas fa-envelope-open-text"></i>
                    &nbsp;
                    <input type="email" className="col-9 my-input" name="email" value={regInfo.email} placeholder="Email" onChange={onChange} />
                </div>

                <div className="form-group d-flex align-items-end">
                    <i className="col-1 fas fa-lock"></i>
                    &nbsp;
                    <input type="password" className="col-9 my-input" name="password" value={regInfo.password} placeholder="password" onChange={onChange} />
                </div>

                <br/>
                <div className="form-group d-flex align-items-end">
                    <i className="col-1 fas fa-lock"></i>
                    &nbsp;
                    <input type="password" className="col-9 my-input" name="confirmPassword" value={regInfo.confirmPassword} placeholder="confirm Password" onChange={onChange} />
                </div>


                <br />
                <button type="submit" className="btn btn-outline-primary text-center full-width">
                    Register
                </button>

            </form>
        </div>
    );
}

const style = {
    box: {
        marginTop: '30vh',
        padding: '30px',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
}

export default RegisterForm;
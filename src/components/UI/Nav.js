import React , { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


import { UserContext } from '../../contexts/user/UserContext';

const Nav = () => {
    const userContext = useContext(UserContext);

    const logOut = () => {
        userContext.state.singOut();
        Swal.fire({
            icon: 'success',
            title: 'You loged out',
            html: '',
            timer: 2000,
        })
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <h4 className="navbar-brand"><b>Hotel Application</b></h4>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/panel">panel</Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" onClick={logOut}>signOut</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
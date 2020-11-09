import React from 'react';
import Auth from '../Auth';
import { useHistory } from 'react-router-dom'

function Header() {

    let history = useHistory();

    const onLogout = () => {
        Auth.onLogout(() => {
            history.push('/')
            localStorage.removeItem('cryptotoken')
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand text-light" href="# disable">Crypto demo exchange</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <button onClick={onLogout} className="btn btn-outline-danger my-2 my-sm-0" type="button">Logout</button>
                </div>
            </div>
        </nav>
    )
};

export default Header;
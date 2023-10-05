import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () =>{
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = (event) =>{
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
            <span className="brand-logo">Shorten Links</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/create">Create Link</Link></li>
                <li><Link to="/links">Links</Link></li>
                <li><a href="/" onClick={logoutHandler}>Sign Out</a></li>
            </ul>
            </div>
        </nav>
    )
}
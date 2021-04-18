import React from 'react';
import './navbar.scss';
import '../../App.scss';
import pawImage from '../../images/paw-dog.png';
import {Link} from 'react-router-dom';

export default function Navbar(props)
{
    return (
        <nav>
            <Link to='/' className="cursor-pointer custom-links">
                <span className="title">DOGS</span>
                <img
                    src={pawImage}
                    alt="paw dog"
                    className={'paw-dog-image'} 
                />
            </Link>
        </nav>
    )
}
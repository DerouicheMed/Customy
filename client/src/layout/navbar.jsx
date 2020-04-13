import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <div class="navbar-header">
                    <Link class="navbar-brand" to="/management/studies">    
                        <img src="/img/logo-ts.png" alt="logo" class="logo-min" />                   
                        <span><img src="/img/logo.png" alt="logo" class="dark-logo" width="150px" /></span>
                    </Link>
                </div>
                <div class="navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up waves-effect waves-dark"><i class="fa fa-bars"></i></a> </li>
                    </ul>
                    <ul class="navbar-nav my-lg-0">
                        <li class="nav-item dropdown u-pro">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../assets/images/users/1.jpg" alt="user" class="" /> <span class="hidden-md-down">Mark Sanders &nbsp;</span> </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
     );
}
 
export default Navbar;
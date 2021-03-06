import React from 'react';

const Header = ({ title }) => (
    <div>
    <a href="/">Home</a>
    <a href="/myprofile">MyProfile</a>
    <a href="/member">Member</a>
    <h1>{title}</h1>
    </div>
);

export default Header;
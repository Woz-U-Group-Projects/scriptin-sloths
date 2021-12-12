import React from 'react';
import Header from '../components/Header';
import Members from '../components/Users'

const Member = () => (
  <div>
    <h2>Member</h2>

    <Members uri="http://localhost:3002/users/members" />
  </div>
);

export default Member;
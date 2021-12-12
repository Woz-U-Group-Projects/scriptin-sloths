import React from 'react';
import Header from '../components/Header';
import Users from '../components/Users';


const MyProfile = () => (
  <div >
   <Users uri="http://localhost:3002/users/user" />
 <h1>my profile</h1>
<div>
 <h1>Hello !!</h1>
<h2></h2>
<h2>Email: </h2>
<h3>Username: </h3>
</div>
<hr/>
<form action="http://localhost:3002/users/status" method="POST">

    

    <div>

        <label for="StatusBody">Update Status!: </label>

        <input type="text" name="StatusBody"/>

    </div>
    
    <div>
        <button type="submit">Submit</button>
    </div>


</form>
 
  

  </div>
);

export default MyProfile;
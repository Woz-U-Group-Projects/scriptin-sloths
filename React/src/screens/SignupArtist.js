import React from 'react';



const SignupArtist = () => (
  <div>
    <h1>Welcome! Please sign up</h1>

<form id="artistsu" name="artistsu" method="POST" action="http://localhost:3002/users/artistsu">
    <div>
        <label for="name">First Name: </label>
        <input type="text" name="firstName" required/>
    </div>
    <div>
        <label for="name">Last Name: </label>
        <input type="text" name="lastName" required/>
    </div>
    <div>
        <label for="name">Email: </label>
        <input type="text" name="email" required/>
    </div>
    <div>
        <label for="name">Group Name: </label>
        <input type="text" name="username" required/>
    </div>
    <div>
        <label for="name">Password: </label>
        <input type="password" name="password" required/>
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
  </div>
);

export default SignupArtist;
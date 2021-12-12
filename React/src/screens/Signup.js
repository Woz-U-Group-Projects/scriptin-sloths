import React from 'react';



const Signup = () => (
  <div>
    <h1>Welcome! Please sign up</h1>

<form id="signup" name="signup" method="POST" action="http://localhost:3002/users/signup">
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
        <label for="name">Username: </label>
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

export default Signup;
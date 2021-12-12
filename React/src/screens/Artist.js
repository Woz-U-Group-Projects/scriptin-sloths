import React from 'react';
import Artists from '../components/Artists'


const Artist = ({ match }) => (
  <div>
    
    <Artists uri="http://localhost:3002/users/artists" />
  </div>
);

export default Artist;
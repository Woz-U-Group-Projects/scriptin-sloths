import React from 'react';
import axios from 'axios';

class Artists extends React.Component {
  state = {
    artistData: []
  };

  fetchArtistData = () => {
    var encodedURI = window.encodeURI(this.props.uri);
    return axios.get(encodedURI).then(response => {
      this.setState(() => {
        return {
          artistData: response.data
        };
      });
    });
  };

  componentDidMount() {
    this.fetchArtistData();
  }

  render() {
    console.log(this.state.artistData);
    if (this.state.artistData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    }
    const artists = this.state.artistData.map(artist => (
      <div key={artist.UserId}>
        <em>{artist.Username}</em>: {artist.Email}
      </div>
    ));
    return <div>{artists}</div>;
  }
}

export default Artists;
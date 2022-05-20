import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
state = {
  objeto: '',
}

componentDidMount() {
  this.fetchApi();
}

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    const resposta = await getMusics(id);
    this.setState({ objeto: resposta });
  }

  render() {
    const { objeto } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h4 data-testid="artist-name">{objeto && objeto[0].artistName}</h4>
          <h4 data-testid="album-name">{objeto && objeto[0].collectionName}</h4>
          {objeto && objeto.filter((elemento) => elemento.trackId)
            .map((element, index) => (<MusicCard
              key={ `${element.trackName} ${index}` }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
              trackId={ element.trackId }
              all={ element }
            />))}

        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};
export default Album;

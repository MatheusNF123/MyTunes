import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
state = {
  objeto: '',
  carregando: false,
}

componentDidMount() {
  this.fetchApi();
}

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ carregando: true });
    const resposta = await getMusics(id);
    this.setState({ objeto: resposta, carregando: false });
  }

  render() {
    const { objeto, carregando } = this.state;
    return (
      <>
        <Header />
        {carregando ? <Carregando />

          : (
            <div className="container-infos-player" data-testid="page-album">
              <div className="album-artista">
                <div className="div-imagem">
                  <img
                    src={ objeto && objeto[0].artworkUrl100 }
                    alt={ objeto && objeto[0].artistName }
                  />
                </div>
                <h4
                  className="album-nome"
                  data-testid="album-name"
                >
                  {objeto && objeto[0].collectionName}

                </h4>
                <h4
                  className="album-artista"
                  data-testid="artist-name"
                >
                  {objeto && objeto[0].artistName}

                </h4>
              </div>
              <div className="player-musica">
                {objeto && objeto.filter((elemento) => elemento.trackId)
                  .map((element, index) => (<MusicCard
                    key={ `${element.trackName} ${index}` }
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    trackId={ element.trackId }
                    all={ element }
                  />))}
              </div>

            </div>
          )}
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

import React from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    verificaInput: false,
    carregando: false,
  }

  componentDidMount() {
    this.verificarFav();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.fetchApi);
  }

  fetchApi = async () => {
    const { verificaInput } = this.state;
    const { all, removerFav, tela } = this.props;
    if (verificaInput) {
      this.setState({ carregando: true });
      await addSong(all);
      this.setState({ carregando: false });
    } else {
      this.setState({ carregando: true });
      if (tela === 'favoritos') {
        removerFav(all);
      }
      this.setState({ carregando: false });
      await removeSong(all);
    }
  }

  verificarFav = async () => {
    const { trackId } = this.props;
    const fav = await getFavoriteSongs();
    const verifVaforito = fav.some((elemento) => elemento.trackId === trackId);
    this.setState({ verificaInput: verifVaforito });
  }

  render() {
    const { verificaInput, carregando } = this.state;
    const { trackName, previewUrl, trackId, artworkUrl100 } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt="" />
        <h2 className="nomeMusica-player">{trackName}</h2>
        <div className="play-favorito">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </audio>
          <label className="favorito-input" htmlFor={ trackId }>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="verificaInput"
              id={ trackId }
              checked={ verificaInput }
              onChange={ this.onInputChange }
            />
            <span
              className={ verificaInput
                ? 'material-symbols-outlined favorito'
                : 'material-symbols-outlined favoritoD' }
            >
              star
            </span>
          </label>
        </div>
        <hr />
        {/* { carregando && <Carregando />} */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;

export default MusicCard;

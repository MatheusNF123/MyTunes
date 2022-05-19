import React from 'react';
import propTypes from 'prop-types';
import { addSong /* removeSong */, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
    const { all } = this.props;
    if (verificaInput) {
      this.setState({ carregando: true });
      await addSong(all);
    }
    console.log(fav);
    this.setState({ carregando: false });
  }

  verificarFav = async () => {
    const { trackId } = this.props;
    const fav = await getFavoriteSongs();
    console.log(fav);
    const a = fav.some((elemento) => elemento.trackId === trackId);

    console.log(a);
    this.setState({ verificaInput: a });
  }

  render() {
    const { verificaInput, carregando } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="verificaInput"
            id="fav"
            checked={ verificaInput }
            onChange={ this.onInputChange }
          />
        </label>
        { carregando && <Carregando />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;

export default MusicCard;

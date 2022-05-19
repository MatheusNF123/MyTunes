import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    verificaInput: false,
    carregando: false,
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
    this.setState({ carregando: false });
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
            value={ verificaInput }
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

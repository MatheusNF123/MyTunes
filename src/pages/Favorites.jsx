import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favorito: [],
  }

  componentDidMount() {
    this.chamaFetch();
  }

  chamaFetch = async () => {
    const pegarFav = await getFavoriteSongs();
    this.setState({ favorito: pegarFav });
  }

  removerFav = (music) => {
    const { favorito } = this.state;
    this.setState({ favorito: favorito
      .filter((elemento) => elemento.trackId !== music.trackId) });
  }

  render() {
    const { favorito } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {favorito.length && favorito.map((elemento, index) => (<MusicCard
            key={ `${elemento.trackName}${index}` }
            trackName={ elemento.trackName }
            previewUrl={ elemento.previewUrl }
            trackId={ elemento.trackId }
            all={ elemento }
            tela="favoritos"
            removerFav={ this.removerFav }
          />))}
        </div>
      </>
    );
  }
}
export default Favorites;

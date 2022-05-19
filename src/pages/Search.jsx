import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    nomeB: '',
    desabilitaBotao: true,
    carregando: false,
    listar: false,
    array: undefined,
    nomeDigitado: '',
    loadding: false,

  }

  onInputChange = ({ target }) => {
    this.setState({ nomeB: target.value }, this.atualizarMudança);
  }

  atualizarMudança = () => {
    const numeroMin = 2;
    const { nomeB } = this.state;
    if (nomeB.length >= numeroMin) {
      this.setState({ desabilitaBotao: false });
    } else {
      this.setState({ desabilitaBotao: true });
    }
  }

  // componentDidMount() {
  //   this.colocarNaTela();
  // }

  pesquisar = async () => {
    const { nomeB } = this.state;
    this.setState({ nomeDigitado: nomeB, carregando: true, nomeB: '' });
    const obj = await searchAlbumsAPI(nomeB);
    if (obj.length === 0) {
      this.setState({ carregando: false, array: obj, listar: false, loadding: true });
    } else {
      this.setState({ carregando: false, array: obj, listar: true, loadding: true });
    }
    // this.setState({ carregando: false, array: obj, listar: true });
    // console.log(response);
  }

  colocarNaTela = () => {
    const { array, nomeDigitado, listar } = this.state;
    return (

      listar ? (
        <div>
          <p>
            {`Resultado de álbuns de: ${nomeDigitado}`}
          </p>
          { array.map((elemento) => (
            <div key={ elemento.collectionId }>
              <div>{elemento.artistId}</div>
              <div>{elemento.artistName}</div>
              <div>{elemento.collectionId}</div>
              <div>{elemento.collectionName}</div>
              <div>{elemento.collectionPrice}</div>
              <div>
                <img src={ elemento.artworkUrl100 } alt={ elemento.artistName } />
              </div>
              <div>{elemento.releaseDate}</div>
              <div>{elemento.trackCount}</div>
              <Link
                data-testid={ `link-to-album-${elemento.collectionId}` }
                to={ `/album/${elemento.collectionId}` }
              >
                Album

              </Link>
            </div>))}

        </div>) : (<h4>Nenhum álbum foi encontrado</h4>)

    );
  }

  render() {
    const { desabilitaBotao, nomeB, carregando, loadding } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {carregando
            ? <Carregando />
            : (
              <form action="">
                <label htmlFor="nome">
                  Nome:
                  <input
                    type="text"
                    value={ nomeB }
                    name="nome"
                    id="nome"
                    data-testid="search-artist-input"
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="button"
                  disabled={ desabilitaBotao }
                  data-testid="search-artist-button"
                  onClick={ this.pesquisar }
                >
                  Pesquisar

                </button>
              </form>) }
          {/* {listar ? this.colocarNaTela() : <h4>Nenhum álbum foi encontrado</h4>} */}
          { loadding && this.colocarNaTela() }

        </div>
      </>
    );
  }
}
export default Search;

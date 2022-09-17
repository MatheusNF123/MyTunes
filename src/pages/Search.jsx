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

  pesquisar = async () => {
    const { nomeB } = this.state;
    this.setState({ nomeDigitado: nomeB, carregando: true, nomeB: '' });
    const obj = await searchAlbumsAPI(nomeB);
    if (obj.length === 0) {
      this.setState({ carregando: false, array: obj, listar: false, loadding: true });
    } else {
      this.setState({ carregando: false, array: obj, listar: true, loadding: true });
    }
  }

  colocarNaTela = () => {
    const { array, nomeDigitado, listar } = this.state;
    return (

      listar ? (
        <article className="container container-pesquisa">
          <h4>
            {`Resultado de álbuns de: ${nomeDigitado}`}
          </h4>
          <div className="resultPesquisa">
            { array.map((elemento) => (
              <div className="album" key={ elemento.collectionId }>

                <Link
                  className="links-album"
                  data-testid={ `link-to-album-${elemento.collectionId}` }
                  to={ `/album/${elemento.collectionId}` }
                >

                  <div className="nomeArtista">{elemento.artistName}</div>
                  <div className="div-imagem">
                    <img src={ elemento.artworkUrl100 } alt={ elemento.artistName } />
                  </div>
                  <div className="div-Id">{elemento.artistId}</div>

                  <div className="div-Id">{elemento.collectionId}</div>
                  <div>
                    {elemento.collectionName}
                  </div>
                  <div className="div-Id">
                    {elemento.collectionPrice}
                  </div>

                  <div className="div-Id">{elemento.releaseDate}</div>
                  <div className="numeroDeMusicas">
                    {elemento.trackCount}
                    {' '}
                    musicas
                  </div>
                </Link>
              </div>))}
          </div>
        </article>) : (<h4 className="mensagem">Nenhum álbum foi encontrado</h4>)

    );
  }

  render() {
    const { desabilitaBotao, nomeB, carregando, loadding } = this.state;
    return (
      <>
        <Header />
        <div className="container-search" data-testid="page-search">
          {carregando
            ? <Carregando />
            : (
              <form className="form">
                <div className="login-search">
                  <label htmlFor="nome">
                    <input
                      placeholder="Nome da Musica"
                      className="form-control"
                      type="text"
                      value={ nomeB }
                      name="nome"
                      id="nome"
                      data-testid="search-artist-input"
                      onChange={ this.onInputChange }
                    />
                  </label>
                  <button
                    className="btn btn-primary button-Search"
                    type="button"
                    disabled={ desabilitaBotao }
                    data-testid="search-artist-button"
                    onClick={ this.pesquisar }
                  >
                    Pesquisar

                  </button>
                </div>
              </form>) }

        </div>
        { loadding && this.colocarNaTela() }
      </>
    );
  }
}
export default Search;

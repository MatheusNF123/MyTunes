import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    nomeB: '',
    desabilitaBotao: true,

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

  render() {
    const { desabilitaBotao, nomeB } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
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
              // onClick={ this.salvarNOme }
            >
              Pesquisar

            </button>
          </form>
        </div>
      </>
    );
  }
}
export default Search;

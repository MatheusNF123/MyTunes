import React from 'react';
import { Link } from 'react-router-dom';
// import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nomeUsuario: '',
    /* carregando: false, */
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    // this.setState({ /* carregando: true */ });
    const info = await getUser();
    this.setState({
      nomeUsuario: info.name,
      image: info.image || 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png',
      /* carregando: false */ });
  }

  render() {
    const { nomeUsuario, /* carregando */ image } = this.state;
    return (

      // carregando
      //   ? <Carregando />
      //   : (
      <header className="header" data-testid="header-component">
        <div className="titulo-user">
          <h4 className="h1-login">TrybeTunes</h4>
          <div className="cont-player">
            <span className="material-symbols-outlined font-play">
              fast_rewind
            </span>
            <span className="material-symbols-outlined font-play">
              pause
            </span>
            <span className="material-symbols-outlined font-play">
              fast_forward
            </span>
          </div>
          <div className="infos-User">
            <div className="cont-img-header">
              <img
                className="header-img"
                src={ image || 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png' }
                alt=""
              />
            </div>
            <h4
              className="h1-login username"
              data-testid="header-user-name"
            >
              {nomeUsuario}

            </h4>
          </div>
        </div>
        <nav className="links">

          <Link
            className="link link-pesquisa"
            data-testid="link-to-search"
            to="/search"
          >
            <span className="material-symbols-outlined icon">
              search
            </span>
            <span>Pesquisa</span>

          </Link>

          <Link
            className="link link-favoritos"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <span className="material-symbols-outlined icon favorito">
              star
            </span>
            <span> Favorites</span>

          </Link>

          <Link
            className="link link-profiles"
            data-testid="link-to-profile"
            to="/profile"
          >
            <span className="material-symbols-outlined icon">
              account_circle
            </span>
            <span>Profile</span>

          </Link>

        </nav>
      </header>
    );
    // );
  }
}
export default Header;

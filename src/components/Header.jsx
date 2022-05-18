import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nomeUsuario: '',
    carregando: false,
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    this.setState({ carregando: true });
    const info = await getUser();
    this.setState({ nomeUsuario: info.name, carregando: false });
  }

  render() {
    const { nomeUsuario, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <nav>
          <Link data-testid="link-to-search" to="/search"> Pesquisa </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> favorites </Link>
          <Link data-testid="link-to-profile" to="/profile"> profile </Link>
        </nav>
        {carregando
          ? <Carregando /> : <h1 data-testid="header-user-name">{nomeUsuario}</h1>}
      </header>
    );
  }
}
export default Header;

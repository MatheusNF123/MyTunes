import React from 'react';
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
        {carregando
          ? <Carregando /> : <h1 data-testid="header-user-name">{nomeUsuario}</h1>}
      </header>
    );
  }
}
export default Header;

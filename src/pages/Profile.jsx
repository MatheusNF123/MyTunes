import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    infos: '',
    carregando: false,
  }

  componentDidMount = () => {
    this.chamaApi();
  }

  chamaApi = async () => {
    this.setState({ carregando: true });
    const recuperaInfos = await getUser();
    this.setState({ carregando: false, infos: recuperaInfos });
  }

  descricao = () => {
    const { infos: { name, email, image, description } } = this.state;
    return (
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        <div>
          <img
            data-testid="profile-image"
            src={ image }
            alt={ description }
          />
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }

  render() {
    const { carregando } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {(
            carregando
          ) ? <Carregando />
            : this.descricao()}
        </div>
      </>
    );
  }
}
export default Profile;

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
      <div className="container-profile">
        <div className="profileInfos">
          <span>{`Nome:  ${name}`}</span>
          <hr />
          <span>{`Email: ${email}`}</span>
          <hr />
          <span>{`Descrição: ${description}`}</span>
          <hr />
          <div className="cont-img">
            <img
              data-testid="profile-image"
              src={ image || 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png' }
              alt={ description }
            />
          </div>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
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

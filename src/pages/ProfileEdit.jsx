import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  state = {
    carregando: false,
    name: '',
    email: '',
    description: '',
    image: '',
    desabilita: true,
  }

  async componentDidMount() {
    await this.chamaApi();
    this.verificaInput();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.verificaInput);
  }

  chamaApi = async () => {
    this.setState({ carregando: true });
    const recuperaInfos = await getUser();
    this.setState({ carregando: false, ...recuperaInfos });
  }

  verificaInput = () => {
    const { name, email, description, image } = this.state;
    if (name && email && description && image) {
      this.setState({ desabilita: false });
    } else {
      this.setState({ desabilita: true });
    }
  }

alteracoes = async () => {
  const { history } = this.props;
  const { name, email, description, image } = this.state;
  await updateUser({ name, email, image, description });
  this.setState({ desabilita: true }, history.push('/profile'));
}

render() {
  const { carregando, desabilita,
    name, image, email, description } = this.state;
  return (
    <>
      <Header />
      <div className="container-Edit" data-testid="page-profile-edit">
        {
          carregando ? <Carregando /> : (
            <form className="form-Edit">
              <label htmlFor="rNome">
                Nome:
                <input
                  className="form-control"
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  id="rNome"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="rEmail">
                Email:
                <input
                  className="form-control"
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  id="rEmail"
                  value={ email }
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="desc">
                Descrição:
                <textarea
                  className="form-control"
                  data-testid="edit-input-description"
                  name="description"
                  id="desc"
                  cols="30"
                  rows="4"
                  value={ description }
                  onChange={ this.onInputChange }
                >
                  Descrição

                </textarea>
              </label>

              <label htmlFor="foto">
                insira uma imagem (URL):
                <input
                  className="form-control"
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  id="foto"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>

              <button
                className="btn btn-primary"
                data-testid="edit-button-save"
                type="button"
                disabled={ desabilita }
                onClick={ this.alteracoes }
              >
                Editar perfil

              </button>

            </form>
          )
        }

      </div>
    </>
  );
}
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
export default ProfileEdit;

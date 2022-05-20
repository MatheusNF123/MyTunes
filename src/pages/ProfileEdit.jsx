import React from 'react';
import { Redirect } from 'react-router-dom';
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
    redirecionar: false,
  }

  componentDidMount() {
    this.chamaApi();
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
    this.setState({ carregando: false, ...recuperaInfos }, this.verificaInput);
  }

  verificaInput = () => {
    const { name, email, description, image } = this.state;
    if (name && email && description && image) {
      this.setState({ desabilita: false });
    } else {
      this.setState({ desabilita: true });
    }
  }

alteracoes = () => {
  const { name, email, description, image } = this.state;
  updateUser({ name, email, image, description });
  this.setState({ desabilita: true, redirecionar: true });
}

render() {
  const { carregando, desabilita,
    name, image, email, description, redirecionar } = this.state;
  return (
    <>
      <Header />
      <div data-testid="page-profile-edit">
        {redirecionar && <Redirect to="/profile" />}
        {
          carregando ? <Carregando /> : (
            <form>
              <label htmlFor="rNome">
                Alterar Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  id="rNome"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="rEmail">
                Alterar Email:
                <input
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
                  data-testid="edit-input-description"
                  name="description"
                  id="desc"
                  cols="30"
                  rows="10"
                  value={ description }
                  onChange={ this.onInputChange }
                >
                  Descrição

                </textarea>
              </label>

              <label htmlFor="foto">
                Alterar Imagem:
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  id="foto"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>

              <button
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
export default ProfileEdit;

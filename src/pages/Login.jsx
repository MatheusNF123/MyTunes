import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    nome: '',
    desabilitaBotao: true,
    carregando: false,
    redirect: false,
  }

  onInputChange = ({ target }) => {
    this.setState({ nome: target.value }, this.atualizarMudança);
  }

  atualizarMudança = () => {
    const numeroMin = 3;
    const { nome } = this.state;
    if (nome.length >= numeroMin) {
      this.setState({ desabilitaBotao: false });
    } else {
      this.setState({ desabilitaBotao: true });
    }
  }

   salvarNOme = async () => {
     const { nome } = this.state;
     this.setState({ carregando: true });
     await createUser({ name: nome });
     this.setState({ carregando: false, redirect: true });
   }

   render() {
     const { nome, desabilitaBotao, carregando, redirect } = this.state;
     return (
       <div data-testid="page-login">
         <form action="">
           <label htmlFor="nome">
             Nome:
             <input
               type="text"
               value={ nome }
               name="nome"
               id="nome"
               data-testid="login-name-input"
               onChange={ this.onInputChange }
             />
           </label>
           <button
             type="button"
             disabled={ desabilitaBotao }
             data-testid="login-submit-button"
             onClick={ this.salvarNOme }
           >
             Entrar

           </button>
         </form>
         {carregando && <Carregando /> }
         {redirect && <Redirect to="/search" />}
       </div>
     );
   }
}
export default Login;

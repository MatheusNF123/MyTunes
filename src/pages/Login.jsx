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
     await createUser({ name: nome,
       image: '' });
     this.setState({ carregando: false, redirect: true });
   }

   render() {
     const { nome, desabilitaBotao, carregando, redirect } = this.state;
     return (

       <div className="container1">

         {carregando ? <Carregando />
           : (
             <>
               <h1 className="h1-login">MyTunes </h1>
               <form className="form">
                 <div className="login">
                   <label htmlFor="nome">
                     <input
                       className="form-control"
                       placeholder="Nome"
                       type="text"
                       value={ nome }
                       name="nome"
                       id="nome"
                       data-testid="login-name-input"
                       onChange={ this.onInputChange }
                     />
                   </label>

                 </div>
                 <div className="button">
                   <button
                     type="button"
                     className="btn btn-primary"
                     disabled={ desabilitaBotao }
                     data-testid="login-submit-button"
                     onClick={ this.salvarNOme }
                   >
                     Entrar

                   </button>
                 </div>
               </form>

             </>
           )}
         {/* {carregando && <Carregando /> } */}
         {redirect && <Redirect to="/search" />}
       </div>

     );
   }
}
export default Login;

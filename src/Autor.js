import React from "react";
import $ from "jquery";
import InputCustomizado from "./components/InputCustomizado";
import BotaoSubmitCustomizado from "./components/BotaoSubmitCustomizado";
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioAutor extends React.Component {
  constructor() {
    super();
    this.state = { lista: [], nome: "", email: "", senha: "" };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      contentType: "application/json",
      dataType: "json",
      type: "post",
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      },
      data: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha
      }),
      success: function(novaListagem) {
        PubSub.publish('atualiza-lista-autores', novaListagem);
        this.setState( { nome:'', email:'', senha:'' });
      }.bind(this),
      error: function(resposta) {
        console.log("erro");
        if(resposta.status === 400) {
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      }
    });
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form
          className="pure-form pure-form-aligned"
          onSubmit={this.enviaForm}
          method="post"
        >
          <InputCustomizado
            id="nome"
            type="text"
            name="nome"
            value={this.state.nome}
            onChange={this.setNome}
            label="Nome"
          />
          <InputCustomizado
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.setEmail}
            label="E-mail"
          />
          <InputCustomizado
            id="senha"
            type="password"
            name="senha"
            value={this.state.senha}
            onChange={this.setSenha}
            label="Senha"
          />
          <BotaoSubmitCustomizado label="Gravar" />
        </form>
      </div>
    );
  }
}

class TabelaAutores extends React.Component {
  
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(function(autor){
              return (
                <tr key={autor.id}>
                  <td>{autor.nome}</td>
                  <td>{autor.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default class AutorBox extends React.Component {
  
  constructor() {
    super();
    this.state = {lista : []};
    // this.atualizaListagem = this.atualizaListagem.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: function(resposta) {
        this.setState({ lista: resposta });
      }.bind(this)
    });

    PubSub.subscribe('atualiza-lista-autores', function(topico,novaLista){
      this.setState({lista:novaLista});
    }.bind(this));
    
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutor />
          <TabelaAutores lista={this.state.lista}/>
        </div>
      </div>
    );
  }

}

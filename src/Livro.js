import React from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import BotaoSubmitCustomizado from './components/BotaoSubmitCustomizado';

export class FormularioLivro extends React.Component {

    constructor() {
        super();
        this.state = { lista: [], titulo: "", preco: "", autorId: [] };
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.autorId = this.setAutorId.bind(this);
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento) {
        this.setState({ autorId: evento.target.value });        
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" method="post">
                    <br />
                    <InputCustomizado
                        id="titulo"
                        type="text"
                        name="titulo"
                        value={this.state.titulo}
                        onChange={this.setTitulo}
                        label="Titulo"
                    />
                    <InputCustomizado
                        id="preco"
                        type="text"
                        name="preco"
                        value={this.state.preco}
                        onChange={this.setPreco}
                        label="Preço"
                    />
                    {/* <div class="pure-control-group">
                        <label for="autorId">Titulo</label>
                        <select name="autorId">
                            <option value="1">Autor Alberto</option>
                            <option value=" 2">Autor André</option>
                        </select>
                    </div> */}
                    <BotaoSubmitCustomizado label="Gravar" />
                </form>
            </div>
        );
    }
}

export class Tabelalivros extends React.Component {
    render() {
        return (
            <h1>Tabela de Autores</h1>
        )
    }
}

export default class LivroBox extends React.Component {
    
    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "https://cdc-react.herokuapp.com/api/livros",
            dataType: "json",
            success: function(resposta) {
            //   this.setState({ lista: resposta });
                console.log('Teste: ', resposta);
            }.bind(this)
          });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                    <Tabelalivros />
                </div>
      </div>
        )
    }
    
}
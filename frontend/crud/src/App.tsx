import React, { ChangeEvent, ReactNode }  from 'react'
import axios from 'axios'
import './App.css'
import Edit from './componentes/Edit'
import Delete from './componentes/Delete'

interface Props {

}

export default class App extends React.Component<Props>{
  

  state: {
    dados: object[],
    nome: string,
    categoria: number | string,
    ano: string,
    edit: boolean,
    editNome?: string,
    editCategoria?: string,
    editAno?: number,
    pk?: string
  }
  constructor(props: Props){
    super(props)
    
    this.state = {
      dados: [],
      nome: '',
      categoria: '',
      ano: '',
      edit: false,
      editNome: '',
      editCategoria: '',
      editAno: 0,
      pk: ''
    }
  }

  setDados(e: object[]): void{this.setState({dados: e})}

  setEdit(e: any): void {
    if(e.target.dataset.pk != 'undefined'){
      axios.get('http://localhost:3000')
        .then(res => {
          res.data.map(
            (jogo: {nome?: string, categoria?: string, ano?: number}) => {
              if(e.target.dataset.pk == jogo.nome){
                this.setState({
                  pk: jogo.nome,
                  editNome: jogo.nome,
                  editCategoria: jogo.categoria,
                  editAno: jogo.ano
                })
              }
            }
          )
      })
      this.setState({edit: !this.state.edit})
    }
  }

  setValores(cond: number, e: ChangeEvent<HTMLInputElement>): void {
    if(cond == 1){
      this.setState({nome: e.target.value})
    }
    else if(cond == 2){
      this.setState({categoria: e.target.value})
    }
    else{
      this.setState({ano: e.target.value})
    }
  }

  setEditNome(e: ChangeEvent<HTMLInputElement>): void{
    this.setState({editNome: e.target.value})
  }
  setEditCategoria(e: ChangeEvent<HTMLInputElement>): void{
      this.setState({editCategoria: e.target.value})
  }
  setEditAno(e: ChangeEvent<HTMLInputElement>): void{
      this.setState({editAno: e.target.value})
  }

  apagarStates(): void {
    this.setState({
      nome: '',
      categoria: '',
      ano: ''
    })
  }

  getDados(): void {
    axios.get('http://localhost:3000')
      .then(res => {
        this.setState({dados: res.data})
    })
  }

  componentDidMount(): void {
    this.getDados()
  }

  inserirJogos(): void {
    if(this.state.nome != '' && this.state.categoria != '' && this.state.ano != ''){
      let novosDados: object[] = this.state.dados
      axios.post('http://localhost:3000/cadastro', {
        nome: this.state.nome,
        categoria: this.state.categoria,
        ano: this.state.ano
      })
        .then((res)=>{
          console.log(res)
        })
      novosDados.push({nome: this.state.nome, categoria: this.state.categoria, ano: this.state.ano})
      this.setState({dados: novosDados})
      this.apagarStates()
    }
  }
    
  renderDados(): JSX.Element[]{
    return this.state.dados.map(
      (jogo: {nome?: string, categoria?: string, ano?: number}) => <div className='jogo'>
        <p>
          {jogo.nome}
        </p>
        <p>
          {jogo.categoria}
        </p>
        <p>
          {jogo.ano}
        </p>
        <p>
          <span style={{marginRight: '10px'}} onClick={(e)=>this.setEdit(e)} data-pk={jogo.nome}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="20px" fill='#30db30' data-pk={jogo.nome}>
              <path d="M80 1056V935h800v121H80Zm82-227V696l373-373 133 133-373 373H162Zm60-60h45l315-315-45-45-315 315v45Zm490-357L579 279l84-84q11-13 25-13.5t28 13.5l78 78q13 13 13 27.5T796 328l-84 84ZM222 769Z" data-pk={jogo.nome}/>
            </svg>
          </span>
          <Delete 
            pk={jogo.nome}
            dados={this.state.dados}
            setDados={(e)=>this.setDados(e)}
          />
        </p>
      </div>
    )
  }
    
  render(): ReactNode{
    return(
      <>
        <Edit 
          dados={this.state.dados}
          setDados={(e)=>this.setDados(e)}
          edit={this.state.edit} 
          setEdit={(e)=>this.setEdit(e)}
          pk={this.state.pk}
          editNome={this.state.editNome}
          editCategoria={this.state.editCategoria}
          editAno={this.state.editAno}
          setEditNome={(e)=>this.setEditNome(e)}
          setEditCategoria={(e)=>this.setEditCategoria(e)}
          setEditAno={(e)=>this.setEditAno(e)}
        />
        <main>
          <section className='registro'>
            <div>
              <input 
                type="text" 
                id="nome" 
                autoComplete='off' 
                placeholder='Nome' 
                onChange={(e)=>this.setValores(1, e)}
                value={this.state.nome}
              />
            </div>
            <div>
              <input 
                type="text" 
                id="cat"
                autoComplete='off'
                placeholder='Categoria'
                onChange={(e)=>this.setValores(2, e)}
                value={this.state.categoria}
              />
            </div>
            <div>
              <input 
                type="number" 
                id="ano"
                autoComplete='off' 
                placeholder='Ano'
                onChange={(e)=>this.setValores(3, e)}
                value={this.state.ano}
              />
            </div>
            <div>
              <button onClick={()=>this.inserirJogos()} className='cad'>
                Cadastrar
              </button>
            </div>
          </section>
          <section className='display'>
              <h2>Jogos cadastrados</h2>
              <div className='titulos'>
                <p>Nome</p>
                <p style={{marginLeft: '25px'}}>Categoria</p>
                <p>Ano</p>
              </div>
              <div className='jogos'>
                {this.renderDados()}
              </div>
          </section>
        </main>
      </>
    )
  }
}

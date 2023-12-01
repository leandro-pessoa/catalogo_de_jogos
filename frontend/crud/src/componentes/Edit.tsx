import React, { ChangeEvent } from 'react'
import axios from 'axios'
import '../App.css'


interface Props {
    dados: object[],
    setDados: (e: object[]) => void,
    edit: boolean,
    setEdit: (e: any) => void,
    pk?: string,
    editNome?: string,
    editCategoria?: string,
    editAno?: number | string,
    setEditNome: (e: ChangeEvent<HTMLInputElement>) => void,
    setEditCategoria: (e: ChangeEvent<HTMLInputElement>) => void,
    setEditAno: (e: ChangeEvent<HTMLInputElement>) => void
}

export default class Edit extends React.Component<Props>{
    state: {
        nome?: string,
        categoria?: string,
        ano?: number | string
    }
    constructor(props: Props){
        super(props)
        this.state = {
            
        }
    }

    editar(): void{
        if(this.props.editNome != '' && this.props.editCategoria != '' && this.props.editAno != ''){
            axios.put('http://localhost:3000/editar', {
                pk: this.props.pk,
                nome: this.props.editNome,
                categoria: this.props.editCategoria,
                ano: this.props.editAno
            });
            const dadosNovos: object[] = []
            let index: number = 0
            this.props.dados.map(
                (jogo: {nome?: string}) => {
                    if(jogo.nome != this.props.pk){
                        dadosNovos.push(jogo)
                    }
                    else{
                        index = this.props.dados.indexOf(jogo)
                    }
                }
            )
            dadosNovos.splice(index, 0, {nome: this.props.editNome, categoria: this.props.editCategoria, ano: this.props.editAno})
            this.props.setDados(dadosNovos)
        }
    }

    renderEditBox(): JSX.Element | undefined{
        if(this.props.edit){
            return (
                <div className='editScreen'>  
                    <div className='editBox'>
                        <p>
                            <input 
                                type="text" 
                                placeholder='Nome'
                                value={this.props.editNome}
                                onChange={(e)=>this.props.setEditNome(e)}
                            />
                        </p>
                        <p>
                            <input 
                                type="text" 
                                placeholder='Categoria'
                                value={this.props.editCategoria}
                                onChange={(e)=>this.props.setEditCategoria(e)}
                            />
                        </p>
                        <p>
                            <input 
                                type="number" 
                                placeholder='Ano'
                                value={this.props.editAno}
                                onChange={(e)=>this.props.setEditAno(e)}
                            />
                        </p>
                        <div>
                            <button className='cad' onMouseDown={()=>this.editar()} onClick={(e)=>this.props.setEdit(e)}>
                                Editar
                            </button>
                            <button 
                                className='cad' 
                                style={{background: 'linear-gradient(to right, rgb(255, 54, 54), rgb(252, 111, 111), rgb(255, 174, 174), rgb(255, 198, 198))', margin: '0px 10px'}}
                                onClick={(e)=>this.props.setEdit(e)}
                            >
                                Cancelar
                            </button>
                            
                        </div>
                    </div>
                </div>
            )
        }
    }

    render(): React.ReactNode {
        return(
            <> 
                {this.renderEditBox()}
            </>
        )
    }
}
import React, { ChangeEvent } from 'react'
import axios from 'axios'
import {RiDeleteBin6Line} from 'react-icons/ri'

interface Props {
    pk?: string,
    dados: object[],
    setDados: (e: object[]) => void
}

export default class Delete extends React.Component<Props>{
    constructor(props: Props){
        super(props)
    }

    apagarJogo(e: any): void{
        const dados: object[] = this.props.dados
        let dadosNovos: object[] = []
        dados.map(
            (jogo: {nome?: string}) => {
                if(jogo.nome != this.props.pk){
                    dadosNovos.push(jogo)
                }
            }
        )
        axios.put('http://localhost:3000/delete', {
            pk: this.props.pk
        })
          .then((res)=>{
            console.log(res)
        })  
        this.props.setDados(dadosNovos)
    }

    render(): React.ReactNode {
        return(
            <>
                <span onClick={(e)=>this.apagarJogo(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="20px" fill='#30db30' data-pk={this.props.pk}>
                    <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" data-pk={this.props.pk}/>
                    </svg>
                </span>
            </>
        )
    }
}
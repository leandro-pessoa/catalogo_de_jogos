const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express()
const porta = process.env.PORT || 3000

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'crud'
})

app.use(cors())
app.use(express.json()) 

app.get('/', (req, res)=>{
    const sql = 'select * from jogos'
    db.query(sql, (error, result)=>{
        if(error) console.log(error)
        else res.send(result)
    })
})

app.post('/cadastro', (req, res)=>{
    const { nome } = req.body
    const { categoria } = req.body
    const { ano } = req.body

    const sql = 'insert into jogos (nome, categoria, ano) values (?, ?, ?)'
    const valores = [nome, categoria, ano]
    db.query(sql, valores, (error, result)=>{
        if(error) console.log(error)
        else res.send(result)
    })
})

app.put('/editar', (req, res)=>{
    const { pk } = req.body
    const { nome } = req.body
    const { categoria } = req.body
    const { ano } = req.body

    const sql = 'update jogos set nome=?, categoria=?, ano=? where nome=?'
    const valores = [nome, categoria, ano, pk]
    db.query(sql, valores, (error, result)=>{
        if(error) console.log(error)
        else res.send(result)
    })
})

app.put('/delete', (req, res)=>{
    const { pk } = req.body
    const sql = 'delete from jogos where nome=?'
    db.query(sql, pk)
})

app.listen(porta, ()=>{console.log('Servidor rodando')})



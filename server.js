// IMPORTANDO Modulos
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Port = 8000
const bcrypt = require("bcrypt")

const db = require('./db/db.js')
const User = require('./models/user')

//Adicionar o  css
app.use('/css', express.static('./css'))

//Configs DO SITE 
app.use(bodyParser.urlencoded({ extended: true }))

//REDERIZAR PAGINA DE LOGIN
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/login.html')
})

//PESQUISA USUARIO NO BANCO DE 

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username })
  if (!user) {
    res.status(401).json({ error: 'Usuário não encontrado' })
  } else if (user.password !== password) {
    res.status(401).json({ error: 'Senha incorreta' })
  } else {
    res.redirect('home')
  }
})

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/html/home.html')
})

// Renderiza a pagina de registro de usuário
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/html/register.html')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  // Crie um novo usuário
  const user = new User({ username, password })

  // Salve o usuário no banco de dados
  try {
    const newuser = new User(req.body)
    await newuser.save()
    res.json(newuser)
    // Criptografia de senha
    const salt = bcrypt.genSaltSync(10);
    const password = hashedPassword
    const hashedPassword = bcrypt.hashSync(password, salt);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o usuário' })
  }
})

// Inicia o Servidor
app.listen(Port, () => {
  console.log(`Servidor rodando na porta ${Port}`)
})
const express = require('express');
const app = express();

app.use(express.json());

//npm i
//npm run start

const usuarios = [
  { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
  { id: 2, nome: 'Joao Telles', email: 'joao@email.com' },
  { id: 3, nome: 'Erico Campos', email: 'erico@email.com' }
];

app.get('/', (req, res) => { 
  res.send('Teste para API de usuários');
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }
  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    email
  };
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  usuarios[index] = { id, nome, email };

  res.json(usuarios[index]);
});

app.patch('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const { nome, email } = req.body;

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const usuarioRemovido = usuarios.splice(index, 1);

  res.json({ mensagem: 'Usuário removido com sucesso', usuario: usuarioRemovido[0] });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


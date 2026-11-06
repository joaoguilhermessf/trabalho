const express = require("express");
const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static("public"));

// ---------- Disciplinas ----------
let disciplinas = [
  { id: 1, nome: "Tecnologias de Internet", periodo: 4 },
  { id: 2, nome: "Banco de Dados", periodo: 3 },
];
let proximoId = 3;

app.get("/api/disciplinas", (req, res) => res.json(disciplinas));

app.get("/api/disciplinas/:id", (req, res) => {
  const d = disciplinas.find((x) => x.id === Number(req.params.id));
  if (!d) return res.status(404).json({ erro: "disciplina não encontrada" });
  res.json(d);
});

app.post("/api/disciplinas", (req, res) => {
  const { nome, periodo } = req.body || {};
  if (!nome) return res.status(400).json({ erro: "nome é obrigatório" });
  const nova = { id: proximoId++, nome, periodo };
  disciplinas.push(nova);
  res.status(201).json(nova);
});

app.delete("/api/disciplinas/:id", (req, res) => {
  const i = disciplinas.findIndex((x) => x.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ erro: "disciplina não encontrada" });
  disciplinas.splice(i, 1);
  res.status(204).send(); // 204 não tem corpo: não usar res.json()
});

app.put("/api/disciplinas/:id", (req, res) => {
  const d = disciplinas.find((x) => x.id === Number(req.params.id));
  if (!d) return res.status(404).json({ erro: "disciplina não encontrada" });
  const { nome, ...resto } = req.body || {};
  if (!nome) return res.status(400).json({ erro: "nome é obrigatório" });
  Object.assign(d, resto, { nome, id: d.id }); // o id nunca muda
  res.json(d);
});

// ---------- Perfil ----------
let perfil = { nome: "Seu Nome", curso: "Ciência da Computação", endereco: null }; // troque pelos seus dados

app.get("/api/perfil", (req, res) => res.json(perfil));

app.put("/api/perfil", (req, res) => {
  const { nome, curso, endereco } = req.body || {};
  if (!nome || !curso) {
    return res.status(400).json({ erro: "nome e curso são obrigatórios" });
  }
  perfil = { nome, curso, endereco: endereco || null };
  res.json(perfil);
});

app.listen(PORTA, () => console.log(`Servidor rodando em http://localhost:${PORTA}`));

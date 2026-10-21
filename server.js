const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DB = './notes.json';
const load = () => fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB)) : [];
const save = (d) => fs.writeFileSync(DB, JSON.stringify(d));

app.get('/notes', (req, res) => res.json(load()));
app.post('/notes', (req, res) => {
  const notes = load();
  const note = { id: Date.now().toString(), ...req.body };
  notes.push(note); save(notes); res.json(note);
});
app.delete('/notes/:id', (req, res) => {
  save(load().filter(n => n.id !== req.params.id)); res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => console.log('Скрепка-сервер жив'));
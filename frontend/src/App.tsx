import { useEffect, useState } from "react";
import {
  buscarCadastros,
  cadastrar,
  atualizarCadastro,
  excluirCadastro,
  type Cadastro,
} from "./services/cadastroService";

function App() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCadastros = async () => {
    try {
      const res = await buscarCadastros();
      setCadastros(res.data);
    } catch (error) {
      console.error("Erro ao buscar cadastros:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await atualizarCadastro(editId, form);
        setEditId(null);
      } else {
        await cadastrar(form);
      }
      setForm({ nome: "", email: "", senha: "" });
      fetchCadastros();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  const handleEdit = (cadastro: Cadastro) => {
    setForm({ nome: cadastro.nome, email: cadastro.email, senha: cadastro.senha });
    setEditId(cadastro.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await excluirCadastro(id);
      fetchCadastros();
    } catch (error) {
      console.error("Erro ao deletar cadastro:", error);
    }
  };

  useEffect(() => {
    fetchCadastros();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <hr />

      <h2>Lista</h2>
      <ul>
        {cadastros.map((c) => (
          <li key={c.id}>
            {c.nome} - {c.email}{" "}
            <button onClick={() => handleEdit(c)}>Editar</button>
            <button onClick={() => handleDelete(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

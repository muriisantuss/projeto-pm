import { api } from "../api";

export type Cadastro = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

export const buscarCadastros = () => api.get<Cadastro[]>("/cadastros");

export const cadastrar = (dados: Omit<Cadastro, "id">) =>
  api.post("/cadastrar", dados);

export const atualizarCadastro = (id: number, dados: Omit<Cadastro, "id">) =>
  api.put(`/cadastros/${id}`, dados);

export const excluirCadastro = (id: number) =>
  api.delete(`/cadastros/${id}`);

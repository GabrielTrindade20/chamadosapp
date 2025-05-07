import { useEffect, useState } from "react";
import api from "../services/api";

const ChamadoForm = ({ onChamadoCriado, chamadoEditando, onAtualizarChamado }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (chamadoEditando) {
      setTitulo(chamadoEditando.titulo);
      setDescricao(chamadoEditando.descricao);
    }
  }, [chamadoEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (chamadoEditando) {
        const response = await api.put(`/chamados/${chamadoEditando.id}`, {
          ...chamadoEditando,
          titulo,
          descricao,
        });
        onAtualizarChamado(response.data);
      } else {
        const response = await api.post("/chamados", {
          titulo,
          descricao,
          status: "ABERTO"
        });
        onChamadoCriado(response.data);
      }

      setTitulo("");
      setDescricao("");
    } catch (error) {
      console.error("Erro ao salvar chamado:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{chamadoEditando ? "Editar Chamado" : "Criar Novo Chamado"}</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <button type="submit">
        {chamadoEditando ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default ChamadoForm;

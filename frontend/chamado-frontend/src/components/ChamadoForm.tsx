import { useEffect, useState, FormEvent } from "react";
import api from "../services/Api";
import { Chamado } from "../types";

interface ChamadoFormProps {
  onChamadoCriado: (chamado: Chamado) => void;
  chamadoEditando: Chamado | null;
  onAtualizarChamado: (chamado: Chamado) => void;
}

const ChamadoForm = ({
  onChamadoCriado,
  chamadoEditando,
  onAtualizarChamado,
}: ChamadoFormProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (chamadoEditando) {
      setTitulo(chamadoEditando.titulo);
      setDescricao(chamadoEditando.descricao);
    }
  }, [chamadoEditando]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (chamadoEditando) {
        const response = await api.put(`/api/chamados/${chamadoEditando.id}`, {
          ...chamadoEditando,
          titulo,
          descricao,
        });
        onAtualizarChamado(response.data);
      } else {
        const response = await api.post("/api/chamados", {
          titulo,
          descricao,
          status: "ABERTO",
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

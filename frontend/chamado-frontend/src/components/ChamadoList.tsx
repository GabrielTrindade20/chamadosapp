import { useEffect, useState } from "react";
import api from "../services/Api";
import ChamadoForm from "../components/ChamadoForm";
import { Chamado } from "../types";

const ChamadoList = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [chamadoEditando, setChamadoEditando] = useState<Chamado | null>(null);

  const carregarChamados = async () => {
    try {
      const response = await api.get("/api/chamados");
      setChamados(response.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  };

  const excluirChamado = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este chamado?")) return;

    try {
      await api.delete(`/api/chamados/${id}`);
      setChamados(chamados.filter((chamado) => chamado.id !== id));
    } catch (error) {
      console.error("Erro ao excluir chamado:", error);
    }
  };

  const adicionarChamado = (novoChamado: Chamado) => {
    setChamados([...chamados, novoChamado]);
  };

  const atualizarChamado = (chamadoAtualizado: Chamado) => {
    setChamados(
      chamados.map((c) => (c.id === chamadoAtualizado.id ? chamadoAtualizado : c))
    );
    setChamadoEditando(null); // limpa o formulário
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  return (
    <div>
      <ChamadoForm
        onChamadoCriado={adicionarChamado}
        chamadoEditando={chamadoEditando}
        onAtualizarChamado={atualizarChamado}
      />

      <h2>Lista de Chamados</h2>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado.id}>
            <strong>{chamado.titulo}</strong> - {chamado.status}
            <p>{chamado.descricao}</p>
            <small>
              Criado em: {new Date(chamado.dataCriacao).toLocaleString()}
            </small>
            <div style={{ marginTop: "0.5rem" }}>
              <button
                onClick={() => excluirChamado(chamado.id)}
                style={{ marginRight: "0.5rem" }}
              >
                Excluir
              </button>
              <button onClick={() => setChamadoEditando(chamado)}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChamadoList;

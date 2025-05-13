import React from "react";
import ChamadoForm from "../components/ChamadoForm";
import ChamadoList from "../components/ChamadoList";
import "../App.css";

// Componente tipado
const Home: React.FC = () => {
  return (
    <div>
      <h1>Sistema de Chamados</h1>
      <ChamadoList />
    </div>
  );
};

export default Home;

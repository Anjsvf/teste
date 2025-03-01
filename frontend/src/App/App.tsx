import React, { useEffect, useState } from "react";
import api from "../Services/api";
import SearchInput from "../components/SearchInput/SearchInput";
import Table from "../components/Table/Table";
import thub from "../assets/Thumbnail logo.png";
import "./App.css";

interface Colaborador {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

const App: React.FC = () => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchColaboradores = async () => {
      const response = await api.get("/employees");
      setColaboradores(response.data);
    };

    fetchColaboradores();
  }, []);

  const filteredColaboradores = colaboradores.filter(
    (colaborador) =>
      colaborador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.phone.includes(searchTerm)
  );

  return (
    <div className="container">
      <header className="">
        <img className="thub" src={thub} alt="" />
      </header>

      <div className="header-container">
        <h1>Funcionários</h1>
        <SearchInput onSearch={setSearchTerm} />
      </div>

      <Table colaboradores={filteredColaboradores} />
    </div>
  );
};

export default App;

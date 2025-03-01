import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './Table.css';

interface Colaborador {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

interface TableProps {
  colaboradores: Colaborador[];
}

const Table: React.FC<TableProps> = ({ colaboradores }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prevRows) =>
      prevRows.includes(id) ? prevRows.filter((rowId) => rowId !== id) : [...prevRows, id]
    );
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, ''); 
    if (cleaned.length === 13) {
      return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
    }
    return phone; 
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="table-header">
            <th>FOTO</th>
            <th>NOME</th>
            <th>CARGO</th>
            <th>DATA DE ADMISSÃO</th>
            <th>TELEFONE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colaborador) => (
            <React.Fragment key={colaborador.id}>
              <tr>
                <td>
                  <img src={colaborador.image} alt={colaborador.name}/>
                </td>
                <td className="">{colaborador.name}</td>
                <td>{colaborador.job}</td>
                <td>{formatDate(colaborador.admission_date)}</td>
                <td>{formatPhoneNumber(colaborador.phone)}</td>
                <td className="">
                  <FaChevronDown
                    className={`arrow-icon ${expandedRows.includes(colaborador.id) ? 'rotate-180' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(colaborador.id);
                    }}
                  />
                </td>
              </tr>

              {expandedRows.includes(colaborador.id) && (
                <tr>
                  <td colSpan={6}>
                    <div>
                      <p>
                        <strong>Cargo</strong> {colaborador.job}
                      </p>
                      <p>
                       
                        <strong>Data de Admissão</strong> {formatDate(colaborador.admission_date)}
                      </p>
                      <p>
                        <strong>Telefone</strong> {formatPhoneNumber(colaborador.phone)}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
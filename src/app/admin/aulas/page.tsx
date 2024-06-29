"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';

interface Aula {
  id: number;
  profesorId: number;
  nombre: string;
}

interface Profesor {
    id: number;
    usuarioId: number;
    codigo: string;
    grado: string;
    area: string;
    usuario: {
      id: number;
      cedula: string;
      firstName: string;
      lastName: string;
      telefono: string;
      correo: string;
      rolId: number;
      birthdate: string;
      gender: string;
      address: string;
      password: string;
    };
  }

const AulaPage: React.FC = () => {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [filteredAulas, setFilteredAulas] = useState<Aula[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfesorId, setSelectedProfesorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAulas = await fetch("/api/aulas");
        const responseProfesores = await fetch(`/api/profesores?id_aula=0`);

        if (!responseAulas.ok || !responseProfesores.ok) {
          throw new Error("Network response was not ok");
        }

        const aulasData = await responseAulas.json();
        const profesoresData = await responseProfesores.json();

        console.log('Profesores Data:', profesoresData); // Verifica los datos aquí

        setAulas(aulasData);
        setFilteredAulas(aulasData);
        setProfesores(profesoresData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const initialAula = {
    id: 0,
    profesorId: 1,
    nombre: ""
  };

  const [aula, setAula] = useState<Aula>(initialAula);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAula({ ...aula, [name]: value });
  };

  const handleCreate = () => {
    console.log('Crear Aula:', aula);
    setAula(initialAula);
  };

  const handleUpdate = () => {
    if (aula.id) {
      console.log('Actualizar Aula:', aula);
      setAula(initialAula);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (aula.id) {
      console.log('Eliminar Aula con ID:', aula.id);
      setAula(initialAula);
      setIsEditing(false);
    }
  };

  const handleEdit = (aulaData: Aula) => {
    setAula(aulaData);
    setIsEditing(true);
    setSelectedProfesorId(aulaData.profesorId);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredAulas(
      aulas.filter(aula =>
        aula.nombre.toLowerCase().includes(value)
      )
    );
  };

  const handleCancelEdit = () => {
    setAula(initialAula);
    setIsEditing(false);
    setSelectedProfesorId(null);
  };

  const handleProfesorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfesorId(Number(e.target.value));
    setAula({ ...aula, profesorId: Number(e.target.value) });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Aulas</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-blue-600">Nombre del Aula</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Aula"
            value={aula.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Profesor</label>
          <select
            name="profesorId"
            value={selectedProfesorId || ''}
            onChange={handleProfesorChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          >
            <option value="" disabled>Seleccione un profesor</option>
            {profesores.map(profesor => (
              <option key={profesor.id} value={profesor.id}>
                {profesor.usuario.firstName} {profesor.usuario.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="w-full px-4 py-2 bg-orange-500 text-white font-bold rounded mt-2 hover:bg-orange-600"
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded mt-2 hover:bg-red-600"
              >
                Eliminar
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full px-4 py-2 bg-gray-500 text-white font-bold rounded mt-2 hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCreate}
              className="w-full px-4 py-2 bg-orange-500 text-white font-bold rounded mt-2 hover:bg-orange-600"
            >
              Crear
            </button>
          )}
        </div>
      </form>
      <div className="mt-6">
        <h3 className="text-xl text-blue-600 font-bold mb-2">Lista de Aulas</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar aula..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAulas.map((aula) => (
            <li
              onClick={() => handleEdit(aula)}
              className="cursor-pointer bg-white shadow-md p-4 rounded-lg hover:bg-blue-50 transition duration-200"
              key={aula.id}
            >
              <h4 className="text-lg font-bold text-gray-800">{aula.nombre}</h4>
              <p className="text-gray-600">Profesor ID: {aula.profesorId}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AulaPage;

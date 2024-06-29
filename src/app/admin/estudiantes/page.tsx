"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { UserEstudiante } from '@/src/types/types';

const EstudiantePage: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<UserEstudiante[]>([]);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState<UserEstudiante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/usuarios/estudiante");
      try {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEstudiantes(data);
        setFilteredEstudiantes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const test = {
    cedula: '',
    firstName: '',
    lastName: '',
    telefono: '',
    correo: '',
    rolId: 0,
    birthdate: '',
    gender: '',
    address: '',
    password: '',
    id: 0,
    rol: {
      descripcion: '',
      id: 3,
      nombre: 'estudiante',
    },
    estudiante: {
      id: 0,
      id_user: 0,
      id_represent: 0,
      id_aula: 0,
      id_professor: 0,
      grade: 0,
    },
  };

  const [estudiante, setEstudiante] = useState<UserEstudiante>(test);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEstudiante({ ...estudiante, [name]: value });
  };

  const handleCreate = () => {
    console.log('Crear Estudiante:', estudiante);
    setEstudiante(test);
  };

  const handleUpdate = () => {
    if (estudiante.id) {
      console.log('Actualizar Estudiante:', estudiante);
      setEstudiante(test);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (estudiante.id) {
      console.log('Eliminar Estudiante con ID:', estudiante.id);
      setEstudiante(test);
      setIsEditing(false);
    }
  };

  const handleEdit = (estudianteData: UserEstudiante) => {
    setEstudiante(estudianteData);
    setIsEditing(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredEstudiantes(
      estudiantes.filter(est =>
        est.firstName.toLowerCase().includes(value) ||
        est.lastName.toLowerCase().includes(value)
      )
    );
  };

  const handleCancelEdit = () => {
    setEstudiante(test);
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Estudiantes</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-blue-600">Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={estudiante.cedula}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Nombre</label>
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={estudiante.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Apellido</label>
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={estudiante.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Teléfono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={estudiante.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Correo</label>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={estudiante.correo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Fecha de Nacimiento</label>
          <input
            type="date"
            name="birthdate"
            placeholder="Fecha de Nacimiento"
            value={estudiante.birthdate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Género</label>
          <input
            type="text"
            name="gender"
            placeholder="Género"
            value={estudiante.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Dirección</label>
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={estudiante.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={estudiante.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">ID Representante</label>
          <input
            type="number"
            name="representanteId"
            placeholder="ID Representante"
            value={estudiante.estudiante.id_represent}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `estudiante.${e.target.name}` } })}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
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
        <h3 className="text-xl text-blue-600 font-bold mb-2">Lista de Estudiantes</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar estudiante..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEstudiantes.map((est) => (
            <li
              onClick={() => handleEdit(est)}
              className="cursor-pointer bg-white shadow-md p-4 rounded-lg hover:bg-blue-50 transition duration-200"
              key={est.cedula}
            >
              <h4 className="text-lg font-bold text-gray-800">
                {est.firstName.toUpperCase()} {est.lastName.toUpperCase()}
              </h4>
              <p className="text-gray-600">ID Representante:</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EstudiantePage;

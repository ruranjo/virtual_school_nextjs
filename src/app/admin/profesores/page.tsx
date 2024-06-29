"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { UserProfesor } from '@/src/types/types';

const ProfesoresPage: React.FC = () => {
  const [profesores, setProfesores] = useState<UserProfesor[]>([]);
  const [filteredProfesores, setFilteredProfesores] = useState<UserProfesor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/usuarios/profesor");
      try {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfesores(data);
        setFilteredProfesores(data);
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
      id: 1,
      nombre: '',
    },
    profesor: {
      usuarioId: 1,
      codigo: '',
      grado: '',
      area: '',
    },
  };

  const [profesor, setProfesor] = useState<UserProfesor>(test);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesor({ ...profesor, [name]: value });
  };

  const handleCreate = () => {
    console.log('Crear Profesor:', profesor);
    setProfesor(test);
  };

  const handleUpdate = () => {
    if (profesor.id) {
      console.log('Actualizar Profesor:', profesor);
      setProfesor(test);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (profesor.id) {
      console.log('Eliminar Profesor con ID:', profesor.id);
      setProfesor(test);
      setIsEditing(false);
    }
  };

  const handleEdit = (profesorData: UserProfesor) => {
    setProfesor(profesorData);
    setIsEditing(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProfesores(
      profesores.filter(prof =>
        prof.firstName.toLowerCase().includes(value) ||
        prof.lastName.toLowerCase().includes(value) ||
        prof.profesor.area.toLowerCase().includes(value)
      )
    );
  };

  const handleCancelEdit = () => {
    setProfesor(test);
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Profesores</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-blue-600">Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={profesor.cedula}
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
            value={profesor.firstName}
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
            value={profesor.lastName}
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
            value={profesor.telefono}
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
            value={profesor.correo}
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
            value={profesor.birthdate}
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
            value={profesor.gender}
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
            value={profesor.address}
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
            value={profesor.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Código</label>
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={profesor.profesor.codigo}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `profesor.${e.target.name}` } })}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Grado</label>
          <input
            type="text"
            name="grado"
            placeholder="Grado"
            value={profesor.profesor.grado}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `profesor.${e.target.name}` } })}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Área</label>
          <input
            type="text"
            name="area"
            placeholder="Área"
            value={profesor.profesor.area}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `profesor.${e.target.name}` } })}
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
        <h3 className="text-xl text-blue-600 font-bold mb-2">Lista de Profesores</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar profesor..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProfesores.map((prof) => (
            <li
              onClick={() => handleEdit(prof)}
              className="cursor-pointer bg-white shadow-md p-4 rounded-lg hover:bg-blue-50 transition duration-200"
              key={prof.cedula}
            >
              <h4 className="text-lg font-bold text-gray-800">
                {prof.firstName.toUpperCase()} {prof.lastName.toUpperCase()}
              </h4>
              <p className="text-gray-600">{prof.profesor.area}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfesoresPage;

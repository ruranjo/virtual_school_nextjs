"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { UserRepresentante } from '@/src/types/types';

const RepresentantePage: React.FC = () => {
  const [representantes, setRepresentantes] = useState<UserRepresentante[]>([]);
  const [filteredRepresentantes, setFilteredRepresentantes] = useState<UserRepresentante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/usuarios/representante");
      try {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRepresentantes(data);
        setFilteredRepresentantes(data);
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
    representante: {
      id: 0, // Asegúrate de incluir esta propiedad
      usuarioId: 1,
      direccion: '',
      ocupacion: '',
      estadoCivil: '',
      edad: 0,
    },
  };

  const [representante, setRepresentante] = useState<UserRepresentante>(test);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRepresentante({ ...representante, [name]: value });
  };

  const handleCreate = () => {
    console.log('Crear Representante:', representante);
    setRepresentante(test);
  };

  const handleUpdate = () => {
    if (representante.id) {
      console.log('Actualizar Representante:', representante);
      setRepresentante(test);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (representante.id) {
      console.log('Eliminar Representante con ID:', representante.id);
      setRepresentante(test);
      setIsEditing(false);
    }
  };

  const handleEdit = (representanteData: UserRepresentante) => {
    setRepresentante(representanteData);
    setIsEditing(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredRepresentantes(
      representantes.filter(rep =>
        rep.firstName.toLowerCase().includes(value) ||
        rep.lastName.toLowerCase().includes(value) ||
        rep.representante.ocupacion.toLowerCase().includes(value)
      )
    );
  };

  const handleCancelEdit = () => {
    setRepresentante(test);
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Representantes</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-blue-600">Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={representante.cedula}
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
            value={representante.firstName}
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
            value={representante.lastName}
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
            value={representante.telefono}
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
            value={representante.correo}
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
            value={representante.birthdate}
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
            value={representante.gender}
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
            value={representante.address}
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
            value={representante.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600">Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            placeholder="Ocupación"
            value={representante.representante.ocupacion}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `representante.${e.target.name}` } })}
            className="w-full px-4 py-2 border border-blue-300 rounded"
            />
          </div>
          <div>
            <label className="block text-blue-600">Dirección de Residencia</label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección de Residencia"
              value={representante.representante.direccion}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `representante.${e.target.name}` } })}
              className="w-full px-4 py-2 border border-blue-300 rounded"
            />
          </div>
          <div>
            <label className="block text-blue-600">Estado Civil</label>
            <input
              type="text"
              name="estadoCivil"
              placeholder="Estado Civil"
              value={representante.representante.estadoCivil}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `representante.${e.target.name}` } })}
              className="w-full px-4 py-2 border border-blue-300 rounded"
            />
          </div>
          <div>
            <label className="block text-blue-600">Edad</label>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={representante.representante.edad.toString()}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `representante.${e.target.name}` } })}
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
          <h3 className="text-xl text-blue-600 font-bold mb-2">Lista de Representantes</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar representante..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-blue-300 rounded"
            />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepresentantes.map((rep) => (
              <li
                onClick={() => handleEdit(rep)}
                className="cursor-pointer bg-white shadow-md p-4 rounded-lg hover:bg-blue-50 transition duration-200"
                key={rep.cedula}
              >
                <h4 className="text-lg font-bold text-gray-800">
                  {rep.firstName.toUpperCase()} {rep.lastName.toUpperCase()}
                </h4>
                <p className="text-gray-600">{rep.representante.ocupacion}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default RepresentantePage;
  

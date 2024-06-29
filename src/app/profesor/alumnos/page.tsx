"use client";
import React, { useState } from 'react';
import useUserStore from '@/src/store/store';
import { Estudiante, Usuario } from '@/src/types/profesor.type';

const Page = () => {
  // Obtener el profesor del store
  const { profesor } = useUserStore();

  // Estado local para almacenar el estudiante seleccionado y el estado de carga
  const [selectedStudent, setSelectedStudent] = useState<Estudiante | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Verificar si el profesor no está definido
  if (!profesor) {
    return <div className="bg-white p-6 rounded-lg shadow-md">No se encontró el profesor</div>;
  }

  // Obtener la lista de alumnos del profesor
  const estudiantes: Estudiante[] = profesor.aulas.reduce(
    (acc: Estudiante[], aula) => acc.concat(aula.estudiantes),
    []
  );

  // Función para manejar el clic en un estudiante
  const handleStudentClick = (estudiante: Estudiante) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedStudent(estudiante);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md m-2">
      <h1 className="text-2xl text-gray-800 font-bold mb-4">
        Alumnos del Profesor {profesor.usuario.firstName} {profesor.usuario.lastName}
      </h1>
      <ul className="divide-y divide-gray-200">
        {estudiantes.map((estudiante, index) => (
          <li
            key={estudiante.id}
            className={`p-4 rounded-md m-1 cursor-pointer ${
              index % 2 === 0 ? 'bg-blue-400' : 'bg-orange-400'
            }`} // Aplica un fondo azul claro o naranja claro según el índice
            onClick={() => handleStudentClick(estudiante)} // Manejar el clic en el estudiante
          >
            <p className="text-lg font-semibold text-gray-900">
              {estudiante.usuario.firstName} {estudiante.usuario.lastName}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {estudiante.usuario.birthdate}
            </p>
          </li>
        ))}
      </ul>
      {/* Sección para mostrar los detalles del estudiante seleccionado */}
      {loading ? (
        <div className="mt-4 bg-blue-200 p-4 rounded-lg shadow-inner text-center">
          <p className="text-lg text-gray-800 font-semibold">
            Cargando...
          </p>
        </div>
      ) : selectedStudent ? (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Detalles del estudiante seleccionado:
          </h2>
          <p><strong>Nombre:</strong> {selectedStudent.usuario.firstName} {selectedStudent.usuario.lastName}</p>
          <p><strong>Cédula:</strong> {selectedStudent.usuario.cedula}</p>
          <p><strong>Teléfono:</strong> {selectedStudent.usuario.telefono}</p>
          <p><strong>Correo:</strong> {selectedStudent.usuario.correo}</p>
          <p><strong>Fecha de nacimiento:</strong> {selectedStudent.usuario.birthdate}</p>
          <p><strong>Género:</strong> {selectedStudent.usuario.gender}</p>
          <p><strong>Dirección:</strong> {selectedStudent.usuario.address}</p>
        </div>
      ) : (
        <div className="mt-4 bg-blue-200 p-4 rounded-lg shadow-inner text-center">
          <p className="text-lg text-gray-800 font-semibold">
            Seleccione un estudiante para ver los datos
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;


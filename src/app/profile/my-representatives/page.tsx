"use client";
import React, { useEffect, useState } from 'react';
import useUserStore from '@/src/store/store';
import { User } from '@/src/types/types';
import { RepresentadoData } from '@/src/types/representante.type';



interface RepresentanteData {
  id: number;
  usuarioId: number;
  direccion: string;
  ocupacion: string;
  estadoCivil: string;
  edad: number;
  usuario: User;
}

const Page = () => {
  const { user } = useUserStore();
  const [representadoData, setRepresentadoData] = useState<RepresentadoData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idRepresentante, setIdRepresentante] = useState<number | null>(null);

  // Primero, obtener el id del representante basado en el usuario actual
  useEffect(() => {
    const fetchRepresentanteId = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/representantes`);
        if (!response.ok) {
          throw new Error('Error al obtener datos de los representantes');
        }
        
        const data: RepresentanteData[] = await response.json();
        console.log("Fetched data:", data);  // Log para ver los datos obtenidos
        const representante = data.find(rep => rep.usuarioId === user.id);
        setIdRepresentante(representante?.id || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepresentanteId();
  }, [user]);

  // Luego, obtener los datos del representado usando el id del representante
  useEffect(() => {
    const fetchRepresentadoData = async () => {
      if (!idRepresentante) return;
      
      try {
        const response = await fetch(`/api/representantes?id_representanteall=${idRepresentante}`);
        if (!response.ok) {
          throw new Error('Error al obtener datos del representado');
        }
        
        const data: RepresentadoData[] = await response.json();
        console.log("Fetched data:", data);  // Log para ver los datos obtenidos
        setRepresentadoData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepresentadoData();
  }, [idRepresentante]);

  useEffect(() => {
    if (representadoData) {
      console.log("representadoData:", representadoData);  // Log para ver representadoData completo
    }
  }, [representadoData]);

  if (loading) {
    return <p>Cargando datos del representado...</p>;
  }

  return (
    <div className="p-4 bg-blue-50">
      {representadoData && representadoData.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Detalles de los Representados:</h2>
          {representadoData.map((representado) => (
            <div key={representado.estudiante.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Estudiante:</h3>
              <p><span className="font-bold text-blue-600">ID:</span> {representado.estudiante.id}</p>
              <h4 className="text-lg font-semibold text-orange-400 mt-2 mb-1">Usuario:</h4>
              <p><span className="font-bold text-blue-600">ID:</span> {representado.estudiante.usuario.id}</p>
              <p><span className="font-bold text-blue-600">Cédula:</span> {representado.estudiante.usuario.cedula}</p>
              <p><span className="font-bold text-blue-600">Nombre:</span> {representado.estudiante.usuario.firstName}</p>
              <p><span className="font-bold text-blue-600">Apellido:</span> {representado.estudiante.usuario.lastName}</p>
              <p><span className="font-bold text-blue-600">Teléfono:</span> {representado.estudiante.usuario.telefono}</p>
              <p><span className="font-bold text-blue-600">Correo:</span> {representado.estudiante.usuario.correo}</p>
              <p><span className="font-bold text-blue-600">Rol ID:</span> {representado.estudiante.usuario.rolId}</p>
              <p><span className="font-bold text-blue-600">Fecha de nacimiento:</span> {new Date(representado.estudiante.usuario.birthdate).toLocaleDateString()}</p>
              <p><span className="font-bold text-blue-600">Género:</span> {representado.estudiante.usuario.gender}</p>
              <p><span className="font-bold text-blue-600">Dirección:</span> {representado.estudiante.usuario.address}</p>
              
              <h4 className="text-lg font-semibold text-orange-400 mt-4 mb-1">Aulas:</h4>
              {representado.estudiante.aulas.map((aula) => (
                <div key={aula.aula.id} className="mb-4 p-3 bg-blue-100 rounded-lg">
                  <h5 className="text-md font-semibold text-orange-300">Aula:</h5>
                  <p><span className="font-bold text-blue-600">ID:</span> {aula.aula.id}</p>
                  <p><span className="font-bold text-blue-600">Nombre:</span> {aula.aula.nombre}</p>
  
                  <h6 className="text-md font-semibold text-orange-300 mt-2">Profesor:</h6>
                  <p><span className="font-bold text-blue-600">ID:</span> {aula.aula.profesor.id}</p>
                  <p><span className="font-bold text-blue-600">Cédula:</span> {aula.aula.profesor.cedula}</p>
                  <p><span className="font-bold text-blue-600">Nombre:</span> {aula.aula.profesor.firstName}</p>
                  <p><span className="font-bold text-blue-600">Apellido:</span> {aula.aula.profesor.lastName}</p>
                  <p><span className="font-bold text-blue-600">Teléfono:</span> {aula.aula.profesor.telefono}</p>
                  <p><span className="font-bold text-blue-600">Correo:</span> {aula.aula.profesor.correo}</p>
                  <p><span className="font-bold text-blue-600">Rol ID:</span> {aula.aula.profesor.rolId}</p>
                  <p><span className="font-bold text-blue-600">Fecha de nacimiento:</span> {new Date(aula.aula.profesor.birthdate).toLocaleDateString()}</p>
                  <p><span className="font-bold text-blue-600">Género:</span> {aula.aula.profesor.gender}</p>
                  <p><span className="font-bold text-blue-600">Dirección:</span> {aula.aula.profesor.address}</p>
  
                  <h6 className="text-md font-semibold text-orange-300 mt-2">Actividades:</h6>
                  {aula.aula.actividades.map((actividad) => (
                    <div key={actividad.actividad.id} className="mb-2 p-2 bg-orange-100 rounded">
                      <h6 className="text-md font-semibold text-blue-500">Actividad:</h6>
                      <p><span className="font-bold text-blue-600">ID:</span> {actividad.actividad.id}</p>
                      <p><span className="font-bold text-blue-600">Nombre:</span> {actividad.actividad.name}</p>
                      <p><span className="font-bold text-blue-600">Fecha de inicio:</span> {new Date(actividad.actividad.fechaInicio).toLocaleDateString()}</p>
                      <p><span className="font-bold text-blue-600">Fecha final:</span> {new Date(actividad.actividad.fechaFinal).toLocaleDateString()}</p>
                      <p><span className="font-bold text-blue-600">Comentario:</span> {actividad.actividad.comentario}</p>
                      <p><span className="font-bold text-blue-600">Entregado:</span> {actividad.actividad.entregado ? "Sí" : "No"}</p>
  
                      <h6 className="text-md font-semibold text-blue-500 mt-2">Notas:</h6>
                      {actividad.actividad.notas.map((nota) => (
                        <div key={nota.nota.id} className="mb-1">
                          <p><span className="font-bold text-blue-600">ID:</span> {nota.nota.id}</p>
                          <p><span className="font-bold text-blue-600">Ponderación:</span> {nota.nota.ponderacion}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">No se encontraron datos del representado.</p>
      )}
    </div>
  );
  
};

export default Page;

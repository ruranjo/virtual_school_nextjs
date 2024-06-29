"use client"
import useUserStore from '@/src/store/store';
import { Nota } from '@/src/types/nota.type';
import React, { useState } from 'react';

const PageTareaNotas: React.FC = () => {
  const { profesor } = useUserStore();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [selectedActividad, setSelectedActividad] = useState<number | null>(null);
  const [ponderaciones, setPonderaciones] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cargarNotas = async (actividadId: number) => {
    setIsLoading(true);
    setSelectedActividad(actividadId);
    setTimeout(async () => {
      try {
        const response = await fetch(`/api/notas?actividadId=${actividadId}`);
        if (response.ok) {
          const data = await response.json();
          setNotas(data);

          // Inicializa las ponderaciones para cada nota
          const initialPonderaciones: { [key: number]: number } = {};
          data.forEach((nota: Nota) => {
            initialPonderaciones[nota.id] = nota.ponderacion;
          });
          setPonderaciones(initialPonderaciones);
        } else {
          console.error('Error al cargar las notas:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Espera 1 segundo antes de mostrar las notas
  };

  const handlePonderacionChange = (notaId: number, nuevaPonderacion: number) => {
    setPonderaciones({ ...ponderaciones, [notaId]: nuevaPonderacion });
  };

  const aplicarCambio = async (notaId: number) => {
    try {
      const nuevaPonderacion = ponderaciones[notaId];
      const response = await fetch(`/api/notas/${notaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ponderacion: nuevaPonderacion }),
      });
      if (response.ok) {
        const updatedNota = await response.json();
        const updatedNotas = notas.map(nota => (nota.id === updatedNota.id ? updatedNota : nota));
        setNotas(updatedNotas);
      } else {
        console.error('Error al actualizar la nota:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Actividades</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profesor?.aulas[0].actividades.map((act) => (
          <div
            key={act.id}
            className={`bg-orange-100 border-l-4 border-blue-500 text-orange-700 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 
                        ${selectedActividad === act.id ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => cargarNotas(act.id)}
          >
            <p className="font-bold text-lg">{act.name}</p>
            <p className="text-sm mt-2"><span className="font-semibold">Comentario:</span> {act.comentario || "No hay comentario"}</p>
            <p className="mt-2 text-sm"><span className="font-semibold">Fecha de Inicio:</span> {new Date(act.fechaInicio).toLocaleString()}</p>
            <p className="mt-1 text-sm"><span className="font-semibold">Fecha Final:</span> {new Date(act.fechaFinal).toLocaleString()}</p>
            <p className="mt-1 text-sm"><span className="font-semibold">Entregado:</span> {act.entregado ? 'Sí' : 'No'}</p>
          </div>
        ))}
      </div>
      {selectedActividad && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Notas relacionadas:</h2>
          {isLoading ? (
            <div className="text-center text-lg text-blue-500">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Estudiante</th>
                    <th className="px-4 py-2 text-left">Ponderación</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {notas.map((nota) => (
                    <tr key={nota.id} className="border-b hover:bg-gray-50 transition-all duration-200">
                      <td className="px-4 py-2">{nota.estudiante.usuario.firstName} {nota.estudiante.usuario.lastName}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={ponderaciones[nota.id] || nota.ponderacion}
                          onChange={(e) => handlePonderacionChange(nota.id, parseInt(e.target.value))}
                          className="w-full border rounded-md px-2 py-1"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => aplicarCambio(nota.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                        >
                          Aplicar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PageTareaNotas;

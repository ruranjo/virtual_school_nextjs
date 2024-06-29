"use client"
import { LoadingSpinner } from '@/src/components/LoadingSpinner';
import useUserStore from '@/src/store/store';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface Activity {
  id: number;
  fechaInicio: string;
  fechaFinal: string;
  nota: number;
  comentario: string;
  entregado: boolean;
  aulaId: number;
  aula: {
    id: number;
    profesorId: number;
    nombre: string;
    profesor: {
      id: number;
      usuarioId: number;
      codigo: string;
      grado: string;
      area: string;
    };
  };
}

const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/actividades");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActivities(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      const filtered = activities.filter(activity => activity.aula.profesor.usuarioId === user.id);
      setFilteredActivities(filtered);
    }
  }, [activities, user]);

  const initialActivity: Activity = {
    id: 0,
    fechaInicio: '',
    fechaFinal: '',
    nota: 0,
    comentario: '',
    entregado: false,
    aulaId: 0,
    aula: {
      id: 0,
      profesorId: 0,
      nombre: '',
      profesor: {
        id: 0,
        usuarioId: 0,
        codigo: '',
        grado: '',
        area: '',
      },
    },
  };

  const [activity, setActivity] = useState<Activity>(initialActivity);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setActivity({ ...activity, [name]: e.target.checked });
    } else {
      setActivity({ ...activity, [name]: type === 'number' ? Number(value) : value });
    }
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/actividades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        throw new Error('Error al crear la actividad');
      }

      const newActivity = await response.json();
      setActivities([...activities, newActivity]);
      setFilteredActivities([...activities, newActivity]);
      setActivity(initialActivity);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/actividades/${activity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la actividad');
      }

      const updatedActivity = await response.json();
      const updatedActivities = activities.map(act => (act.id === updatedActivity.id ? updatedActivity : act));
      setActivities(updatedActivities);
      setFilteredActivities(updatedActivities);
      setActivity(initialActivity);
      setIsEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/actividades/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la actividad');
      }

      setActivities(activities.filter(act => act.id !== id));
      setFilteredActivities(filteredActivities.filter(act => act.id !== id));
      setActivity(initialActivity);
      setIsEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleEdit = (activityData: Activity) => {
    setActivity(activityData);
    setIsEditing(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredActivities(
      activities.filter(act =>
        act.comentario.toLowerCase().includes(value)
      )
    );
  };

  const handleCancelEdit = () => {
    setActivity(initialActivity);
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Actividades</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-blue-600">Fecha de Inicio</label>
              <input
                type="datetime-local"
                name="fechaInicio"
                value={activity.fechaInicio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded"
              />
            </div>
            <div>
              <label className="block text-blue-600">Fecha de Final</label>
              <input
                type="datetime-local"
                name="fechaFinal"
                value={activity.fechaFinal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded"
              />
            </div>
            <div>
              <label className="block text-blue-600">Nota</label>
              <input
                type="number"
                name="nota"
                value={activity.nota}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded"
              />
            </div>
            <div>
              <label className="block text-blue-600">Comentario</label>
              <textarea
                name="comentario"
                value={activity.comentario}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-blue-600 mr-2">Entregado</label>
              <input
                type="checkbox"
                name="entregado"
                checked={activity.entregado}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600"
              />
            </div>
            <div>
              <label className="block text-blue-600">Aula ID</label>
              <input
                type="number"
                name="aulaId"
                value={activity.aulaId}
                onChange={handleChange}
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
                    onClick={() => handleDelete(activity.id)}
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
              <h3 className="text-xl text-blue-600 font-bold mb-2">Lista de Actividades</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar actividad..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-blue-300 rounded"
                />
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredActivities.map((act) => (
                  <li
                    onClick={() => handleEdit(act)}
                    className="cursor-pointer bg-white shadow-md p-4 rounded-lg hover:bg-blue-50 transition duration-200"
                    key={act.id}
                  >
                    <h4 className="text-lg font-bold text-gray-800">
                      {act.comentario}
                    </h4>
                    <p className="text-gray-600">Aula ID: {act.aulaId}</p>
                    <p className="text-gray-600">Nota: {act.nota}</p>
                    <p className="text-gray-600">Entregado: {act.entregado ? 'Sí' : 'No'}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default ActivityPage;
  
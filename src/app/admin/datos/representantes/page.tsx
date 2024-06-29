"use client";
import { LoadingSpinner } from '@/src/components/LoadingSpinner';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Define el tipo para los datos de representantes
interface Representante {
  id: number;
  usuarioId: number;
  direccion: string;
  ocupacion: string;
  estadoCivil: string;
  edad: number;
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

const PageRepresentante: React.FC = () => {
  // Define el estado para los datos de representantes
  const [data, setData] = useState<Representante[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/representantes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parsea los datos como Representante[]
        const responseData: Representante[] = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const totalRepresentantes = data.length;

  const distributionGender = data.reduce((acc, representante) => {
    const gender = representante.usuario.gender;
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderData = Object.entries(distributionGender).map(([gender, count]) => ({
    name: gender === 'M' ? 'Masculino' : 'Femenino',
    value: count,
  }));

  const currentYear = new Date().getFullYear();
  const ages = data.map(representante => currentYear - new Date(representante.usuario.birthdate).getFullYear());
  const averageAge = (ages.reduce((acc, age) => acc + age, 0) / ages.length).toFixed(2);

  const ageDistribution = ages.reduce((acc, age) => {
    acc[age] = (acc[age] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const ageData = Object.entries(ageDistribution).map(([age, count]) => ({
    age: parseInt(age),
    count,
  }));

  const occupationFrequency = data.reduce((acc, representante) => {
    acc[representante.ocupacion] = (acc[representante.ocupacion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const occupationData = Object.entries(occupationFrequency).map(([occupation, count]) => ({
    occupation,
    count,
  }));

  return (
    <div className="container mx-auto p-4 bg-blue-300">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Representantes</h1>
      <p className="mb-4">Total de Representantes: {totalRepresentantes}</p>
      
      <div className="flex flex-wrap mb-8">
        <div className="w-full lg:w-1/3 bg-white rounded-md p-2 mr-8">
          <h2 className="text-xl font-semibold mb-2">Distribución por Género</h2>
          <PieChart width={300} height={300}>
            <Pie data={genderData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        
        <div className="w-full lg:w-1/2 bg-white rounded-md p-2">
          <h2 className="text-xl font-semibold mb-2">Edad Promedio</h2>
          <p className="mb-4">{averageAge} años</p>
          <h2 className="text-xl font-semibold mb-2">Distribución de Edades</h2>
          <BarChart width={500} height={300} data={ageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="age" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          </div>
    </div>


  <div className="bg-white rounded-md p-2">
    <h2 className="text-xl font-semibold mb-2">Ocupaciones</h2>
    <BarChart width={600} height={300} data={occupationData}>
      <XAxis dataKey="occupation" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  </div>
</div>
);
};

export default PageRepresentante;

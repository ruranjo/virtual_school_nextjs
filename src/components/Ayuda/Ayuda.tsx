// components/Ayuda.tsx
"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { MdAttachMoney, MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter } from 'react-icons/md';
import { FaSchool } from 'react-icons/fa';

const menuItemsAdmin = [
  {
    title: "Usuarios",
    description: "Gestiona todos los usuarios del sistema, incluidos profesores, representantes y estudiantes.",
    list: [
      {
        title: "Todos",
        path: "/admin",
        icon: <MdAttachMoney />,
        description: "Ver todos los usuarios del sistema."
      },
      {
        title: "Profesores",
        path: "/admin/profesores",
        icon: <MdDashboard />,
        description: "Ver y gestionar los profesores."
      },
      {
        title: "Representantes",
        path: "/admin/representantes",
        icon: <MdSupervisedUserCircle />,
        description: "Ver y gestionar los representantes."
      },
      {
        title: "Estudiantes",
        path: "/admin/estudiantes",
        icon: <MdShoppingBag />,
        description: "Ver y gestionar los estudiantes."
      },
      {
        title: "Aulas",
        path: "/admin/aulas",
        icon: <FaSchool />,
        description: "Ver y gestionar las aulas."
      },
    ],
  },
  {
    title: "Estadísticas",
    description: "Accede a diversas estadísticas sobre alumnos, profesores y representantes.",
    list: [
      {
        title: "Datos Alumnos",
        path: "/admin/datos/alumno",
        icon: <MdWork />,
        description: "Ver estadísticas y datos de los alumnos."
      },
      {
        title: "Datos Profesores",
        path: "/admin/datos/profesor",
        icon: <MdAnalytics />,
        description: "Ver estadísticas y datos de los profesores."
      },
      {
        title: "Datos Representantes",
        path: "/admin/datos/representantes",
        icon: <MdPeople />,
        description: "Ver estadísticas y datos de los representantes."
      },
    ],
  },
  {
    title: "Configuración",
    description: "Configura las opciones y ajustes del sistema.",
    list: [
      {
        title: "Settings",
        path: "/admin/setting",
        icon: <MdOutlineSettings />,
        description: "Accede a la configuración del sistema."
      },
      {
        title: "Ayuda",
        path: "/dashboard/ayuda",
        icon: <MdHelpCenter />,
        description: "Obtén ayuda y soporte."
      },
    ],
  },
];

const menuItemsProfesores = [
  {
    title: "Mi Aula",
    description: "Gestiona tu aula y los estudiantes asignados.",
    list: [
      {
        title: "Todos",
        path: "/profesor",
        icon: <MdAttachMoney />,
        description: "Ver todos los estudiantes en tu aula."
      },
      {
        title: "Alumnos",
        path: "/profesor/alumnos",
        icon: <MdDashboard />,
        description: "Ver y gestionar los alumnos."
      },
      {
        title: "Representantes",
        path: "/profesor/representantes",
        icon: <MdSupervisedUserCircle />,
        description: "Ver y gestionar los representantes de los alumnos."
      },
    ],
  },
  {
    title: "Tareas",
    description: "Crea y gestiona las tareas para los estudiantes.",
    list: [
      {
        title: "Crear tarea",
        path: "/profesor/tarea/crear",
        icon: <MdWork />,
        description: "Crea nuevas tareas para los estudiantes."
      },
      {
        title: "Mis tareas",
        path: "/profesor/tarea/ver",
        icon: <MdAnalytics />,
        description: "Ver y gestionar tus tareas creadas."
      },
    ],
  },
  {
    title: "Configuración",
    description: "Configura las opciones y ajustes de tu cuenta.",
    list: [
      {
        title: "Settings",
        path: "/profesor/setting",
        icon: <MdOutlineSettings />,
        description: "Accede a la configuración de tu cuenta."
      },
      {
        title: "Ayuda",
        path: "/dashboard/ayuda",
        icon: <MdHelpCenter />,
        description: "Obtén ayuda y soporte."
      },
    ],
  },
];

const Ayuda: React.FC = () => {
  const pathname = usePathname();

  // Asegúrate de que pathname no sea null antes de usarlo
  if (!pathname) {
    return <div>Loading...</div>;
  }

  const menuItems = pathname.includes('/admin') ? menuItemsAdmin : menuItemsProfesores;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">Ayuda</h2>
        <div className="space-y-8">
          <MenuSection title={pathname.includes('/admin') ? "Admin" : "Profesores"} sections={menuItems} />
        </div>
      </div>
    </div>
  );
};

interface MenuSectionProps {
  title: string;
  sections: { title: string; description: string; list: { title: string; path: string; icon: JSX.Element; description: string }[] }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, sections }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-blue-600">{section.title}</h4>
          <p className="text-gray-700 mb-4">{section.description}</p>
          <ul className="space-y-2">
            {section.list.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-center space-x-2">
                <span className="text-xl text-orange-500">{item.icon}</span>
                <div>
                  <h5 className="text-md font-medium text-blue-800">{item.title}</h5>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Ayuda;

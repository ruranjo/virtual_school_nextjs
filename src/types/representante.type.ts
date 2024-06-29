// Representa una nota
interface Nota {
    id: number;
    ponderacion: number;
  }
  
  // Representa una actividad
  interface Actividad {
    id: number;
    name: string;
    fechaInicio: string;
    fechaFinal: string;
    comentario: string;
    entregado: boolean;
    notas: { nota: Nota }[];
  }
  
  // Representa un profesor
  interface Profesor {
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
  }
  
  // Representa un aula
  interface Aula {
    id: number;
    nombre: string;
    profesor: Profesor;
    actividades: { actividad: Actividad }[];
  }
  
  // Representa un usuario
  interface Usuario {
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
  }
  
  // Representa un estudiante
  interface Estudiante {
    id: number;
    usuario: Usuario;
    aulas: { aula: Aula }[];
  }
  
  // Representa el conjunto completo de datos
  export interface RepresentadoData {
    estudiante: Estudiante;
  }
interface Usuario {
  id: number;
  cedula: string;
  firstName: string;
  lastName: string;
  telefono: string;
  correo: string;
  rolId: number;
  birthdate: string; // Puedes cambiar esto a Date si prefieres
  gender: string;
  address: string;
  password: string;
}

interface Representante {
  id: number;
  usuarioId: number;
  direccion: string;
  ocupacion: string;
  estadoCivil: string;
  edad: number;
  usuario: Usuario;
}

interface Estudiante {
  id: number;
  usuarioId: number;
  representanteId: number;
  usuario: Usuario;
  representante: Representante;
}

interface Actividad {
  id: number;
  name: string;
  fechaInicio: string; // Puedes cambiar esto a Date si prefieres
  fechaFinal: string; // Puedes cambiar esto a Date si prefieres
  comentario?: string;
  entregado: boolean;
  aulaId: number;
}

interface Aula {
  id: number;
  profesorId: number;
  nombre: string;
  estudiantes: Estudiante[];
  actividades: Actividad[];
}

export interface Profesor {
  id: number;
  usuarioId: number;
  codigo: string;
  grado: string;
  area: string;
  usuario: Usuario;
  aulas: Aula[];
}

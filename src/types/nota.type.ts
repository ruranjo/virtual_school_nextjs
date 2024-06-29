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
  
  interface Estudiante {
    id: number;
    usuarioId: number;
    representanteId: number;
    usuario: Usuario;
  }
  
  interface Actividad {
    id: number;
    name: string;
    fechaInicio: string;
    fechaFinal: string;
    comentario: string;
    entregado: boolean;
    aulaId: number;
  }
  
  export interface Nota {
    id: number;
    actividadId: number;
    profesorId: number;
    estudianteId: number;
    ponderacion: number;
    actividad: Actividad;
    estudiante: Estudiante;
  }
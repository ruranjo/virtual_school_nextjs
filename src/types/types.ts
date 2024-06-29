// types/User.ts

// Interfaz base para propiedades comunes de usuario
interface BaseUser {
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
  rol: Rol;
}

// Interfaz Rol
export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
}

// Interfaz Profesor
export interface Profesor {
  usuarioId: number;
  codigo: string;
  grado: string;
  area: string;
}

// Interfaz Representante
export interface Representante {
  id: number;
  usuarioId: number;
  direccion: string;
  ocupacion: string;
  estadoCivil: string;
  edad: number;
}

// Interfaz Student
export interface Student {
  id: number;
  id_user: number;
  id_represent: number;
  id_aula: number;
  id_professor: number;
  grade: number;
}

// Extender la interfaz BaseUser para UserProfesor
export interface UserProfesor extends BaseUser {
  profesor: Profesor;
}

// Extender la interfaz BaseUser para UserRepresentante
export interface UserRepresentante extends BaseUser {
  representante: Representante;
}

// Extender la interfaz BaseUser para UserEstudiante
export interface UserEstudiante extends BaseUser {
  estudiante: Student;
}

// La interfaz User extiende BaseUser
export interface User extends BaseUser {}

// Tipo combinado de Student y User
export type RelatedStudentDetails = Student & User;

export interface Representante extends BaseUser {
  // No se requiere definir explícitamente id, usuarioId, ya que están heredados de BaseUser
  direccion: string;
  ocupacion: string;
  estadoCivil: string;
  edad: number;
}

// Tipo combinado de Representante y UserRepresentante
export type RelatedRepresentanteDetails = Representante & UserRepresentante;
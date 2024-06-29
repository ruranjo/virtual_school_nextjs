// stores/userStore.ts
import { create } from 'zustand';
import { User } from '../types/types';
import { Profesor } from '../types/profesor.type';

interface UserState {
  profesor: Profesor | null;
  setProfesor: (profesor: Profesor | null) => void;
  user: User | null;
  users: User[] | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setUsers: (users: User[] | null) => void; // Nuevo método para establecer la lista de usuarios
  updateUser: (id: number, updatedData: Partial<User>) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  profesor: null,
  setProfesor: (profesor) => set({ profesor }), // Acción para establecer el Profesor en el estado
  user: null,
  users: null,
  isLoggedIn: false,
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }), // Definir el método setUsers para actualizar la lista de usuarios
  updateUser: (id, updatedData) => set((state) => ({
    user: state.user && state.user.id === id ? { ...state.user, ...updatedData } : state.user,
  })),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));

export default useUserStore;

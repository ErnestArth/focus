import { create } from 'zustand';

const useStore:any = create((set:any) => ({
  name: '',
  setName: (newName:any) => set({ name: newName }),
  
  vehicle: [],
  setVehicle: (newVehicles:any) => set({ vehicle: newVehicles }),
  addVehicle: (newVehicle:any) => set((state:any) => ({ vehicles: [...state.vehicles, newVehicle] })),
}));

export default useStore;

import { create } from 'zustand';

const useStore = create((set: any) => ({
  name: '',
  setName: (newName: any) => set({ name: newName }),

}));

export default useStore;

import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  loading: true,
  error: null,
  
  setProducts: (data) => set({ products: data, loading: false }),
  setLoading: (status) => set({ loading: status }),
  setError: (errorMessage) => set({ error: errorMessage, loading: false }),
}));

export default useProductStore;

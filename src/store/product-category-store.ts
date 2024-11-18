import { create } from 'zustand';

// Store untuk menyimpan kategori produk
interface ProductCategoryStore {
  productCategories: any[];
  setProductCategories: (categories: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

const useProductCategoryStore = create<ProductCategoryStore>((set) => ({
  productCategories: [],
  loading: false,
  error: '',
  setProductCategories: (categories) => set({ productCategories: categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useProductCategoryStore;

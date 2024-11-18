import { create } from 'zustand';

// Definisikan tipe untuk data produk
interface Product {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  price: number;
  description: string;
  // Tambahkan properti lain sesuai dengan data produk Anda
}

// Definisikan tipe untuk state store
interface ProductStore {
  products: Product[];         // Daftar produk
  loading: boolean;            // Status loading
  error: string | null;        // Pesan error jika ada

  setProducts: (data: Product[]) => void;  // Fungsi untuk set produk
  setLoading: (status: boolean) => void;   // Fungsi untuk set status loading
  setError: (errorMessage: string) => void; // Fungsi untuk set error
}

// Buat store menggunakan zustand
const useProductStore = create<ProductStore>((set) => ({
  products: [],           // Nilai awal untuk produk
  loading: true,          // Nilai awal untuk status loading
  error: null,            // Nilai awal untuk error

  // Fungsi untuk mengubah produk
  setProducts: (data) => set({ products: data, loading: false }),

  // Fungsi untuk mengubah status loading
  setLoading: (status) => set({ loading: status }),

  // Fungsi untuk mengubah status error
  setError: (errorMessage) => set({ error: errorMessage, loading: false }),
}));

export default useProductStore;

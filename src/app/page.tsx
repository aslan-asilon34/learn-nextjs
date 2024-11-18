'use client';

import '@/app/globals.css';
import useProductCategoryStore from '@/store/product-category-store';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const { productCategories, loading, error, setProductCategories, setLoading, setError } = useProductCategoryStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/v1/product-category');
        if (response.data.status === 'success') {
          setProductCategories(response.data.data);
        } else {
          setError('Failed to fetch product categories');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Jika kategori belum ada, ambil data dari API
    if (productCategories.length === 0) {
      fetchData();
    }
  }, [productCategories, setProductCategories, setLoading, setError]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {productCategories.length > 0 ? (
          productCategories.map((category: any) => (
            <li key={category.id} className="bg-white p-4 rounded-lg shadow-md">
              {/* Link ke halaman produk berdasarkan kategori */}
              <Link href={`/produk/${category.product_category_first.product_category_second.slug}`}>
                <div className="block text-lg font-semibold text-center text-black">
                  <h3 className="text-lg font-semibold">{category.product_category_first.product_category_second.name}</h3>
                  <div className="w-30 h-30 bg-cover bg-center" style={{ backgroundImage: `url(${category.product_category_first.product_category_second.image_url})` }}></div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>Tidak ada produk kategori ditemukan.</li>
        )}
      </ul>
    </div>
  );
}

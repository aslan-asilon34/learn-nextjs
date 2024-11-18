// produk/detail/[slug]/page.tsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// Interface untuk tipe produk
interface Product {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  selling_price?: string;
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data produk berdasarkan slug
  useEffect(() => {
    // Menggunakan `React.use()` untuk unwrapping Promise
    const fetchProduct = async () => {
      const resolvedParams = await params; // Unwrap `params` (await Promise)
      if (resolvedParams?.slug) {
        axios
          .get(`http://localhost:8000/api/v1/produk/${resolvedParams.slug}`, { timeout: 10000 })
          .then((response) => {
            const data = response.data.data.product;
            setProduct(data);
            setLoading(false);
            alert(`Product Name: ${data.name}`);
          })
          .catch((error) => {
            alert(`Error: ${error.message}`);
            console.error("Error fetching product:", error);
            setLoading(false);
          });
      }
    };

    fetchProduct();
  }, [params]);

  // Menampilkan loading jika data masih dalam proses pemuatan
  if (loading) return <div>Loading...</div>;

  // Menampilkan pesan jika produk tidak ditemukan
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.selling_price}</p>
      <p>{product.description}</p>
    </div>
  );
}

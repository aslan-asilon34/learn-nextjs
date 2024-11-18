"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  image_url: string;
  selling_price: string;
  product_category_first: {
    slug: string; // Menambahkan field slug yang ada di dalam product_category_first
  };
}

export default function ProdukPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      axios
        .get(`http://localhost:8000/api/v1/product-category/${params.slug}`)
        .then((response) => {
          setProducts(response.data.data); // Menyimpan produk berdasarkan kategori
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    }
  }, [params.slug]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Products in {params.slug}</h1>
      <div className="product-list">
        {products.map((product) => (
          <Link key={product.id} href={`/produk/detail/${product.product_category_first.slug}`}>
            <div className="product-item">
              <h3>{product.name}</h3>
              <img className="w-10 h-10" src={product.image_url} alt={product.name} />
              <p>{product.selling_price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

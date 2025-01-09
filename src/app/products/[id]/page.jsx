'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { db, doc, getDoc } from "../../../../firebase-products/index";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <Image
        src={product?.image}
        alt={product?.name}
        width={500}
        height={500}
        priority
      />
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <h2>${product?.price}</h2>
    </div>
  );
};

export default ProductDetails;

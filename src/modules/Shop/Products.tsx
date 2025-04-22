import { useEffect, useState } from "react";
import { HttpTypes } from "@medusajs/types"
import sdk from '@/lib/sdk'



export default function Products() {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<
    HttpTypes.StoreProduct[]
  >([])



  useEffect(() => {
    if (!loading) {
      return 
    }

    sdk.store.product.list()
    .then(({ products: dataProducts }) => {

      console.log(dataProducts)
      setProducts(dataProducts)
      setLoading(false)
    })
  }, [loading])


  if (loading) {
    return <div>Loading products...</div>;
  }


  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {/* Example: Display price */}
            {/* {product.variants?.[0]?.prices?.[0]?.amount && (
              <p>
                ${(product.variants[0].prices[0].amount / 100).toFixed(2)}
              </p>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
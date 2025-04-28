

import { HttpTypes } from "@medusajs/types"

interface ProductVariance {
  id: string
  title: string[]
  price: number
  inventory_quantity?: number
}

interface Props {
  product: HttpTypes.StoreProduct // Single product object (not array)
}

export default function VariantPrices({ product }: Props): ProductVariance[] {


  // Get the product options in their original order
  const optionIds = product.options?.map(option => option.id) || [];

  return product.variants.map((variant) => {
    // Create title array based on option order
    const title = optionIds.map(optionId => {
      const optionValue = variant.options.find(o => o.option_id === optionId)?.value;
      return optionValue || '';
    });

    return {
      id: variant.id,
      title,
      price: variant.calculated_price?.calculated_amount || 0,
      inventory_quantity: variant.inventory_quantity
    };
  });
}


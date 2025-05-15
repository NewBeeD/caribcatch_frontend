"use client" // include with Next.js 13+
import { createContext, useContext, useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import sdk  from "@/lib/sdk"

import { useRegion } from "@/lib/RegionContext/RegionContext"

type CartContextType = {
  cart?: HttpTypes.StoreCart
  loading: boolean
  addToCart: (variantId: string, quantity: number) => Promise<HttpTypes.StoreCart>
  updateCart: (data: {updateData?: HttpTypes.StoreUpdateCart,shippingMethodData?: HttpTypes.StoreAddCartShippingMethods}) => Promise<HttpTypes.StoreCart | undefined>
  refreshCart: () => Promise<HttpTypes.StoreCart | undefined>
  updateItemQuantity: (itemId: string, quantity: number) => Promise<HttpTypes.StoreCart>
  removeItem: (itemId: string) => Promise<HttpTypes.StoreCart>
  clearCart: () => void,
  setEmail: (email: string) => Promise<void>
  setShippingAddress: (address: any) => Promise<void>
  completeCheckout: () => Promise<HttpTypes.StoreOrder>
}



const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [cart, setCart] = useState<HttpTypes.StoreCart>()
  const { region } = useRegion()
  const [loading, setLoading] = useState(true)

  // Initialize cart on component mount
  useEffect(() => {

  // // added this recently
  //   if (!region) {
  //     return
  //   }
  //   if (cart) {
  //     localStorage.setItem("cart_id", cart.id)
  //     return
  //   }
    


    const cartId = localStorage.getItem("cart_id")
    
    if (cartId) {
      // Retrieve existing cart
      sdk.store.cart.retrieve(cartId)
        .then(({ cart: existingCart }) => {
          setCart(existingCart)
          setLoading(false)
        })
        .catch(() => {
          // If cart retrieval fails, create a new one
          createNewCart()
        })
    } else {
      createNewCart()
    }
  }, [])

  const createNewCart = async () => {
    try {
      // Get first available region
      const { regions } = await sdk.store.region.list()
      
      if (!regions.length) {
        console.error("No regions available")
        setLoading(false)
        return
      }

      const { cart: newCart } = await sdk.store.cart.create({
        region_id: regions[0].id,
      })
      
      localStorage.setItem("cart_id", newCart.id)
      setCart(newCart)
      setLoading(false)
    } catch (error) {
      console.error("Failed to create cart:", error)
      setLoading(false)
    }
  }

  const addToCart = async (variantId: string, quantity: number) => {
    if (!cart) {
      throw new Error("Cart not initialized")
    }

    setLoading(true)
    
    try {
      const { cart: updatedCart } = await sdk.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
      })
      
      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    } catch (error) {
      setLoading(false)
      throw error
    }
  }


  // added this recently
  const updateCart = async ({
    updateData,
    shippingMethodData,
  }: {
    updateData?: HttpTypes.StoreUpdateCart,
    shippingMethodData?: HttpTypes.StoreAddCartShippingMethods
  }) => {


    if (!updateData && !shippingMethodData) {
      return cart
    }

    let returnedCart = cart

    if (updateData) {

      returnedCart = (await sdk.store.cart.update(cart!.id, updateData)).cart
    }
    
    if (shippingMethodData) {

      // returnedCart = (await sdk.store.cart.addShippingMethod(cart!.id, shippingMethodData)).cart

      const response = await sdk.store.cart.addShippingMethod(cart!.id, shippingMethodData);
      
      returnedCart = response.cart; // Use the response
    }
    
    setCart(returnedCart)
  
    return returnedCart
  }

  // In your cart context's updateCart function
// const updateCart = async ({
//   updateData,
//   shippingMethodData,
// }: {
//   updateData?: HttpTypes.StoreUpdateCart;
//   shippingMethodData?: {
//     option_id: string;
//     data?: Record<string, unknown>;
//   };
// }) => {
//   if (!cart) throw new Error("Cart not initialized");
  
//   let updatedCart = cart;

//   try {
//     if (updateData) {
//       const response = await sdk.store.cart.update(cart.id, updateData);
//       updatedCart = response.cart;
//     }

//     if (shippingMethodData) {
//       // First validate shipping option
//       const { shipping_options } = await sdk.store.fulfillment.listCartOptions(cart.id);
      
//       if (!shipping_options.some(so => so.id === shippingMethodData.option_id)) {
//         throw new Error("Invalid shipping option selected");
//       }

//       const response = await sdk.store.cart.addShippingMethod(cart.id, {
//         option_id: shippingMethodData.option_id,
//         data: shippingMethodData.data || {}
//       });
      
//       updatedCart = response.cart;
//     }

//     setCart(updatedCart);
//     return updatedCart;
//   } catch (error) {
//     console.error("Cart update failed:", error);
//     throw error;
//   }
// };

  // added this recently
  const refreshCart = async () => {
    if (!region) {
      return
    }
  
    const { cart: dataCart } = await sdk.store.cart.create({
      region_id: region.id,
    })
  
    localStorage.setItem("cart_id", dataCart.id)
    setCart(dataCart)
  
    return dataCart
  }
  
  // TODO add addToCart function
  

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (!cart) {
      throw new Error("Cart not initialized")
    }

    setLoading(true)
    
    try {
      const { cart: updatedCart } = await sdk.store.cart.updateLineItem(cart.id, itemId, {
        quantity,
      })
      
      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const removeItem = async (itemId: string) => {
    if (!cart) {
      throw new Error("Cart not initialized")
    }

    setLoading(true)
    
    try {
      // Correct the response destructuring based on your SDK's actual response format
      const { cart: updatedCart } = await sdk.store.cart.deleteLineItem(cart.id, itemId)
      
      setCart(updatedCart)
      return updatedCart
    } catch (error) {
      setLoading(false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    localStorage.removeItem("cart_id")
    setCart(undefined)
    createNewCart()
  }

  // Add to CartProvider component
const setEmail = async (email: string) => {
  if (!cart) throw new Error("Cart not initialized")
  
  setLoading(true)
  try {
    const { cart: updatedCart } = await sdk.store.cart.update(cart.id, { email })
    setCart(updatedCart)
  } finally {
    setLoading(false)
  }
}

const setShippingAddress = async (address: any) => {
  if (!cart) throw new Error("Cart not initialized")
  
  setLoading(true)
  try {
    const { cart: updatedCart } = await sdk.store.cart.update(cart.id, {
      shipping_address: address
    })
    setCart(updatedCart)
  } finally {
    setLoading(false)
  }
}

const completeCheckout = async () => {
  if (!cart) throw new Error("Cart not initialized")
  
  setLoading(true)
  try {
    const { order } = await sdk.store.order.complete(cart.id)
    clearCart()
    return order
  } finally {
    setLoading(false)
  }
}


  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateCart,
      refreshCart,
      updateItemQuantity,
      removeItem,
      clearCart,
      setEmail,
      setShippingAddress,
      completeCheckout
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  
  return context
}
// src/services/medusa-admin.ts

interface UpdateShippingMethodParams {
  orderId: string;
  actionId: string;
  customData?: Record<string, unknown>;
}

interface MedusaErrorResponse {
  message?: string;
  [key: string]: unknown;
}

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const updateShippingMethod = async (
  params: UpdateShippingMethodParams,
  adminToken: string
): Promise<unknown> => {
  try {
    const response = await fetch(
      `${MEDUSA_BACKEND_URL}/admin/orderedits/updateshippingcost`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          order_id: params.orderId,
          action_id: params.actionId,
          data: params.customData || {}
        })
      }
    );

    if (!response.ok) {
      const errorData: MedusaErrorResponse = await response.json();
      throw new Error(errorData.message || "Failed to update shipping method");
    }

    return await response.json();
  } catch (error) {
    console.error("Update shipping method error:", error);
    
    // Handle type-safe error message
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

// Usage example:
/*
interface ShippingMethodResult {
  // Define your response shape here based on Medusa's response
  id: string;
  // ... other fields
}

export const updateShippingMethod = async (
  params: UpdateShippingMethodParams,
  adminToken: string
): Promise<ShippingMethodResult> => {
  // ... same implementation
}
*/
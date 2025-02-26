export interface PayLoad {
    shippingAddress: ShippingAddress
  }
  
  export interface ShippingAddress {
    details: string
    phone: string
    city: string
  }
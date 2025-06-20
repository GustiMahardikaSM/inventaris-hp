export interface Product {
  _id?: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  category: string;
  specifications: {
    storage: string;
    ram: string;
    camera: string;
    battery: string;
    display: string;
  };
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Sale {
  _id?: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customerName?: string;
  customerPhone?: string;
  saleDate: string;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'transfer';
}

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  lowStockProducts: number;
  totalRevenue: number;
  monthlySales: Array<{
    _id: { year: number; month: number };
    count: number;
    revenue: number;
  }>;
  topProducts: Array<{
    _id: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }>;
}
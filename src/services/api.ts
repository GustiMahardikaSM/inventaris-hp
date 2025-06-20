const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Products
  getProducts: () => fetch(`${API_BASE}/products`).then(res => res.json()),
  createProduct: (product: any) => 
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => res.json()),
  updateProduct: (id: string, product: any) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => res.json()),
  deleteProduct: (id: string) =>
    fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' }),

  // Sales
  getSales: () => fetch(`${API_BASE}/sales`).then(res => res.json()),
  createSale: (sale: any) =>
    fetch(`${API_BASE}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sale)
    }).then(res => res.json()),

  // Dashboard
  getDashboardStats: () => fetch(`${API_BASE}/dashboard/stats`).then(res => res.json())
};
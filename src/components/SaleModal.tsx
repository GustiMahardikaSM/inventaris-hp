import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: () => void;
}

const SaleModal: React.FC<SaleModalProps> = ({ isOpen, onClose, products, onSave }) => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    customerName: '',
    customerPhone: '',
    paymentMethod: 'cash' as 'cash' | 'credit' | 'debit' | 'transfer'
  });
  const [loading, setLoading] = useState(false);

  const selectedProduct = products.find(p => p._id === formData.productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);
    try {
      await api.createSale(formData);
      onSave();
      onClose();
      setFormData({
        productId: '',
        quantity: 1,
        customerName: '',
        customerPhone: '',
        paymentMethod: 'cash'
      });
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Error creating sale. Please check if there is enough stock.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const totalPrice = selectedProduct ? selectedProduct.price * formData.quantity : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Penjualan Baru</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produk *
            </label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Pilih produk</option>
              {products.filter(p => p.stock > 0).map(product => (
                <option key={product._id} value={product._id}>
                  {product.name} - {formatCurrency(product.price)} (Stock: {product.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah *
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
              required
              min="1"
              max={selectedProduct?.stock || 1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {selectedProduct && (
              <p className="text-sm text-gray-500 mt-1">
                Stok tersedia: {selectedProduct.stock} unit
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Pelanggan
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Opsional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Telepon Pelanggan
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Opsional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metode Pembayaran *
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="cash">Tunai</option>
              <option value="credit">Kartu Kredit</option>
              <option value="debit">Kartu Debit</option>
              <option value="transfer">Transfer Bank</option>
            </select>
          </div>

          {selectedProduct && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700">Harga Satuan:</span>
                <span className="text-sm text-green-900">{formatCurrency(selectedProduct.price)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700">Jumlah:</span>
                <span className="text-sm text-green-900">{formData.quantity}</span>
              </div>
              <div className="border-t border-green-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-700">Total Harga:</span>
                  <span className="text-lg font-bold text-green-900">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || !selectedProduct}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Membuat Penjualan...' : 'Buat Penjualan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleModal;
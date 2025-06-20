import React from 'react';
import { Database, Shield, Bell, User, Server } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600">Atur preferensi sistem inventaris Anda</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Database Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Konfigurasi Database</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                String Koneksi MongoDB
              </label>
              <input
                type="text"
                value="mongodb://localhost:27017/toko_hp"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">Database Terhubung</span>
              </div>
              <span className="text-green-600 text-sm">MongoDB 8.0.10</span>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Server className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Informasi Sistem</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Versi:</span>
              <span className="font-medium text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lingkungan:</span>
              <span className="font-medium text-gray-900">Development</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Terakhir Diperbarui:</span>
              <span className="font-medium text-gray-900">Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status API:</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-600">Online</span>
              </span>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pengaturan Keamanan</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Cadangan Otomatis</p>
                <p className="text-sm text-gray-600">Cadangkan data secara otomatis setiap hari</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors">
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enkripsi Data</p>
                <p className="text-sm text-gray-600">Enkripsi data sensitif</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors">
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notifikasi</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Peringatan Stok Rendah</p>
                <p className="text-sm text-gray-600">Peringatkan jika stok di bawah 5 unit</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors">
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Notifikasi Penjualan</p>
                <p className="text-sm text-gray-600">Notifikasi saat ada penjualan baru</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
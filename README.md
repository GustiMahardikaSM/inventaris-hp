# 📱 Sistem Inventaris Toko HP

Sistem manajemen inventaris toko HP yang dibangun dengan React, TypeScript, dan Node.js. Aplikasi ini memungkinkan pengguna untuk mengelola produk, mencatat penjualan, dan melihat analitik bisnis secara real-time.

## ✨ Fitur Utama

### 📊 Dashboard
- **Statistik Real-time**: Total produk, penjualan, stok rendah, dan pendapatan
- **Grafik Penjualan**: Visualisasi data penjualan bulanan
- **Produk Terlaris**: Daftar produk dengan penjualan tertinggi
- **Notifikasi Stok**: Peringatan untuk produk dengan stok rendah

### 📦 Manajemen Produk
- **CRUD Produk**: Tambah, edit, hapus, dan lihat produk
- **Detail Lengkap**: Informasi spesifikasi, gambar, dan deskripsi
- **Kategori**: Pengelompokan produk berdasarkan kategori
- **Stok Otomatis**: Update stok otomatis saat penjualan

### 🛒 Manajemen Penjualan
- **Transaksi Baru**: Pencatatan penjualan dengan detail pelanggan
- **Metode Pembayaran**: Cash, credit, debit, dan transfer
- **Riwayat Penjualan**: Daftar lengkap semua transaksi
- **Perhitungan Otomatis**: Total harga dan update stok otomatis

### 📈 Analitik
- **Grafik Penjualan**: Visualisasi tren penjualan
- **Laporan Pendapatan**: Analisis pendapatan per periode
- **Performa Produk**: Analisis produk terlaris dan tidak laris

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React 18** - Library UI
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing

## 📋 Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda telah menginstall:

- **Node.js** (versi 16 atau lebih baru)
- **MongoDB** (versi 5.0 atau lebih baru)
- **npm** atau **yarn**

## 🚀 Cara Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/username/inventaris-toko-hp.git
cd inventaris-toko-hp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
Pastikan MongoDB sudah berjalan di komputer Anda:
```bash
# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (macOS/Linux)
sudo systemctl start mongod
```

### 4. Konfigurasi Environment
Buat file `.env` di root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/toko_hp
```

### 5. Jalankan Aplikasi
```bash
# Development mode (client + server)
npm run dev

# Atau jalankan secara terpisah:
npm run server  # Backend (port 5000)
npm run client  # Frontend (port 5173)
```

## 📁 Struktur Proyek

```
inventaris-toko-hp/
├── src/
│   ├── components/          # React components
│   │   ├── Analytics.tsx    # Halaman analitik
│   │   ├── Dashboard.tsx    # Dashboard utama
│   │   ├── Layout.tsx       # Layout aplikasi
│   │   ├── ProductModal.tsx # Modal produk
│   │   ├── Products.tsx     # Halaman produk
│   │   ├── SaleModal.tsx    # Modal penjualan
│   │   └── Sales.tsx        # Halaman penjualan
│   ├── services/
│   │   └── api.ts          # API service
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── server/
│   └── index.js            # Express server
├── package.json
└── README.md
```

## 🗄️ Model Database

### Product Schema
```javascript
{
  name: String,           // Nama produk
  brand: String,          // Brand (Apple, Samsung, dll)
  model: String,          // Model produk
  price: Number,          // Harga
  stock: Number,          // Stok tersedia
  category: String,       // Kategori produk
  specifications: {       // Spesifikasi detail
    storage: String,
    ram: String,
    camera: String,
    battery: String,
    display: String
  },
  image: String,          // URL gambar
  description: String,    // Deskripsi produk
  createdAt: Date,
  updatedAt: Date
}
```

### Sale Schema
```javascript
{
  productId: ObjectId,    // Reference ke Product
  productName: String,    // Nama produk
  quantity: Number,       // Jumlah terjual
  unitPrice: Number,      // Harga per unit
  totalPrice: Number,     // Total harga
  customerName: String,   // Nama pelanggan
  customerPhone: String,  // Nomor telepon
  saleDate: Date,         // Tanggal penjualan
  paymentMethod: String   // Metode pembayaran
}
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Ambil semua produk
- `POST /api/products` - Tambah produk baru
- `PUT /api/products/:id` - Update produk
- `DELETE /api/products/:id` - Hapus produk

### Sales
- `GET /api/sales` - Ambil semua penjualan
- `POST /api/sales` - Tambah penjualan baru
- `GET /api/sales/stats` - Statistik penjualan

### Dashboard
- `GET /api/dashboard/stats` - Statistik dashboard

## 🎨 Fitur UI/UX

- **Responsive Design**: Kompatibel dengan desktop dan mobile
- **Dark/Light Mode**: Tema yang dapat disesuaikan
- **Loading States**: Indikator loading yang smooth
- **Error Handling**: Penanganan error yang user-friendly
- **Form Validation**: Validasi input yang komprehensif
- **Search & Filter**: Pencarian dan filter data
- **Pagination**: Navigasi halaman yang efisien

## 📊 Data Sample

Aplikasi dilengkapi dengan data sample yang mencakup:
- 8 produk smartphone premium (iPhone, Samsung, Xiaomi, dll)
- Spesifikasi lengkap setiap produk
- Gambar produk dari Pexels
- Data penjualan sample

## 🔒 Keamanan

- **Input Validation**: Validasi data di frontend dan backend
- **CORS Configuration**: Pengaturan CORS yang aman
- **Error Handling**: Penanganan error yang tidak mengekspos informasi sensitif
- **Data Sanitization**: Pembersihan data input

## 🚀 Deployment

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### Railway/Heroku (Backend)
```bash
# Set environment variables
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000

# Deploy
git push heroku main
```

- [React](https://reactjs.org/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web Framework
- [Vite](https://vitejs.dev/) - Build Tool

---

⭐ Jika proyek ini membantu Anda, jangan lupa untuk memberikan bintang!

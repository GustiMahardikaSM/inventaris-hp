import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/toko_hp');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  specifications: {
    storage: String,
    ram: String,
    camera: String,
    battery: String,
    display: String
  },
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Sales Schema
const salesSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  customerName: String,
  customerPhone: String,
  saleDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['cash', 'credit', 'debit', 'transfer'], default: 'cash' }
});

const Product = mongoose.model('Product', productSchema);
const Sale = mongoose.model('Sale', salesSchema);

// Sample data initialization
const initializeSampleData = async () => {
  try {
    const productCount = await Product.countDocuments();
    const salesCount = await Sale.countDocuments();

    if (productCount === 0) {
      const sampleProducts = [
        {
          name: 'iPhone 15 Pro Max',
          brand: 'Apple',
          model: 'A3108',
          price: 19999000,
          stock: 15,
          category: 'Smartphone',
          specifications: {
            storage: '256GB',
            ram: '8GB',
            camera: '48MP Triple Camera',
            battery: '4441mAh',
            display: '6.7-inch Super Retina XDR'
          },
          image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Latest iPhone with titanium design and advanced camera system'
        },
        {
          name: 'Samsung Galaxy S24 Ultra',
          brand: 'Samsung',
          model: 'SM-S928B',
          price: 18499000,
          stock: 12,
          category: 'Smartphone',
          specifications: {
            storage: '512GB',
            ram: '12GB',
            camera: '200MP Quad Camera',
            battery: '5000mAh',
            display: '6.8-inch Dynamic AMOLED 2X'
          },
          image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Premium Android flagship with S Pen and AI features'
        },
        {
          name: 'Xiaomi 14 Ultra',
          brand: 'Xiaomi',
          model: '2405CPX3DG',
          price: 14999000,
          stock: 8,
          category: 'Smartphone',
          specifications: {
            storage: '512GB',
            ram: '16GB',
            camera: '50MP Leica Quad Camera',
            battery: '5300mAh',
            display: '6.73-inch LTPO AMOLED'
          },
          image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Photography-focused flagship with Leica partnership'
        },
        {
          name: 'Google Pixel 8 Pro',
          brand: 'Google',
          model: 'GC3VE',
          price: 13999000,
          stock: 10,
          category: 'Smartphone',
          specifications: {
            storage: '256GB',
            ram: '12GB',
            camera: '50MP Triple Camera',
            battery: '5050mAh',
            display: '6.7-inch LTPO OLED'
          },
          image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Pure Android experience with advanced AI photography'
        },
        {
          name: 'OnePlus 12',
          brand: 'OnePlus',
          model: 'CPH2573',
          price: 11999000,
          stock: 6,
          category: 'Smartphone',
          specifications: {
            storage: '256GB',
            ram: '12GB',
            camera: '50MP Hasselblad Triple Camera',
            battery: '5400mAh',
            display: '6.82-inch LTPO AMOLED'
          },
          image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Flagship killer with premium performance and fast charging'
        },
        {
          name: 'OPPO Find X7 Ultra',
          brand: 'OPPO',
          model: 'CPH2607',
          price: 16999000,
          stock: 4,
          category: 'Smartphone',
          specifications: {
            storage: '512GB',
            ram: '16GB',
            camera: '50MP Hasselblad Quad Camera',
            battery: '5000mAh',
            display: '6.82-inch LTPO AMOLED'
          },
          image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Premium camera phone with Hasselblad collaboration'
        },
        {
          name: 'Vivo X100 Pro',
          brand: 'Vivo',
          model: 'V2309A',
          price: 12999000,
          stock: 7,
          category: 'Smartphone',
          specifications: {
            storage: '256GB',
            ram: '12GB',
            camera: '50MP Zeiss Triple Camera',
            battery: '5400mAh',
            display: '6.78-inch LTPO AMOLED'
          },
          image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Photography flagship with Zeiss optics'
        },
        {
          name: 'Realme GT 5 Pro',
          brand: 'Realme',
          model: 'RMX3851',
          price: 8999000,
          stock: 20,
          category: 'Smartphone',
          specifications: {
            storage: '256GB',
            ram: '12GB',
            camera: '50MP Triple Camera',
            battery: '5400mAh',
            display: '6.7-inch LTPO AMOLED'
          },
          image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Performance-focused smartphone with flagship features'
        },
        {
          name: 'Nothing Phone (2a)',
          brand: 'Nothing',
          model: 'A142P',
          price: 4999000,
          stock: 25,
          category: 'Smartphone',
          specifications: {
            storage: '128GB',
            ram: '8GB',
            camera: '50MP Dual Camera',
            battery: '5000mAh',
            display: '6.7-inch AMOLED'
          },
          image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Unique transparent design with Glyph interface'
        },
        {
          name: 'Asus ROG Phone 8 Pro',
          brand: 'Asus',
          model: 'AI2401',
          price: 15999000,
          stock: 3,
          category: 'Smartphone',
          specifications: {
            storage: '512GB',
            ram: '16GB',
            camera: '50MP Triple Camera',
            battery: '6000mAh',
            display: '6.78-inch AMOLED 165Hz'
          },
          image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Ultimate gaming smartphone with advanced cooling'
        }
      ];

      await Product.insertMany(sampleProducts);
      console.log('Sample products inserted successfully');

      // Create sample sales after products are inserted
      const products = await Product.find();
      const sampleSales = [
        {
          productId: products[0]._id,
          productName: products[0].name,
          quantity: 2,
          unitPrice: products[0].price,
          totalPrice: products[0].price * 2,
          customerName: 'Budi Santoso',
          customerPhone: '081234567890',
          paymentMethod: 'transfer',
          saleDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        },
        {
          productId: products[1]._id,
          productName: products[1].name,
          quantity: 1,
          unitPrice: products[1].price,
          totalPrice: products[1].price * 1,
          customerName: 'Siti Nurhaliza',
          customerPhone: '081987654321',
          paymentMethod: 'credit',
          saleDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        },
        {
          productId: products[8]._id,
          productName: products[8].name,
          quantity: 3,
          unitPrice: products[8].price,
          totalPrice: products[8].price * 3,
          customerName: 'Ahmad Rizki',
          customerPhone: '081122334455',
          paymentMethod: 'cash',
          saleDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
          productId: products[7]._id,
          productName: products[7].name,
          quantity: 1,
          unitPrice: products[7].price,
          totalPrice: products[7].price * 1,
          customerName: 'Dewi Lestari',
          customerPhone: '081555666777',
          paymentMethod: 'debit',
          saleDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          productId: products[2]._id,
          productName: products[2].name,
          quantity: 1,
          unitPrice: products[2].price,
          totalPrice: products[2].price * 1,
          customerName: 'Eko Prasetyo',
          customerPhone: '081888999000',
          paymentMethod: 'transfer',
          saleDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
          productId: products[4]._id,
          productName: products[4].name,
          quantity: 2,
          unitPrice: products[4].price,
          totalPrice: products[4].price * 2,
          customerName: 'Rina Wati',
          customerPhone: '081333444555',
          paymentMethod: 'cash',
          saleDate: new Date() // Today
        }
      ];

      await Sale.insertMany(sampleSales);
      console.log('Sample sales inserted successfully');

      // Update product stock after sales
      for (const sale of sampleSales) {
        await Product.findByIdAndUpdate(
          sale.productId,
          { $inc: { stock: -sale.quantity } }
        );
      }
      console.log('Product stock updated after sales');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

// Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all sales
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find().populate('productId').sort({ saleDate: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create sale
app.post('/api/sales', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    // Create sale
    const sale = new Sale({
      ...req.body,
      productName: product.name,
      unitPrice: product.price,
      totalPrice: product.price * quantity
    });
    
    const savedSale = await sale.save();
    
    // Update product stock
    product.stock -= quantity;
    await product.save();
    
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSales = await Sale.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 5 } });
    
    const totalRevenue = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    
    const monthlySales = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$saleDate' },
            month: { $month: '$saleDate' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: '$productId',
          productName: { $first: '$productName' },
          totalSold: { $sum: '$quantity' },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      totalProducts,
      totalSales,
      lowStockProducts,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlySales,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to database and start server
connectDB().then(() => {
  initializeSampleData().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
});
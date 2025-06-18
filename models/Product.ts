import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  rating: Number,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

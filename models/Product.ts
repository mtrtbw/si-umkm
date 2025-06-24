// models/Product.ts
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: { type: String },
  ratings: {
    type: [
      {
        score: { type: Number, required: true },
      },
    ],
    default: [],
  },
  reviews: {
    type: [
      {
        user: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

export default models.Product || model('Product', ProductSchema);

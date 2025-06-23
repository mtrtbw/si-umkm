// === models/Product.ts ===
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
});

export default models.Product || model('Product', ProductSchema);

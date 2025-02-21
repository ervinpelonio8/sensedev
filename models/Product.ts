import mongoose from "mongoose";
import moment from "moment-timezone";
const { Schema } = mongoose;

// Product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: false },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => moment.tz(Date.now(), "Asia/Manila").toDate(),
  },
});

// Create a model from the schema
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
